"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

import { toggleSaveQuestion } from "@/lib/actions/collection.action";
import { cn } from "@/lib/utils";

const SaveQuestion = ({ questionId }: { questionId: string }) => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!userId) return toast.error("Please login to save a question");

    if (isLoading) return;

    setIsLoading(true);

    try {
      const { success, data, error } = await toggleSaveQuestion({ questionId });

      if (!success)
        throw new Error(error?.message || "Failed to save question");

      toast.success(data?.saved ? "Question saved" : "Question removed");
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasSved = false;

  return (
    <Image
      src={hasSved ? "/icons/star-filled.svg" : "/icons/star-red.svg"}
      alt="save"
      width={18}
      height={18}
      className={cn("cursor-pointer", isLoading && "opacity-50")}
      aria-label="save"
      onClick={handleSave}
    />
  );
};

export default SaveQuestion;
