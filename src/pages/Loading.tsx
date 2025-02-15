
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FunFacts from "@/components/FunFacts";
import { motion } from "framer-motion";
import { Leaf, Wind, Trees, Globe2 } from "lucide-react";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/results");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-earthtone-50 overflow-hidden relative">
      {/* Background Pattern with Gradient Overlay */}
      <div className="absolute inset-0 bg-[url('/nature-pattern.jpg')] bg-cover bg-fixed opacity-20" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-20 left-20"
        >
          <Globe2 className="w-32 h-32 text-primary/20" />
        </motion.div>

        {/* Floating Leaves */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
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
            className="absolute"
          >
            <Leaf className={`w-${8 + i * 2} h-${8 + i * 2} text-primary/20`} />
          </motion.div>
        ))}

        {/* Floating Wind */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: window.innerWidth + 100, y: Math.random() * window.innerHeight }}
            animate={{ 
              x: -100,
              y: Math.random() * window.innerHeight
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear"
            }}
            className="absolute"
          >
            <Wind className={`w-${12 + i * 4} h-${12 + i * 4} text-primary/15`} />
          </motion.div>
        ))}
      </div>

      {/* Content Container */}
      <div className="min-h-screen bg-gradient-to-b from-white/95 via-white/90 to-white/95 backdrop-blur-sm flex items-center justify-center relative">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="space-y-8">
            <FunFacts />
            <div className="flex justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: 360
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
