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

  const carbonPriceCalifornia = 38.59; // USD per tonne

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
    <div className="w-full px-8 py-6 bg-gradient-to-b from-earthtone-800 via-green-600 to-green-300">
      {/* Overview Card Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg font-semibold">Total Carbon Mass Captured</p>
          <p className="text-3xl font-bold text-green-900">
            {data.total_concentration.toFixed(2)} kg
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg font-semibold">Current Price of Carbon in California</p>
          <p className="text-2xl font-semibold text-gray-700">${carbonPriceCalifornia.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg font-semibold">Current Value of Captured Carbon</p>
          <p className="text-3xl font-bold text-earthtone-400">
            ${((data.total_concentration * carbonPriceCalifornia) / 1000).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Chart Title */}
      <h2 className="text-2xl font-bold mb-4 text-white">Total Carbon Mass Captured Over Time</h2>

      {/* Line Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ResultsView;
