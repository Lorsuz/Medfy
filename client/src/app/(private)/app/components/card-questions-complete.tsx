"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@drexdev/components/ui/card";
import { cn } from "@drexdev/lib/utils";
import React from "react";
import { ChartQuestions } from "./chart-questions";

interface CardQuestionsCompleteProps {
  correct: number;
  incorrect: number;
}

export const CardQuestionsComplete: React.FC<CardQuestionsCompleteProps> = ({
  correct,
  incorrect,
}) => {
  const total = correct + incorrect;

  const percentageCorrect = (correct / total) * 100 + "%";
  const percentageIncorrect = (incorrect / total) * 100 + "%";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Questões resolvidas</CardTitle>
        <CardDescription>
          Você tem <b>4</b> questões resolvidas
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="w-full flex items-center md:items-center flex-col md:flex-row gap-6 sm:px-6 max-md:pb-8 relative">
          <ChartQuestions correct={correct} incorrect={incorrect} />

          <div className="flex flex-col gap-4 flex-1 relative w-full">
            <header>
              <h1 className="text-lg font-bold">Seu desempenho:</h1>
              <p className="text-muted-foreground text-xs max-w-96">
                Visualize seu progresso em relação ao total de questões.
              </p>
            </header>
            <div className="flex flex-col gap-1">
              <header>
                <h2 className="text-sm font-medium">
                  <b className="text-[#3b82f6]">{correct}</b> questoes corretas.
                </h2>
              </header>

              <div className="relative w-full h-3 rounded-sm bg-muted">
                <div
                  className={cn(
                    `absolute top-0 left-0 h-3 rounded-sm bg-[#3b82f6]`
                  )}
                  style={{
                    width: `${percentageCorrect}`,
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <header>
                <h2 className="text-sm font-medium">
                  <b className="text-red-500">{incorrect}</b> questoes erradas.
                </h2>
              </header>

              <div className="relative w-full h-3 rounded-sm bg-muted">
                <div
                  className={cn(
                    `absolute top-0 left-0 h-3 rounded-sm bg-[#f43f5e]`
                  )}
                  style={{
                    width: `${percentageIncorrect}`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
