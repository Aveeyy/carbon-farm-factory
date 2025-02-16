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
  const [newsArticles, setNewsArticles] = useState<
    {
      title: string;
      url: string;
      description: string;
      date: string;
    }[]
  >([]);

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
      // Format the data as a proper JSON structure
      const inputData = {
        id: "carbon-capture-data",
        object: "file",
        created_at: Math.floor(Date.now() / 1000),
        filename: "carbon_capture_analysis.jsonl",
        purpose: "analysis",
        data: {
          input_file: {
            type: "crunchflow_input",
            content: "CrunchFlow input data",
          },
          output_file: {
            type: "crunchflow_output",
            content: "CrunchFlow output results",
            results: {
              total_concentration: data.total_concentration,
              concentration_timeline: data.concentration_ts,
            },
          },
        },
      };

      const prompt = `
        You are a farmer and geography expert who has the knowledge to explain complicated data in simple terms. You will be given information about the input and output files as well as the results. You will provide a clear explanation in an executive summary.
        
        Based on this data:
        ${JSON.stringify(inputData, null, 2)}

        Concrete task: Provide a clear explanation focusing on:
        1. What do the output and results from the result file mean? Explain what was calculated and how these results fit into the context of the input file.
        2. Interpret the data and help to understand the context of the results.

        Write in plain text without any HTML, XML, or special formatting. Keep it clear and straightforward for farmers to understand. Use three paragraphs with no more than 3 sentences per paragraph. Write in plain text without any HTML, XML, or special formatting.
      `;

      try {
        const response = await fetch(
          "https://api.mistral.ai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${MISTRAL_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "ministral-8b-latest",
              messages: [{ role: "user", content: prompt }],
              temperature: 0.7,
            }),
          }
        );

        const result = await response.json();
        setExecutiveSummary(
          result.choices[0]?.message?.content || "Error generating summary."
        );
      } catch (error) {
        console.error("Error fetching executive summary:", error);
        setExecutiveSummary("Failed to generate summary.");
      }
    };
    const fetchLatestNews = async () => {
      try {
        const response = await fetch(
          "https://api.perplexity.ai/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "sonar-pro",
              messages: [
                {
                  role: "system",
                  content:
                    "You are a helpful assistant that provides news articles about carbon capture. Return only JSON in the format {articles: [{title: string, url: string, description: string, date: string}]}. For papers, do not include author names in the title or description. Make sure that the newest one is first.",
                },
                {
                  role: "user",
                  content:
                    "Find three recent articles about carbon removal and rock weathering, especially in farming. Look at news articles as well as papers. Especially interesting are new innovations in that area as well as government fundings and laws. For each, provide: 1) a single-sentence description that captures the key finding or announcement, 2) the publication date in 'MMM DD, YYYY' format. Return in JSON format. For papers, remove author names from both title and description. For papers, do not include author names in the title or description. Make sure that the newest one is first.",
                },
              ],
            }),
          }
        );

        const result = await response.json();
        const articles = JSON.parse(result.choices[0].message.content).articles;
        setNewsArticles(articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchExecutiveSummary();
    fetchLatestNews();
  }, [data.concentration_ts, data.total_concentration]);

  return (
    <div className="w-full px-8 py-6 bg-earthtone-500">
      {/* Overview Card Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg font-semibold">Total Carbon Mass Captured</p>
          <p className="text-3xl font-bold text-green-900">
            {data.total_concentration.toFixed(2)} kg
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg font-semibold">
            Current Price of Carbon in California
          </p>
          <p className="text-3xl font-bold text-green-900">
            ${carbonPriceCalifornia.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg font-semibold">
            Current Value of Captured Carbon
          </p>
          <p className="text-3xl font-bold text-green-900">
            $
            {(
              (data.total_concentration * carbonPriceCalifornia) /
              1000
            ).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Chart Title */}
      <h2 className="text-2xl font-bold mb-4 text-white">
        Total Carbon Mass Captured Over Time
      </h2>

      {/* Line Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Line data={chartData} options={options} />
      </div>

      {/* Executive Summary & Latest News in two columns */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-4 border rounded-md bg-gray-100">
          <h2 className="text-xl font-bold">📜 Executive Summary</h2>
          <p>{executiveSummary || "Loading summary..."}</p>
        </div>

        <div className="p-4 border rounded-md bg-gray-100">
          <h2 className="text-xl font-bold">
            📰 Latest News on Carbon Capture
          </h2>
          {newsArticles.length > 0 ? (
            <ul className="space-y-6 mt-4">
              {newsArticles.map((article, index) => (
                <li
                  key={index}
                  className="group relative p-4 rounded-lg hover:bg-white transition-colors duration-200"
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h3 className="font-semibold text-blue-600 group-hover:text-blue-800">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">{article.date}</p>
                    <p className="text-gray-600 mt-2 text-sm">
                      {article.description}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading news...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
