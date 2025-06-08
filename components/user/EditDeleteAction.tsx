"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";

interface EditDeleteActionProps {
  type: "question" | "answer";
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: EditDeleteActionProps) => {
  const router = useRouter();
  const handleEdit = async () => {
    router.push(ROUTES.EDIT_QUESTION(itemId));
  };
  const handleDelete = async () => {
    if (type === "question") {
      // TODO: delete question
      toast.success("Question deleted successfully");
    } else if (type === "answer") {
      // TODO: delete answer
      toast.success("Answer deleted successfully");
    }
  };

  return (
    <div
      className={cn(
        "flex justify-end items-center gap-3 max-sm:w-full",
        type === "answer" && "gap-0 justify-center"
      )}
    >
      {type === "question" && (
        <Image
          src="/icons/edit.svg"
          alt="edit"
          width={14}
          height={14}
          className="object-contain cursor-pointer"
          onClick={handleEdit}
        />
      )}
      <AlertDialog>
        <AlertDialogTrigger className="cursor-pointer">
          <Image
            src="/icons/trash.svg"
            alt="trash"
            width={14}
            height={14}
            className="object-contain cursor-pointer"
          />
        </AlertDialogTrigger>
        <AlertDialogContent className="background-light800_dark300">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your{" "}
              {type === "question" ? "question" : "answer"} and remove it from
              our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer btn">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="!bg-primary-500 !border-primary-100 !text-light-800 cursor-pointer"
              onClick={handleDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditDeleteAction;
