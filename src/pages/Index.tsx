
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LocationInput from "@/components/LocationInput";
import FeedstockInput from "@/components/FeedstockInput";
import AreaInput from "@/components/AreaInput";
import TimeWindowInput from "@/components/TimeWindowInput";
import { motion } from "framer-motion";
import { Leaf, Wind, Trees, Sun } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleCalculate = () => {
    navigate("/loading");
  };

  return (
    <div className="min-h-screen bg-earthtone-50 bg-[url('/farm-landscape.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Leaf className="absolute top-[10%] left-[5%] w-16 h-16 text-primary/20 animate-spin-slow" />
        <Wind className="absolute top-[20%] right-[10%] w-20 h-20 text-primary/20" />
        <Trees className="absolute bottom-[15%] left-[8%] w-16 h-16 text-primary/20" />
        <Sun className="absolute bottom-[20%] right-[8%] w-16 h-16 text-primary/20" />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-white/95 via-white/90 to-white/95 backdrop-blur-sm">
        <main className="container mx-auto py-12 px-4 space-y-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-earthtone-700 tracking-tight">
              Estimate Your Carbon Impact
            </h1>
            <p className="text-lg md:text-xl text-earthtone-600 max-w-3xl mx-auto">
              Enter your farm's details to estimate carbon capture potential and explore financial
              compensation from carbon removal projects.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <LocationInput />
                <FeedstockInput />
                <AreaInput />
                <TimeWindowInput />
              </div>
              
              <div className="flex justify-center pt-4">
                <Button
                  size="lg"
                  onClick={handleCalculate}
                  className="bg-primary hover:bg-primary/90 text-white px-12 py-8 text-xl rounded-full transform transition-all hover:scale-105 hover:shadow-lg"
                >
                  Calculate Your Carbon Impact
                </Button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Index;
