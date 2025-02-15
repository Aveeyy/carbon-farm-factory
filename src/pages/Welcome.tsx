
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Wind, Leaf, Sprout } from "lucide-react";
import { motion } from "framer-motion";

const Welcome = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#222222] overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Leaves */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -100,
              rotate: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              rotate: 360
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
            className="absolute"
          >
            <Leaf className={`w-${8 + i * 2} h-${8 + i * 2} text-primary/20`} />
          </motion.div>
        ))}

        {/* Animated Vines */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`vine-${i}`}
            className="absolute top-0 left-1/4"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ height: 0 }}
            animate={{ 
              height: ['0%', '100%', '90%', '100%'],
              pathLength: [0, 1]
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
              {[...Array(3)].map((_, j) => (
                <motion.div
                  key={`leaf-${i}-${j}`}
                  className="absolute"
                  style={{ top: `${j * 30}%`, left: '-10px' }}
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
                  <Sprout className="w-6 h-6 text-primary/40" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className={`text-center space-y-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-white mb-6"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Welcome to
            <motion.span 
              className="block text-primary mt-2"
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"],
                color: ["#4A5D4F", "#8FA498", "#4A5D4F"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              EcoField
            </motion.span>
          </motion.h1>
          
          {/* Animated Globe */}
          <div className="relative w-64 h-64 mx-auto my-12">
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: 360
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute inset-2 rounded-full bg-gradient-to-br from-earthtone-200 to-primary"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <div className="absolute inset-4 rounded-full bg-[#222222]/90 backdrop-blur-sm" />
          </div>

          <motion.p 
            className="text-xl text-earthtone-300 max-w-2xl mx-auto mb-8"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Join us in measuring and maximizing your farm's contribution to global sustainability
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate("/calculator")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-xl rounded-full transform transition-all hover:shadow-xl"
            >
              Start Your Sustainability Journey
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
