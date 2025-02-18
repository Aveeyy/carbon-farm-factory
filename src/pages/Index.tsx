import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sprout } from "lucide-react";
import { getInference, InferenceError } from "@/api/lib/inference";
import LocationInput from "@/components/LocationInput";
import FeedstockInput from "@/components/FeedstockInput";
import AreaInput from "@/components/AreaInput";
import TimeWindowInput from "@/components/TimeWindowInput";
import Loading from "./Loading";
import Results from "./Results";

const convertAcresToMeters = (acres: number) => acres * 4046.86;
const convertHectaresToMeters = (hectares: number) => hectares * 10000;
const convertToSquareMeters = (value: string, unit: string) => {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return 0;

  switch (unit) {
    case "acres":
      return convertAcresToMeters(numericValue);
    case "hectares":
      return convertHectaresToMeters(numericValue);
    case "m2":
      return numericValue;
    default:
      return 0;
  }
};

const Index = () => {
  const [address, setAddress] = useState("");
  const [feedstock, setFeedstock] = useState("");
  const [area, setArea] = useState("");
  const [unit, setUnit] = useState("acres");
  const [years, setYears] = useState("");
  const [applicationRate, setApplicationRate] = useState(0);
  const [clayPercentage, setClayPercentage] = useState(0);
  const [siltPercentage, setSiltPercentage] = useState(0);
  const [sandPercentage, setSandPercentage] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inference, setInference] = useState(null);
  const [inferenceRequest, setInferenceRequest] = useState(null);

  const handleCalculate = async () => {
    if (!address || !feedstock || !area || !years) {
      setErrorMsg(
        "Please fill out all fields to calculate your carbon impact."
      );
      return;
    }
    const updatedArea = convertToSquareMeters(area, unit);
    const request = {
      address,
      feedstock_type: feedstock,
      area: updatedArea,
      time_period: parseInt(years) || 0,
      application_rate: applicationRate,
      clay_pct: clayPercentage,
      silt_pct: siltPercentage,
      sand_pct: sandPercentage,
    };
    setInferenceRequest(request);

    setIsLoading(true);
    setErrorMsg(null);
    try {
      console.log(request);
      const response = await getInference(request);
      setInference(response);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    setInference(null);
    setErrorMsg(null);
    setAddress("");
    setFeedstock("");
    setArea("");
    setYears("");
    setApplicationRate(0);
    setClayPercentage(0);
    setSiltPercentage(0);
    setSandPercentage(0);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (inference) {
    return (
      <Results
        inference={inference}
        onReset={handleReset}
        years={years}
        inferenceRequest={inferenceRequest}
      />
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#a8d08d] via-[#3d5c3c] to-[#000000]]">
      <div className="min-h-screen relative backdrop-blur-sm">
        <main className="container mx-auto py-16 px-4 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-10"
          >
            <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tight leading-tight">
              Estimate Your{" "}
              <span className="bg-gradient-to-r from-primary via-earthtone-800 to-primary bg-clip-text text-transparent">
                Carbon Impact
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-earthtone-200 max-w-4xl mx-auto leading-relaxed font-medium">
              Enter your farm's details to estimate carbon capture potential and
              explore financial compensation from carbon removal projects.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-[#F2FCE2] backdrop-blur-md rounded-3xl shadow-2xl p-10 space-y-12 border border-white/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <LocationInput value={address} onChange={setAddress} />
                <FeedstockInput value={feedstock} onChange={setFeedstock} />
                <AreaInput
                  value={area}
                  onChange={setArea}
                  unit={unit}
                  onUnitChange={setUnit}
                />
                <TimeWindowInput value={years} onChange={setYears} />
                {/* Application Rate Slider */}
                <div className="flex flex-col">
                  <label className="text-lg font-medium">
                    Application Rate
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={applicationRate}
                    onChange={(e) => setApplicationRate(Number(e.target.value))}
                    className="mt-2"
                  />
                  <input
                    type="number"
                    value={applicationRate}
                    onChange={(e) => setApplicationRate(Number(e.target.value))}
                    className="mt-2 p-2 rounded border"
                    min="0"
                    max="100"
                  />
                </div>
                {/* Clay Percentage */}
                <div className="flex flex-col">
                  <label className="text-lg font-medium">
                    Clay Percentage (0 - 1)
                  </label>
                  <input
                    type="number"
                    value={clayPercentage}
                    onChange={(e) =>
                      setClayPercentage(
                        Math.min(1, Math.max(0, parseFloat(e.target.value)))
                      )
                    }
                    className="mt-2 p-2 rounded border"
                    step="0.01"
                    min="0"
                    max="1"
                  />
                </div>
                {/* Silt Percentage */}
                <div className="flex flex-col">
                  <label className="text-lg font-medium">
                    Silt Percentage (0 - 1)
                  </label>
                  <input
                    type="number"
                    value={siltPercentage}
                    onChange={(e) =>
                      setSiltPercentage(
                        Math.min(1, Math.max(0, parseFloat(e.target.value)))
                      )
                    }
                    className="mt-2 p-2 rounded border"
                    step="0.01"
                    min="0"
                    max="1"
                  />
                </div>
                {/* Sand Percentage */}
                <div className="flex flex-col">
                  <label className="text-lg font-medium">
                    Sand Percentage (0 - 1)
                  </label>
                  <input
                    type="number"
                    value={sandPercentage}
                    onChange={(e) =>
                      setSandPercentage(
                        Math.min(1, Math.max(0, parseFloat(e.target.value)))
                      )
                    }
                    className="mt-2 p-2 rounded border"
                    step="0.01"
                    min="0"
                    max="1"
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-red-600 text-center font-semibold">
                  {errorMsg}
                </p>
              )}

              <motion.div
                className="flex justify-center pt-8"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  onClick={handleCalculate}
                  className="relative bg-primary hover:bg-primary/90 text-white px-16 py-8 text-2xl rounded-full transform transition-all duration-300 hover:shadow-2xl group overflow-hidden"
                >
                  <span className="relative z-10 inline-flex items-center gap-4">
                    Calculate Your Carbon Impact
                    <Sprout className="w-8 h-8 transition-transform duration-300 group-hover:rotate-12" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Index;
