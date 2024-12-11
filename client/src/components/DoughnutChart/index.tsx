// components/PieChart.js
"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
  const data = {
    datasets: [
      {
        label: "questões",
        data: [60, 40],
        backgroundColor: ["#7DB925", "#DE0000"],
        hoverBackgroundColor: ["#7DB925", "#DE0000"],
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "65%",
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#fff",
        titleColor: "#575757",
        bodyColor: "#575757",
      },
    },
  };

  return (
    <div
      style={{
        width: "188px",
        height: "195px",
      }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
}
