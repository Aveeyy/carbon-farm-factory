
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LocationInput from "@/components/LocationInput";
import FeedstockInput from "@/components/FeedstockInput";
import AreaInput from "@/components/AreaInput";
import TimeWindowInput from "@/components/TimeWindowInput";

const Index = () => {
  const navigate = useNavigate();

  const handleCalculate = () => {
    navigate("/loading");
  };

  return (
    <div className="min-h-screen bg-earthtone-50 bg-[url('/farm-landscape.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen bg-white/90 backdrop-blur-sm">
        <main className="container mx-auto py-8 px-4 space-y-8">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl font-bold text-earthtone-700">
              Carbon Capture Calculator
            </h1>
            <p className="text-lg text-earthtone-600 max-w-2xl mx-auto">
              Estimate your farm's carbon capture potential and explore financial
              opportunities in the growing carbon credit market.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LocationInput />
              <FeedstoodInput />
              <AreaInput />
              <TimeWindowInput />
            </div>
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleCalculate}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
              >
                Calculate Potential
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
