"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import ROUTES from "@/constants/routes";

import { Button } from "../ui/button";

const SocialAuthForm = () => {
  const buttonClasses =
    "flex-1 px-4 py-3.5 rounded-2 min-h-12 text-dark200_light800 background-dark400_light900 body-medium";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
      });
    } catch (error) {
      console.error(error);
      toast.error("Sign-in failed", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during sign-in",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2.5 mt-6">
      <Button className={buttonClasses} onClick={() => handleSignIn("github")}>
        <Image
          src="/icons/github.svg"
          alt="GitHub Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        Log in with GitHub
      </Button>
      <Button className={buttonClasses} onClick={() => handleSignIn("google")}>
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
        />
        Log in with Google
      </Button>
    </div>
  );
};

export default SocialAuthForm;
