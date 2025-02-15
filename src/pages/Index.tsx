
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import LocationInput from "@/components/LocationInput";
import AreaInput from "@/components/AreaInput";
import FeedstockInput from "@/components/FeedstockInput";
import TimeWindowInput from "@/components/TimeWindowInput";

const Index = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate("/loading");
  };

  return (
    <div className="min-h-screen bg-[#2a6212] text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Carbon Capture Calculator</h1>
            <p className="text-lg text-gray-200">
              Enter your farm's details to calculate its carbon capture potential
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LocationInput />
              <AreaInput />
              <FeedstockInput />
              <TimeWindowInput />
            </div>

            <div className="flex justify-center mt-8">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? "Calculating..." : "Calculate Carbon Capture"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
