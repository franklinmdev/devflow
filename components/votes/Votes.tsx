"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import React, { use } from "react";
import { toast } from "sonner";

import { createVote } from "@/lib/actions/vote.action";
import { cn, formatNumber } from "@/lib/utils";

interface Props {
  upvotes: number;
  downvotes: number;
  hasVotedPromise: Promise<ActionResponse<HasVotedResponse> | ErrorResponse>;
  actionId: string;
  actionType: "question" | "answer";
}

const Votes = ({
  upvotes,
  downvotes,
  hasVotedPromise,
  actionId,
  actionType,
}: Props) => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const { success, data } = use(hasVotedPromise);

  const { hasUpvoted, hasDownvoted } = data || {};

  const [isLoading, setIsLoading] = React.useState(false);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId)
      return toast.error("Please login to vote", {
        description: "You must be logged in to vote",
      });

    setIsLoading(true);

    try {
      const result = await createVote({
        actionId,
        actionType,
        voteType,
      });

      if (!result.success) {
        return toast.error("Failed to vote", {
          description:
            result.error?.message ||
            "An error occurred while voting. Please try again later.",
        });
      }
    } catch {
      toast.error("Failed to vote", {
        description: "An error occurred while voting. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-center gap-2.5">
      <div className="flex-center gap-1.5">
        <Image
          src={
            success && hasUpvoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"
          }
          width={18}
          height={18}
          style={{ width: "18px", height: "auto" }}
          alt="upvote"
          className={cn("cursor-pointer", { "opacity-50": isLoading })}
          aria-label="upvote"
          onClick={() => !isLoading && handleVote("upvote")}
        />
        <div className="flex-center p-1 rounded-sm min-w-5 background-light700_dark400">
          <p className="text-dark400_light900 subtle-medium">
            {formatNumber(upvotes)}
          </p>
        </div>
      </div>
      <div className="flex-center gap-1.5">
        <Image
          src={
            success && hasDownvoted
              ? "/icons/downvoted.svg"
              : "/icons/downvote.svg"
          }
          width={18}
          height={18}
          style={{ width: "18px", height: "auto" }}
          alt="downvote"
          className={cn("cursor-pointer", { "opacity-50": isLoading })}
          aria-label="downvote"
          onClick={() => !isLoading && handleVote("downvote")}
        />
        <div className="flex-center p-1 rounded-sm min-w-5 background-light700_dark400">
          <p className="text-dark400_light900 subtle-medium">
            {formatNumber(downvotes)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Votes;
