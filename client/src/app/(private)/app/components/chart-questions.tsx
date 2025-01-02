import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@drexdev/components/ui/chart";

import { Label, Pie, PieChart } from "recharts";

const chartConfig = {
  correct: { label: "Corretas" },
  incorrect: { label: "Incorretas" },
} satisfies ChartConfig;

interface ChartQuestionsProps {
  correct: number;
  incorrect: number;
}

export const ChartQuestions: React.FC<ChartQuestionsProps> = ({
  correct,
  incorrect,
}) => {
  const chartData = [
    { type: "correct", value: correct, fill: "hsl(var(--primary))" },
    { type: "incorrect", value: incorrect, fill: "hsl(var(--secondary))" },
  ];

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
                      {correct + incorrect}
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
