"use client";
import { useEffect, useState } from "react";
import { useQuestions } from "./hooks/use-questions";
import { Question } from "@drexdev/utils/types";
import { TesteCardQuestion } from "../components/teste-card-question";
import { CardQuestionsComplete } from "@drexdev/app/(private)/app/components/card-questions-complete";
import { Button } from "@drexdev/components/ui/button";
import { useRouter } from "next/navigation";

interface QuestionCompleted {
  question: Question;
  selectedOption: string;
}

export default function Test() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionsCompleted, setQuestionsCompleted] = useState<
    QuestionCompleted[]
  >([]);

  const router = useRouter();
  const { generateQuestion } = useQuestions();

  const handleNextQuestion = () => {
    const nextQuestion = generateQuestion();
    setCurrentQuestion(nextQuestion);
  };

  const completeQuestion = (question: Question, selectedOption: string) => {
    setQuestionsCompleted((prev) => [...prev, { question, selectedOption }]);
  };

  useEffect(() => {
    handleNextQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalQuestions = questionsCompleted.length;
  const correctQuestions = questionsCompleted.filter(
    ({ question, selectedOption }) => question.isRights === selectedOption
  ).length;

  const incorrectQuestions = totalQuestions - correctQuestions;

  return (
    <div className="max-w-[1200px] mx-auto">
      <header>
        <h1 className="text-lg sm:text-2xl font-bold tracking-tighter">
          Questões de <span className="text-primary">teste</span>.
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-96">
          Você está fazendo o simulado, você só pode visualizar seus erros e
          acertos após responder todas as questões.
        </p>
      </header>

      <main className="mt-8 flex flex-col gap-3">
        {currentQuestion ? (
          <TesteCardQuestion
            question={currentQuestion}
            complete={completeQuestion}
            next={handleNextQuestion}
          />
        ) : (
          <>
            <CardQuestionsComplete
              correct={correctQuestions}
              incorrect={incorrectQuestions}
            />
            <Button
              className="h-12 rounded-lg hover:bg-primary"
              onClick={() => router.back()}
            >
              Voltar
            </Button>
          </>
        )}
      </main>
    </div>
  );
}
