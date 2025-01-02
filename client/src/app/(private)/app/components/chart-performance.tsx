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
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const COLORS = {
  total: "hsl(var(--primary))",
  correct: "#3b82f6",
  incorrect: "#f43f5e",
};

const chartData = [
  { month: "Janeiro", total: 1000, correct: 720, incorrect: 280 },
  { month: "Fevereiro", total: 629, correct: 560, incorrect: 69 },
  { month: "Março", total: 530, correct: 415, incorrect: 115 },
  { month: "Abril", total: 1200, correct: 400, incorrect: 800 },
  { month: "Maio", total: 250, correct: 210, incorrect: 40 },
];

const chartConfig: ChartConfig = {
  total: { label: "Total" },
  correct: { label: "Corretas" },
  incorrect: { label: "Incorretas" },
} as ChartConfig;

export const ChartPerformance = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Desempenho</CardTitle>
        <CardDescription>
          Visualize seu desempenho em relação ao total de questões.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="max-h-[200px] w-full"
          config={chartConfig}
          role="region"
          aria-label="Gráfico de desempenho"
        >
          <LineChart
            data={chartData}
            margin={{ left: 12, right: 12 }}
            aria-label="Gráfico de linhas mostrando o desempenho mensal"
          >
            <CartesianGrid vertical={true} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              aria-label="Meses do ano"
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Line
              dataKey="total"
              type="natural"
              stroke={COLORS.total}
              strokeWidth={2}
              dot={true}
              aria-label="Total de questões"
            />
            <Line
              dataKey="correct"
              type="natural"
              stroke={COLORS.correct}
              strokeWidth={2}
              dot={true}
              aria-label="Questões corretas"
            />
            <Line
              dataKey="incorrect"
              type="natural"
              stroke={COLORS.incorrect}
              strokeWidth={2}
              dot={true}
              aria-label="Questões incorretas"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
