import { Line } from "react-chartjs-2";
import "chart.js/auto";
import InferenceResponse from "@/types/InferenceResponse";

interface ResultsViewProps {
  data: InferenceResponse;
}

const ResultsView = ({ data }: ResultsViewProps) => {
  const labels = data.concentration_ts.map((_, i) => `Year ${i + 1}`);

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

  return (
    <div>
      <p className="mt-4 text-lg">
        Total Carbon Mass Captured: {data.total_concentration.toFixed(2)} kg
      </p>
      <h2 className="text-2xl font-bold mb-4">
        Total Carbon Mass Captured Over Time
      </h2>
      <Line data={chartData} />
    </div>
  );
};

export default ResultsView;
