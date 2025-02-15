
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LocationInput from "@/components/LocationInput";
import FeedstockInput from "@/components/FeedstockInput";
import AreaInput from "@/components/AreaInput";
import TimeWindowInput from "@/components/TimeWindowInput";
import { motion } from "framer-motion";
import { Leaf, Wind, Trees, Sun, Sprout, Globe2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleCalculate = () => {
    navigate("/loading");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#222222]">
      <div 
        className="absolute inset-0 bg-[url('/lovable-uploads/f39be7fd-607b-4fac-a198-571094cd3212.png')] bg-cover bg-center opacity-10"
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative w-[500px] h-[500px] opacity-25"
        >
          <img 
            src="/lovable-uploads/b4ffb657-20e3-48ea-b31d-5e455ebf1b56.png" 
            alt="Geometric Globe"
            className="w-full h-full object-contain"
          />
          {/* Added Spinning Globe */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Globe2 className="w-64 h-64 text-primary/60" />
          </motion.div>
          {/* Added Glowing Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary/20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-[15%] left-[15%]"
        >
          <Leaf className="w-40 h-40 text-[#0EA5E9] opacity-50" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [-10, 10, -10],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[20%] right-[15%]"
        >
          <Wind className="w-48 h-48 text-[#8B5CF6] opacity-50" />
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[20%] left-[15%]"
        >
          <Trees className="w-40 h-40 text-[#D946EF] opacity-50" />
        </motion.div>

        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-[25%] right-[15%]"
        >
          <Sun className="w-40 h-40 text-[#F97316] opacity-50" />
        </motion.div>
      </div>

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
              <span className="bg-gradient-to-r from-primary via-earthtone-400 to-primary bg-clip-text text-transparent">
                Carbon Impact
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-earthtone-200 max-w-4xl mx-auto leading-relaxed font-medium">
              Enter your farm's details to estimate carbon capture potential and explore financial
              compensation from carbon removal projects.
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
                <LocationInput />
                <FeedstockInput />
                <AreaInput />
                <TimeWindowInput />
              </div>
              
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
