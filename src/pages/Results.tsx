
import ResultsView from "@/components/ResultsView";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageSquare, ArrowLeft, Leaf, Sprout } from "lucide-react";
import { motion } from "framer-motion";

const Results = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#b6d7a8] relative overflow-hidden">
      {/* Animated Vines */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical Growing Vines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`vine-${i}`}
            className="absolute top-0"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ height: 0 }}
            animate={{ 
              height: ['0%', '100%', '90%', '100%']
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 1.5
            }}
          >
            <div className="w-1 bg-gradient-to-b from-primary/10 to-primary/30 rounded-full" 
                 style={{ height: '100%' }}>
              {[...Array(4)].map((_, j) => (
                <motion.div
                  key={`leaf-${i}-${j}`}
                  className="absolute"
                  style={{ top: `${j * 25}%`, left: '-10px' }}
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: j * 0.5
                  }}
                >
                  <Leaf className="w-6 h-6 text-primary/40" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Floating Leaves */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`floating-leaf-${i}`}
            initial={{ 
              x: -100, 
              y: Math.random() * window.innerHeight,
              rotate: 0
            }}
            animate={{
              x: window.innerWidth + 100,
              y: Math.random() * window.innerHeight,
              rotate: 360
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          >
            <Sprout className={`w-${6 + i * 2} h-${6 + i * 2} text-primary/20`} />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-screen bg-[#b6d7a8]/95 backdrop-blur-sm">
        <main className="container mx-auto py-8 px-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-8 text-earthtone-300 hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Calculator
            </Button>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <motion.div 
              className="lg:col-span-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ResultsView />
            </motion.div>
            <motion.div 
              className="lg:col-span-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full bg-earthtone-900/50 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-4 text-earthtone-300">
                    <MessageSquare className="h-5 w-5" />
                    <h2 className="font-semibold">Carbon Buddy</h2>
                  </div>
                  <div className="bg-earthtone-800/50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-earthtone-300">
                      Hi! I'm your Carbon Buddy. Need help understanding your results
                      or looking for ways to improve your carbon capture potential?
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Chat with Carbon Buddy
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Results;
