"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import ROUTES from "@/constants/routes";
import { Answer, Question, Vote } from "@/database";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { NotFoundError } from "../http-errors";
import {
  CreateVoteSchema,
  HasVotedSchema,
  UpdateVoteCountSchema,
} from "../validations";

export async function updateVoteCount(
  params: UpdateVoteCountParams,
  session?: mongoose.ClientSession
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: UpdateVoteCountSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { actionId, actionType, voteType, change } = validationResult.params!;

  const Model = actionType === "question" ? Question : Answer;
  const voteField = voteType === "upvote" ? "upvotes" : "downvotes";

  try {
    const result = await Model.findByIdAndUpdate(
      actionId,
      {
        $inc: { [voteField]: change },
      },
      { new: true, session }
    );

    if (!result)
      return handleError(
        new NotFoundError("Failed to update vote count")
      ) as ErrorResponse;

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function createVote(
  params: CreateVoteParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: CreateVoteSchema,
    authorized: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { actionId, actionType, voteType } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  if (!userId) {
    return handleError(new Error("Unauthorized")) as ErrorResponse;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingVote = await Vote.findOne({
      author: userId,
      actionId,
      actionType,
    }).session(session);

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        await Vote.deleteOne({ _id: existingVote._id }).session(session);
        await updateVoteCount(
          { actionId, actionType, voteType, change: -1 },
          session
        );
      } else {
        await Vote.findByIdAndUpdate(
          existingVote._id,
          { voteType },
          { new: true, session }
        );
        await updateVoteCount(
          { actionId, actionType, voteType: existingVote.voteType, change: -1 },
          session
        );
        await updateVoteCount(
          { actionId, actionType, voteType, change: 1 },
          session
        );
      }
    } else {
      await Vote.create(
        [
          {
            author: userId,
            actionId,
            actionType,
            voteType,
          },
        ],
        { session }
      );
      await updateVoteCount(
        { actionId, actionType, voteType, change: 1 },
        session
      );
    }

    await session.commitTransaction();
    session.endSession();

    revalidatePath(ROUTES.QUESTION(actionId));

    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  }
}

export async function hasVoted(
  params: HasVotedParams
): Promise<ActionResponse<HasVotedResponse> | ErrorResponse> {
  const validationResult = await action({
    params,
    schema: HasVotedSchema,
    authorized: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { actionId, actionType } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  try {
    const vote = await Vote.findOne({
      author: userId,
      actionId,
      actionType,
    });

    if (!vote) {
      return {
        success: false,
        data: { hasUpvoted: false, hasDownvoted: false },
      };
    }

    return {
      success: true,
      data: {
        hasUpvoted: vote.voteType === "upvote",
        hasDownvoted: vote.voteType === "downvote",
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
