"use client";

import { useEffect, useState } from "react";
import { useQuestions } from "../hooks/use-questions";
import { Question } from "@drexdev/utils/types";
import { CardQuestion } from "../components/card-question";

export default function Test() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const { generateQuestion, completeQuestion } = useQuestions();

  function handleNextQuestion(selectedOption?: string) {
    const nextQuestion = generateQuestion();
    setCurrentQuestion(nextQuestion);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleNextQuestion(), []);

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

      <div className="mt-8">
        {currentQuestion ? (
          <CardQuestion question={currentQuestion} next={handleNextQuestion} />
        ) : (
          <p className="mt-8 text-muted-foreground">
            Nenhuma questão disponível.
          </p>
        )}
      </div>

      <footer className="mt-8"></footer>
    </div>
  );
}
