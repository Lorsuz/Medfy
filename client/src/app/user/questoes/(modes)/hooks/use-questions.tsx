import { questions } from "@drexdev/utils/constants";
import { Question } from "@drexdev/utils/types";
import { useState } from "react";

interface IQuestionCompleted {
  question: Question;
  selectedOption: string;
  correctOption: string;
}

export function useQuestions() {
  const [remainingQuestions, setRemainingQuestions] =
    useState<Question[]>(questions);
  const [questionsCompleted, setQuestionsCompleted] = useState<
    IQuestionCompleted[]
  >([]);

  function generateQuestion() {
    if (remainingQuestions.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const question = remainingQuestions[randomIndex];

    setRemainingQuestions((prev) =>
      prev.filter((_, index) => index !== randomIndex)
    );

    return question;
  }

  function completeQuestion(
    question: Question,
    selectedOption: string,
    correctOption: string
  ) {
    setQuestionsCompleted((prev) => [
      ...prev,
      { question, selectedOption, correctOption },
    ]);
  }

  return { generateQuestion, completeQuestion };
}
