"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { use, useState } from "react";
import { toast } from "sonner";

import { toggleSaveQuestion } from "@/lib/actions/collection.action";
import { cn } from "@/lib/utils";

interface Props {
  questionId: string;
  hasSavedQuestionPromise: Promise<
    ActionResponse<{ saved: boolean }> | ErrorResponse
  >;
}

const SaveQuestion = ({ questionId, hasSavedQuestionPromise }: Props) => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const { data } = use(hasSavedQuestionPromise);
  const { saved: hasSaved } = data || { saved: false };

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!userId) return toast.error("Please login to save a question");

    if (isLoading) return;

    setIsLoading(true);

    try {
      const { success, error } = await toggleSaveQuestion({ questionId });

      if (!success)
        throw new Error(error?.message || "Failed to save question");
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Image
      src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-red.svg"}
      alt="save"
      width={18}
      height={18}
      style={{ width: "18px", height: "auto" }}
      className={cn("cursor-pointer", isLoading && "opacity-50")}
      aria-label="save"
      onClick={handleSave}
    />
  );
};

export default SaveQuestion;
