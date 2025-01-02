"use client";

import { TesteCardQuestion } from "../components/teste-card-question";
import { CardQuestionsComplete } from "@drexdev/app/(private)/app/components/card-questions-complete";
import { Button } from "@drexdev/components/ui/button";
import { Loading } from "@drexdev/components/ui/loading";
import { questionsService } from "@drexdev/services/questionsService";
import { Question } from "@drexdev/utils/types";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Test() {
  const [questions, setQuestions] = useState<Question[]>();
  const [questionsSelected, setQuestionsSelected] = useState<{
    [key: string]: string;
  }>({});
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [indexQuestion, setIndexQuestion] = useState(0);

  const searchParams = useSearchParams();

  const local = searchParams.get("local");
  const ano = searchParams.get("ano");
  const quantidade = searchParams.get("quantidade");

  function handleNextQuestion() {
    console.log(questions);
    setIndexQuestion(indexQuestion + 1);
    setCurrentQuestion(questions?.[indexQuestion + 1]);
  }

  const completeQuestion = (question: Question, selectedOption: string) => {
    setQuestionsSelected({
      ...questionsSelected,
      [question.questionId]: selectedOption,
    });
  };

  useEffect(() => {
    async function fetchQuestions() {
      const fetchedQuestions = await questionsService.generateQuestions({
        year: Number(ano),
        collegeName: local,

        size:
          quantidade && parseInt(quantidade) >= 10 ? parseInt(quantidade) : 15,
      });

      setQuestions(fetchedQuestions);
      setCurrentQuestion(fetchedQuestions[0]);
    }

    fetchQuestions();
  }, [local, ano, quantidade]);

  const calculateResults = () => {
    const correct = questions!.filter(
      (question) =>
        question.options.find((option) => option.isRight)?.option ===
        questionsSelected[question.questionId]
    ).length;

    const incorrect = questions!.filter(
      (question) =>
        question.options.find((option) => option.isRight)?.option !==
        questionsSelected[question.questionId]
    ).length;

    return { correct, incorrect };
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <main className="mt-8 flex flex-col gap-3">
        {questions ? (
          <>
            <header>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tighter">
                Questões de <span className="text-primary">teste</span>.
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm max-w-96">
                Selecione a opção correta para cada questão.
              </p>
            </header>
            
            {currentQuestion ? (
              <TesteCardQuestion
                question={currentQuestion}
                complete={completeQuestion}
                next={handleNextQuestion}
              />
            ) : (
              <>
                <CardQuestionsComplete
                  correct={calculateResults().correct}
                  incorrect={calculateResults().incorrect}
                />
                <Button
                  className="h-12 rounded-lg hover:bg-primary"
                  onClick={() => redirect("/app/questoes")}
                >
                  Voltar
                </Button>
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
            <Loading className="w-10 h-10 text-primary" />
          </div>
        )}
      </main>
    </div>
  );
}
