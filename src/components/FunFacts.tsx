
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const facts = [
  "Converting to sustainable farming practices can reduce carbon emissions by up to 170%!",
  "Regenerative agriculture could offset all current global CO2 emissions!",
  "Cover crops can sequester up to 3 tons of CO2 per acre annually.",
  "Soil organic matter has decreased by 50% in the last century due to intensive farming.",
  "Sustainable farming practices can increase crop yields by 20% or more!",
  "One acre of regenerative farmland can offset the annual emissions of 2 cars.",
];

const FunFacts = () => {
  const [currentFact, setCurrentFact] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextFact = () => {
    setDirection(1);
    setCurrentFact((prev) => (prev + 1) % facts.length);
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full bg-gradient-to-br from-earthtone-50 to-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-6">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Leaf className="h-12 w-12 text-primary" />
            </motion.div>

            <motion.p
              className="text-center text-2xl font-medium bg-gradient-to-r from-primary to-earthtone-400 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Did you know?
            </motion.p>

            <div className="relative h-24 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentFact}
                  initial={{ 
                    x: direction * 100,
                    opacity: 0
                  }}
                  animate={{ 
                    x: 0,
                    opacity: 1
                  }}
                  exit={{ 
                    x: direction * -100,
                    opacity: 0
                  }}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="text-center text-xl text-earthtone-600 absolute w-full"
                >
                  {facts[currentFact]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={nextFact}
                variant="outline"
                className="bg-white/50 backdrop-blur-sm hover:bg-primary hover:text-white transition-all duration-300 text-lg px-6 py-4 rounded-full group"
              >
                <span className="mr-2">Next Fun Fact</span>
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  🌱
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FunFacts;
