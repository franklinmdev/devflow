"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AskQuestionSchema } from "@/lib/validations";

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

const QuestionForm = () => {
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = (values: z.infer<typeof AskQuestionSchema>) => {
    console.log(values);
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
              <FormControl>Editor</FormControl>
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
                    {...field}
                  />
                  Tags
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
            className="w-fit !text-light-900 primary-gradient"
          >
            Ask a question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
