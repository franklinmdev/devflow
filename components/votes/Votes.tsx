"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import React from "react";
import { toast } from "sonner";

import { cn, formatNumber } from "@/lib/utils";

interface Props {
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
}

const Votes = ({ upvotes, hasupVoted, downvotes, hasdownVoted }: Props) => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const [isLoading, setIsLoading] = React.useState(false);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId)
      return toast.error("Please login to vote", {
        description: "You must be logged in to vote",
      });

    setIsLoading(true);

    try {
      const successMessage =
        voteType === "upvote"
          ? `Upvote ${hasupVoted ? "added" : "removed"}`
          : `Downvote ${hasdownVoted ? "added" : "removed"}`;

      toast.success(successMessage, {
        description: "Your vote has been registered",
      });
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
          src={hasupVoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"}
          width={18}
          height={18}
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
          src={hasdownVoted ? "/icons/downvoted.svg" : "/icons/downvote.svg"}
          width={18}
          height={18}
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
