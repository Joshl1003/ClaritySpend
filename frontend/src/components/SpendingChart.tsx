import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface SpendingChartProps {
  data: { category: string; amount: number }[];
}

export default function SpendingChart({ data }: SpendingChartProps) {
  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        label: "Spending by Category",
        data: data.map((d) => d.amount),
        backgroundColor: [
          "#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={chartData} />;
}
