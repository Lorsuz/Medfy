"use client";

import { questionsService } from "@drexdev/services/questionsService";
import { Question } from "@drexdev/utils/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SimuladoCardQuestion } from "../components/simulado-card-question";
import { Button } from "@drexdev/components/ui/button";
import { cn } from "@drexdev/lib/utils";
import { CardQuestionsComplete } from "../../../components/card-questions-complete";

export default function Simulado() {
  const [questions, setQuestions] = useState<Question[] | undefined>(undefined);
  const [questionsSelected, setQuestionsSelected] = useState<{
    [key: string]: string;
  }>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const local = searchParams.get("local");
  const ano = searchParams.get("ano");
  const quantidade = searchParams.get("quantidade");

  useEffect(() => {
    async function fetchQuestions() {
      const fetchedQuestions = await questionsService.generateQuestions({
        year: Number(ano),
        collegeName: local,
        size:
          quantidade && parseInt(quantidade) >= 10 ? parseInt(quantidade) : 1,
      });

      console.log(fetchedQuestions);
      setQuestions(fetchedQuestions);
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
    <div
      className={cn(
        "max-w-[1200px] mx-auto pb-8",
        !questions &&
          "flex flex-col items-center justify-center min-h-[calc(100vh-80px)]"
      )}
    >
      {questions ? (
        <>
          <header>
            <h1 className="text-lg sm:text-2xl font-bold tracking-tighter">
              Questões de <span className="text-primary">simulados</span>.
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-96">
              Você está fazendo o simulado, você só pode visualizar seus erros e
              acertos após responder todas as questões.
            </p>
          </header>

          <div className="grid gap-3 mt-5">
            {showChart ? (
              <>
                <CardQuestionsComplete
                  correct={calculateResults().correct}
                  incorrect={calculateResults().incorrect}
                />

                <Button
                  className="h-12 rounded-lg hover:bg-primary"
                  onClick={() => router.push("/app/questoes")}
                >
                  Voltar
                </Button>
              </>
            ) : (
              <>
                {questions.map((question) => (
                  <SimuladoCardQuestion
                    key={question.questionId}
                    question={question}
                    hasSubmitted={hasSubmitted}
                    onChange={(option) => {
                      setQuestionsSelected((prev) => ({
                        ...prev,
                        [question.questionId]: option,
                      }));
                    }}
                  />
                ))}

                <div className="flex justify-end items-center w-full gap-1 mt-5">
                  <Button
                    className={cn(
                      "h-10 min-w-56 transition-all",
                      "hover:bg-transparent hover:border hover:border-primary hover:text-primary"
                    )}
                    disabled={
                      Object.keys(questionsSelected).length !== questions.length
                    }
                    onClick={() => {
                      if (hasSubmitted) {
                        setShowChart(true);
                      } else {
                        setHasSubmitted(true);
                      }
                    }}
                  >
                    {hasSubmitted ? "Ver relatório" : "Finalizar o simulado"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        // <l-helix size="45" speed="2.5" color="#5321cc"></l-helix>
        <div className="">Loading...</div>
      )}
    </div>
  );
}
