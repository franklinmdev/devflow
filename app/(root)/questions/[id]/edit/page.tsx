import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import ROUTES from "@/constants/routes";
import { getQuestion } from "@/lib/actions/question.action";

export default async function EditQuestion({ params }: RouteParams) {
  const { id } = await params;
  if (!id) {
    return notFound();
  }

  const session = await auth();

  if (!session?.user) {
    redirect(ROUTES.SIGN_IN);
  }

  const { data: question, success } = await getQuestion({ questionId: id });
  if (!success) return notFound();

  if (question?.author.toString() !== session?.user?.id)
    redirect(ROUTES.QUESTION(id));

  return (
    <div className="mt-9">
      <QuestionForm isEdit question={question} />
    </div>
  );
}
