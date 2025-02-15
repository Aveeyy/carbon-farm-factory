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
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top 1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150vh] h-[150vh] opacity-20"
          animate={{ 
            rotate: 360,
          }}
          transition={{
            duration: 200,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            background: `radial-gradient(circle at center, 
              transparent 0%,
              transparent 40%,
              rgba(74, 93, 79, 0.1) 40.5%,
              rgba(74, 93, 79, 0.1) 41%,
              transparent 41.5%,
              transparent 43%,
              rgba(74, 93, 79, 0.1) 43.5%,
              rgba(74, 93, 79, 0.1) 44%,
              transparent 44.5%,
              transparent 46%,
              rgba(74, 93, 79, 0.1) 46.5%,
              rgba(74, 93, 79, 0.1) 47%,
              transparent 47.5%
            )`
          }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
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
              delay: i * 1.5,
              ease: "linear"
            }}
            className="absolute"
          >
            {i % 2 === 0 ? 
              <Leaf className={`w-${6 + i} h-${6 + i} text-primary/20`} /> :
              <Sprout className={`w-${6 + i} h-${6 + i} text-primary/20`} />
            }
          </motion.div>
        ))}

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

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className={`text-center space-y-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <motion.div 
            className="relative py-8 px-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 backdrop-blur-sm rounded-xl transform -skew-y-2" />
            <motion.h1 
              className="text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 relative"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Welcome to
              <motion.span 
                className="block text-primary mt-2 text-shadow-lg"
                animate={{ 
                  backgroundPosition: ["0% 0%", "100% 100%"],
                  color: ["#4A5D4F", "#8FA498", "#4A5D4F"]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                EcoField
              </motion.span>
            </motion.h1>
          </motion.div>
          
          <div className="relative w-80 h-80 mx-auto my-12">
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
              className="absolute inset-2 rounded-full bg-gradient-to-br from-earthtone-200 to-primary/80"
              style={{
                background: `radial-gradient(circle at center, 
                  transparent 30%,
                  rgba(74, 93, 79, 0.3) 31%,
                  rgba(74, 93, 79, 0.2) 34%,
                  transparent 35%,
                  rgba(74, 93, 79, 0.1) 36%,
                  rgba(74, 93, 79, 0.2) 39%,
                  transparent 40%
                )`
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 to-transparent"
              animate={{ 
                rotate: -360,
                scale: [1, 1.05, 1]
              }}
              transition={{
                rotate: {
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
            <div className="absolute inset-6 rounded-full bg-[#222222]/80 backdrop-blur-sm" />
          </div>

          <motion.p 
            className="text-2xl md:text-3xl text-earthtone-300 max-w-3xl mx-auto mb-12"
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
              className="bg-primary hover:bg-primary/90 text-white px-10 py-8 text-2xl rounded-full transform transition-all hover:shadow-xl"
            >
              Start Your Sustainability Journey
              <ArrowRight className="ml-3 h-8 w-8" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
