"use client";

import AuthForm from "@/components/forms/auth-form";
import { signUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{ username: "", name: "", email: "", password: "" }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
};

export default SignUp;
