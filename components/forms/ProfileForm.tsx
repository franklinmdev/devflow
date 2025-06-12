"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm, Control, FieldPath } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import ROUTES from "@/constants/routes";
import { updateUser } from "@/lib/actions/user.action";
import { UpdateUserSchema } from "@/lib/validations";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Props {
  user: User;
}

type FormData = z.infer<typeof UpdateUserSchema>;

interface FormFieldWrapperProps {
  control: Control<FormData>;
  name: FieldPath<FormData>;
  label: string;
  placeholder: string;
  required?: boolean;
  multiline?: boolean;
}

const FormFieldWrapper = ({
  control,
  name,
  label,
  placeholder,
  required = false,
  multiline = false,
}: FormFieldWrapperProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-col w-full">
        <FormLabel className="text-dark-400_light800 paragraph-semibold">
          {label}
          {required && <span className="text-primary-500">*</span>}
        </FormLabel>
        <FormControl>
          {multiline ? (
            <Textarea
              className="border light-border-2 min-h-[120px] text-dark-300_light700 resize-none paragraph-regular no-focus background-light700_dark300"
              placeholder={placeholder}
              {...field}
            />
          ) : (
            <Input
              className="border light-border-2 min-h-[56px] text-dark-300_light700 paragraph-regular no-focus background-light700_dark300"
              placeholder={placeholder}
              {...field}
            />
          )}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const ProfileForm = ({ user }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      bio: user.bio || "",
      location: user.location || "",
      portfolio: user.portfolio || "",
    },
  });

  const handleUpdateProfile = async (data: FormData) => {
    startTransition(async () => {
      try {
        const result = await updateUser(data);

        if (result.success) {
          toast.success("Success", {
            description: "Profile updated successfully",
          });
          router.push(ROUTES.PROFILE(user._id));
        } else {
          toast.error("Failed to update profile", {
            description: result.error?.message || "Something went wrong",
          });
        }
      } catch {
        toast.error("Failed to update profile", {
          description: "An unexpected error occurred",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateProfile)}
        className="flex flex-col gap-10 mt-8 w-full"
      >
        <FormFieldWrapper
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          required
        />

        <FormFieldWrapper
          control={form.control}
          name="username"
          label="Username"
          placeholder="Enter your username"
          required
        />

        <FormFieldWrapper
          control={form.control}
          name="portfolio"
          label="Portfolio Website"
          placeholder="https://yourportfolio.com"
        />

        <FormFieldWrapper
          control={form.control}
          name="location"
          label="Location"
          placeholder="Where are you based?"
        />

        <FormFieldWrapper
          control={form.control}
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself..."
          multiline
        />

        {/* Submit Button */}
        <div className="flex justify-end mt-16">
          <Button
            type="submit"
            className="w-fit !text-light-900 cursor-pointer primary-gradient"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                <span>Updating Profile...</span>
              </>
            ) : (
              "Update Profile"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
