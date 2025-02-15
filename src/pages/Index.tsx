
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LocationInput from "@/components/LocationInput";
import FeedstockInput from "@/components/FeedstockInput";
import AreaInput from "@/components/AreaInput";
import TimeWindowInput from "@/components/TimeWindowInput";
import { motion } from "framer-motion";
import { Leaf, Wind, Trees, Sun, Sprout } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleCalculate = () => {
    navigate("/loading");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-[url('/farm-landscape.jpg')] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(74, 93, 79, 0.2), rgba(74, 93, 79, 0.3)), url('/farm-landscape.jpg')`
        }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            transition: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          className="absolute top-[10%] left-[5%]"
        >
          <Leaf className="w-16 h-16 text-primary/20" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -20, 0],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-[20%] right-[10%]"
        >
          <Wind className="w-20 h-20 text-primary/20" />
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-[15%] left-[8%]"
        >
          <Trees className="w-16 h-16 text-primary/20" />
        </motion.div>
        <motion.div
          animate={{
            rotate: [0, 360],
            transition: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
          className="absolute bottom-[20%] right-[8%]"
        >
          <Sun className="w-16 h-16 text-primary/20" />
        </motion.div>
      </div>

      {/* Content Container with Glass Effect */}
      <div className="min-h-screen relative bg-gradient-to-b from-white/95 via-white/90 to-white/95 backdrop-blur-sm">
        <main className="container mx-auto py-12 px-4 space-y-12">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-earthtone-700 tracking-tight">
              Estimate Your 
              <span className="bg-gradient-to-r from-primary to-earthtone-400 bg-clip-text text-transparent">
                {" "}Carbon Impact
              </span>
            </h1>
            <p className="text-lg md:text-xl text-earthtone-600 max-w-3xl mx-auto leading-relaxed">
              Enter your farm's details to estimate carbon capture potential and explore financial
              compensation from carbon removal projects.
            </p>
          </motion.div>

          {/* Form Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-8 border border-white/20">
              {/* Input Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <LocationInput />
                <FeedstockInput />
                <AreaInput />
                <TimeWindowInput />
              </div>
              
              {/* CTA Button */}
              <motion.div 
                className="flex justify-center pt-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  onClick={handleCalculate}
                  className="relative bg-primary hover:bg-primary/90 text-white px-12 py-8 text-xl rounded-full transform transition-all hover:shadow-lg group overflow-hidden"
                >
                  <span className="relative z-10 inline-flex items-center gap-3">
                    Calculate Your Carbon Impact
                    <Sprout className="w-6 h-6 transition-transform group-hover:rotate-12" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
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
