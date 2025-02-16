import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import InferenceResponse from "@/types/InferenceResponse";

// Load environment variables
const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;
const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;

interface ResultsViewProps {
  data: InferenceResponse;
  years: number;
}

const ResultsView = ({ data, years }: ResultsViewProps) => {
  const [executiveSummary, setExecutiveSummary] = useState<string>("");
  const [newsArticles, setNewsArticles] = useState<{ title: string; url: string }[]>([]);

  const datapointsPerYear = Math.floor(data.concentration_ts.length / years);
  const labels = data.concentration_ts.map((_, i) => {
    if (i % datapointsPerYear === 0 && i !== 0) {
      return `Year ${Math.floor(i / datapointsPerYear)}`;
    }
    return "";
  });

  const carbonPriceCalifornia = 340; // USD per tonne

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

  // Fetch Executive Summary (Mistral AI)
  useEffect(() => {
    const fetchExecutiveSummary = async () => {
      const inputFile = "CrunchFlow input data";
      const outputFile = "CrunchFlow output results";
      const furtherData = "Further knowledge data";

      const prompt = `
        You are a farmer and geograhy expert who really cares about the environment and is interested in carbon capture. You are really good in explaining complicated data extremely easy.
        You want to help farmers understand the results of their carbon capture project more easily. Therefore you are providing them with an executive summary.
        ### Input ###
        Based on the input file: ${inputFile}
        And the output file: ${outputFile}
        And the further knowledge data: ${furtherData}
        Further information: ${data}
        ### Instructions ###
        Generate an easy-to-understand executive summary for a farmer covering:
        1) Explain what the output and results mean, especially when it comes to the output file. Give them context to understand what was calculated, why and also how the results fit into the larger context of the input file.
        2) Give more context about the selected methods of the input file. Dive into what could be changed in order to get "better results". Better results in this case are ways to capture even more co2.
        3) Explain more about the soil composition and best methods for this kind of soil
      `;

      try {
        const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${MISTRAL_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "mistral-large-latest",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
          }),
        });

        const result = await response.json();
        setExecutiveSummary(result.choices[0]?.message?.content || "Error generating summary.");
      } catch (error) {
        console.error("Error fetching executive summary:", error);
        setExecutiveSummary("Failed to generate summary.");
      }
    };

    fetchExecutiveSummary();
  }, []);

  // Fetch Latest News (Perplexity AI)
  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch("https://api.perplexity.ai/news", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: "Your task is to find three quite new articles that cover carbon removal and could be quite interesting for a farmer. Return the title and the url.",
            num_articles: 3,
          }),
        });

        const result = await response.json();
        setNewsArticles(
          result.articles.map((article: any) => ({
            title: article.title,
            url: article.url,
          }))
        );
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <div className="w-full  px-8 py-6 bg-gradient-to-b from-earthtone-800 via-green-600 to-green-300">

      {/* 1. Carbon Capture Results */}
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-4">🌱 Carbon Capture Results</h2>
        <p className="mt-4 text-lg">
          Total Carbon Mass Captured: {data.total_concentration.toFixed(2)} kg
        </p>
        <p>Current Price of Carbon in California: ${carbonPriceCalifornia}</p>
        <p>
          Current value of Captured Carbon:{" $"}
          {((data.total_concentration * carbonPriceCalifornia) / 1000).toFixed(2)}
        </p>
        <h2 className="text-2xl font-bold mt-6">📊 Total Carbon Mass Captured Over Time</h2>
        <Line data={chartData} options={options} />
      </div>

      {/* 2. Model */}
      <div className="mt-8 p-4 border rounded-md bg-gray-100">
        <h2 className="text-xl font-bold">🖥️ Model Overview</h2>
        <p>CrunchFlow simulation results and parameters will be displayed here.</p>
      </div>

      {/* 3. Executive Summary */}
      <div className="mt-8 p-4 border rounded-md bg-gray-100">
        <h2 className="text-xl font-bold">📜 Executive Summary</h2>
        <p>{executiveSummary || "Loading summary..."}</p>
      </div>

      {/* 4. Latest News */}
      <div className="mt-8 p-4 border rounded-md bg-gray-100">
        <h2 className="text-xl font-bold">📰 Latest News on Carbon Capture</h2>
        {newsArticles.length > 0 ? (
          <ul>
            {newsArticles.map((article, index) => (
              <li key={index}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading news...</p>
        )}
      </div>

    </div>
  );
};

export default ResultsView;
