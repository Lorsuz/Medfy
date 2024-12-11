"use client";

import { format, subDays, subMonths } from "date-fns";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  TooltipModel,
} from "chart.js";
import styled from "styled-components";
import { useRef } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 24px;
`;

export default function MultiAxisLineChart() {
  const acertos = [null, 65, 59, 80, 81, 56, 55];
  const erros = [null, 28, 48, 40, 19, 86, 27];
  const total = acertos.map((acerto, index) =>
    acerto !== null ? acerto + (erros[index] || 0) : null
  );

  const isWeekly = true;

  const generateLabels = () => {
    const today = new Date();

    if (isWeekly) {
      const labels = Array.from({ length: 6 }, (_, i) => {
        const date = subDays(today, i);
        return format(date, "dd/MM");
      }).reverse();

      return ["0", ...labels];
    } else {
      const labels = Array.from({ length: 12 }, (_, i) => {
        const date = subMonths(today, i);
        const dateWithDay10 = new Date(date.getFullYear(), date.getMonth(), 10);
        return format(dateWithDay10, "dd/MM");
      }).reverse();

      return ["0", ...labels];
    }
  };

  const data = {
    labels: generateLabels(),
    datasets: [
      {
        label: "Acertos",
        data: acertos,
        borderColor: "#3CC3DF",
        backgroundColor: "transparent",
        fill: false,
        pointRadius: 5,
        pointBackgroundColor: " #fff",
        pointBorderColor: "#3CC3DF",
        pointBorderWidth: 2,
        borderWidth: 2,
      },
      {
        label: "Erros",
        data: erros,
        borderColor: "#FF928A",
        backgroundColor: "transparent",
        fill: false,
        pointRadius: 5,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#FF928A",
        pointBorderWidth: 2,
        borderWidth: 2,
      },
      {
        label: "Total",
        data: total,
        borderColor: "#8979FF",
        backgroundColor: "transparent",
        fill: false,
        pointRadius: 5,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#8979FF",
        pointBorderWidth: 2,
        borderWidth: 2,
      },
    ],
  };

  const tooltipEl = useRef<HTMLDivElement | null>(null);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          Line: true,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: (context: {
          chart: ChartJS;
          tooltip: TooltipModel<"line">;
        }) => {
          const tooltipModel = context.tooltip;

          if (tooltipModel.opacity === 0) {
            if (tooltipEl.current) tooltipEl.current.style.opacity = "0";
            return;
          }

          // const index = tooltipModel.dataPoints[0].dataIndex;

          const validAcertos = acertos.filter(
            (value): value is number => value !== null && value !== undefined
          );

          const validErros = erros.filter(
            (value): value is number => value !== null && value !== undefined
          );

          const totalAcertos = validAcertos.reduce((acc, cur) => acc + cur, 0);
          const totalErros = validErros.reduce((acc, cur) => acc + cur, 0);
          const totalConcluidas = totalAcertos + totalErros;

          const taxaAcerto = Math.round((totalAcertos / totalConcluidas) * 100);

          if (tooltipEl.current) {
            tooltipEl.current.innerHTML = ` 
              <div style="color: #575757; font-size: 10px; font-weight: 400; line-height: 1.2; margin-bottom: 2px;">
                 ${totalConcluidas} questões concluídas
              </div>
                <div style="color: #A0A0A0; font-size: 9px; font-weight: 500; line-height: 1.2;">
                <b>Taxa de acerto: ${taxaAcerto}%</b>
              </div>  
            `;
          }

          const position = context.chart.canvas.getBoundingClientRect();
          if (tooltipEl.current) {
            tooltipEl.current.style.opacity = "1";
            tooltipEl.current.style.left =
              position.left + tooltipModel.caretX + "px";
            tooltipEl.current.style.top =
              position.top + tooltipModel.caretY - 40 + "px";
          }
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          borderDash: [5, 5],
        },
      },
      y: {
        type: "linear" as const,
        position: "left" as const,
        beginAtZero: true,
        grid: {
          display: true,
          borderDash: [5, 5],
        },
      },
    },
  };

  return (
    <ChartContainer>
      <div
        ref={tooltipEl}
        style={{ position: "absolute", pointerEvents: "none" }}
      ></div>{" "}
      <Line options={options} data={data} />
    </ChartContainer>
  );
}
