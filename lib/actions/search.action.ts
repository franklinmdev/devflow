"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { GlobalSearchSchema } from "../validations";

export async function globalSearch(
  params: GlobalSearchParams
): Promise<ActionResponse<GlobalSearchResult[]> | ErrorResponse> {
  const validationResult = await action({
    params,
    schema: GlobalSearchSchema,
    authorized: false,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const { query, type } = validationResult.params!;

    const modelsAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    const results: GlobalSearchResult[] = [];
    const regexQuery = { $regex: query, $options: "i" };

    const typesToSearch = type
      ? modelsAndTypes.filter((item) => item.type === type)
      : modelsAndTypes;

    for (const { model, searchField, type: modelType } of typesToSearch) {
      try {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title:
              modelType === "answer"
                ? `Answers containing "${query}"`
                : item[searchField],
            type: modelType as "question" | "user" | "answer" | "tag",
            id:
              modelType === "answer"
                ? item.question.toString()
                : item._id.toString(),
          }))
        );
      } catch (error) {
        console.error(`Error searching ${modelType}:`, error);
      }
    }

    return {
      success: true,
      data: results,
      status: 200,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
