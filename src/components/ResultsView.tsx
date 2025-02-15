import { Line } from "react-chartjs-2";
import "chart.js/auto";
import InferenceResponse from "@/types/InferenceResponse";

interface ResultsViewProps {
  data: InferenceResponse;
  years: number;
}

const ResultsView = ({ data, years }: ResultsViewProps) => {
  const datapointsPerYear = Math.floor(data.concentration_ts.length / years);
  const labels = data.concentration_ts.map((_, i) => {
    if (i % datapointsPerYear === 0 && i !== 0) {
      return `Year ${Math.floor(i / datapointsPerYear)}`;
    }
    return "";
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Carbon Mass Captured Over Time",
        data: data.concentration_ts,
        fill: false,
        borderColor: "#4CAF50",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          callback: function (val, index) {
            return labels[index] || "";
          },
          autoSkip: false,
          color: "#000000",
        },
        grid: {
          color: "#FFFFFF",
        },
      },
      y: {
        ticks: {
          color: "#000000",
        },
        grid: {
          color: "#FFFFFF",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#000000",
        },
      },
    },
    maintainAspectRatio: true,
    responsive: true,
    backgroundColor: "white",
  };

  return (
    <div className="w-full">
      <p className="mt-4 text-lg">
        Total Carbon Mass Captured: {data.total_concentration.toFixed(2)} kg
      </p>
      <h2 className="text-2xl font-bold mb-4">
        Total Carbon Mass Captured Over Time
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ResultsView;
