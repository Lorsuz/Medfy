"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@drexdev/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@drexdev/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";

const chartData = [
  { type: "correct", value: 1260, fill: "hsl(var(--primary))" },
  { type: "incorrect", value: 460, fill: "hsl(var(--secondary))" },
];

const chartConfig = {
  value: {
    label: "Questões",
  },
  correct: {
    label: "Corretas",
  },
  incorrect: {
    label: "Incorretas",
  },
} satisfies ChartConfig;

const ChartQuestions = () => {
  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[200px] aspect-square w-52"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="type"
          innerRadius={55}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-xl font-bold"
                    >
                      {"1,459"}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Questões
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export const CardQuestionsComplete = () => {
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
          <ChartQuestions />

          <div className="flex flex-col gap-4 flex-1 relative w-full">
            <header>
              <h1 className="text-lg font-bold">Seu desempenho:</h1>
              <p className="text-muted-foreground text-xs max-w-96">
                Visualize seu progresso em relação ao total de questões.
              </p>
            </header>
            <div className="flex flex-col gap-1">
              <header className="">
                <h2 className="text-sm font-medium">
                  <b className="text-[#3b82f6]">201</b> questoes corretas.
                </h2>
              </header>

              <div className="relative w-full h-3 rounded-sm bg-muted">
                <div className="absolute top-0 left-0 h-3 w-2/3 rounded-sm bg-[#3b82f6]" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <header className="">
                <h2 className="text-sm font-medium">
                  <b className="text-red-500">40</b> questoes erradas.
                </h2>
              </header>

              <div className="relative w-full h-3 rounded-sm bg-muted">
                <div className="absolute top-0 left-0 h-3 w-1/3 rounded-sm bg-[#f43f5e]" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
