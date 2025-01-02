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
}

export function CardQuestion({ question, next }: CardQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );

  const [submitOption, setSubmitOption] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setSelectedOption(undefined);
    setSubmitOption(undefined);
  }, [question]);

  return (
    <Card className="shadow-none rounded-xl px-4 py-2">
      <CardHeader>
        <QuestionHeader
          questionId={question.questionId}
          categoryHistory={question.category_history}
          year={question.year}
          collegeName={question.college_name}
        />
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-medium leading-7 text-justify">
              {question.question}
            </h1>
          </div>

          {question.image && <QuestionImage src={question.image} />}

          <QuestionOptions
            options={question.options}
            selectedOption={selectedOption}
            onChange={setSelectedOption}
            optionCorrect={submitOption ? question.isRights : undefined}
          />
        </div>
      </CardContent>

      <CardFooter className="mt-4">
        <div className="space-y-10 w-full">
          {submitOption && (
            <div className="w-full space-y-3 pl-6">
              <h1 className="font-semibold text-sm">
                Resposta correta: Letra{" "}
                {String.fromCharCode(
                  65 + question.options.findIndex((option) => option.isRight)
                )}
                )
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
                !submitOption
                  ? "bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  : "hover:bg-transparent hover:border hover:border-primary hover:text-primary"
              )}
              disabled={!selectedOption}
              onClick={() => {
                if (selectedOption && !submitOption)
                  setSubmitOption(selectedOption);
                else next();
              }}
            >
              {submitOption ? "Proxima questão" : "Responder questão"}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
