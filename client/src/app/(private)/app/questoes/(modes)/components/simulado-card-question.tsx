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
import { useState } from "react";
interface CardQuestionProps {
  question: Question;
  hasSubmitted: boolean;
  onChange(selectedOption: string): void;
}

export function SimuladoCardQuestion({
  question,
  hasSubmitted,
  onChange,
}: CardQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string>();

  const correctAnswer = question.options.find((option) => option.isRight)!;
  const correctAnswerIndex = question.options.findIndex((option) => option.isRight);

  function handleChange(selectedOption: string) {
    setSelectedOption(selectedOption);
    onChange(selectedOption);
  }

  return (
    <Card className="shadow-none rounded-xl px-4 py-2">
      <CardHeader>
        <QuestionHeader
          questionId={question.questionId}
          categoryHistory={[question.categoryName]}
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
            onChange={handleChange}
            optionCorrect={hasSubmitted ? correctAnswer.option : undefined}
          />
        </div>
      </CardContent>

      <CardFooter className="mt-4">
        {hasSubmitted && (
          <div className="w-full space-y-3 pl-6">
            <h1 className="font-semibold text-sm">
              Resposta correta: Letra {String.fromCharCode(65 + correctAnswerIndex)}
            </h1>
            <p className="text-sm text-muted-foreground">
              {question.justification}
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
