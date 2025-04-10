// src/components/CommitChart.tsx
import { Bar } from 'react-chartjs-2';
import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type CommitChartProps = {
  commitData: {
    week: number;
    days: number[];
  }[];
};

export function CommitChart({ commitData }: CommitChartProps) {
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Commits per day',
        data: commitData[0]?.days || Array(7).fill(0),
        backgroundColor: 'rgba(56, 139, 253, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar options={options} data={data} />;
}