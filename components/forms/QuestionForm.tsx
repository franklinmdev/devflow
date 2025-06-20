"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import Editor from "@/components/editor";
import ROUTES from "@/constants/routes";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { AskQuestionSchema } from "@/lib/validations";

import TagCard from "../cards/TagCard";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface IQuestionFormProps {
  isEdit?: boolean;
  question?: Question | null;
}

const QuestionForm = ({ isEdit = false, question }: IQuestionFormProps) => {
  const router = useRouter();
  const editorRef = React.useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: question?.tags.map((tag) => tag.name) || [],
    },
  });

  const handleCreateQuestion = async (
    data: z.infer<typeof AskQuestionSchema>
  ) => {
    if (isEdit && question) {
      const result = await editQuestion({
        questionId: question?._id,
        ...data,
      });

      if (result.success) {
        toast.success("Success", {
          description: "Question updated successfully",
        });
        if (result.data)
          router.push(ROUTES.QUESTION(result.data._id as string));
      } else {
        toast.error("Failed to update question", {
          description: result.error?.message || "Something went wrong",
        });
      }
      return;
    }

    const result = await createQuestion(data);

    startTransition(async () => {
      if (result.success) {
        toast.success("Success", {
          description: "Question created successfully",
        });
        if (result.data) router.push(ROUTES.QUESTION(result.data._id));
      } else {
        toast.error("Failed to create question", {
          description: result.error?.message || "Something went wrong",
        });
      }
    });
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    console.log(field, e);
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);

    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "At least one tag is required",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateQuestion)}
        className="flex flex-col gap-10 w-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="text-dark-400_light800 paragraph-semibold">
                Question title<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="border light-border-2 min-h-[56px] text-dark-300_light700 paragraph-regular no-focus background-light700_dark300"
                  {...field}
                />
              </FormControl>
              <FormDescription className="mt-2.5 text-light-500 body-regular">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="text-dark-400_light800 paragraph-semibold">
                Detailed explanation of your problem
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  ref={editorRef}
                  value={field.value}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="mt-2.5 text-light-500 body-regular">
                Introduce the problem and expand on it.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-dark-400_light800 paragraph-semibold">
                Tags<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="border light-border-2 min-h-[56px] text-dark-300_light700 paragraph-regular no-focus background-light700_dark300"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-wrap flex-start gap-2.5 mt-2.5 body-regular">
                      {field.value.map((tag) => (
                        <TagCard
                          key={tag}
                          _id={tag}
                          name={tag}
                          compact
                          remove
                          isButton
                          handleRemove={() => handleTagRemove(tag, field)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="mt-2.5 text-light-500 body-regular">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end mt-16">
          <Button
            type="submit"
            className="w-fit !text-light-900 cursor-pointer primary-gradient"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                <span>Submitting</span>
              </>
            ) : (
              <>{isEdit ? "Save changes" : "Ask a question"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
