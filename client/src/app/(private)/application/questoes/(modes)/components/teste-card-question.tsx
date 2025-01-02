"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@drexdev/components/ui/card";
import { Question } from "@drexdev/utils/types";
import { QuestionHeader } from "./question-header";
import { QuestionImage } from "./question-image";
import { QuestionOptions } from "./question-options";
import { useEffect, useState } from "react";
import { Button } from "@drexdev/components/ui/button";
import { cn } from "@drexdev/lib/utils";

interface CardQuestionProps {
  question: Question;
  next(): void;
  complete(question: Question, selectedOption: string): void;
}

export function TesteCardQuestion({
  question,
  complete,
  next,
}: CardQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string>();
  const [submittedOption, setSubmittedOption] = useState<string>();

  useEffect(() => {
    setSelectedOption(undefined);
    setSubmittedOption(undefined);
  }, [question]);

  const handleSubmit = () => {
    if (selectedOption && !submittedOption) {
      setSubmittedOption(selectedOption);
      complete(question, selectedOption);
    } else {
      next();
    }
  };

  const correctAnswer = question.options.findIndex((option) => option.isRight);
  const hasSubmitted = Boolean(submittedOption);

  return (
    <Card className="shadow-none rounded-xl px-4 py-2">
      <CardHeader>
        <QuestionHeader
          questionId={question.questionId}
          categoryHistory={question.category_history}
          year={question.year}
          collegeName={question.collegeName}
        />
      </CardHeader>

      <CardContent>
        <div>
          <h1 className="text-base font-medium leading-7 text-justify">
            {question.question}
          </h1>

          {question.image && <QuestionImage src={question.image} />}

          <QuestionOptions
            options={question.options}
            selectedOption={selectedOption}
            onChange={setSelectedOption}
            optionCorrect={hasSubmitted ? question.isRights : undefined}
          />
        </div>
      </CardContent>

      <CardFooter className="mt-4">
        {hasSubmitted && (
          <div className="w-full space-y-3 pl-6">
            <h1 className="font-semibold text-sm">
              Resposta correta: Letra {String.fromCharCode(65 + correctAnswer)}
            </h1>
            <p className="text-sm text-muted-foreground">
              {question.justification}
            </p>
          </div>
        )}

        <div className="flex justify-end items-center w-full gap-1">
          <Button
            className={cn(
              "h-10 min-w-56 transition-all",
              hasSubmitted
                ? "hover:bg-transparent hover:border hover:border-primary hover:text-primary"
                : "bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            )}
            disabled={!selectedOption}
            onClick={handleSubmit}
          >
            {hasSubmitted ? "Próxima questão" : "Responder questão"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
