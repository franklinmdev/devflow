import QuestionForm from "@/components/forms/QuestionForm";

export default function AskQuestion() {
  return (
    <>
      <h1 className="text-dark100_light900 h1-bold">Ask a question</h1>
      <div className="mt-9">
        <QuestionForm />
      </div>
    </>
  );
}
