import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Wind, Leaf, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import React from 'react';
import SpinningGlobe from '../components/SpinningGlobe';
import '../components/ui/styles.css';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to EcoField</h1>
      <SpinningGlobe />
      {/* Other content */}
    </div>
  );
};

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-earthtone-50 to-earthtone-400 overflow-hidden relative">
      {/* Main content for Welcome page */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className={`text-center space-y-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <motion.h1 
            className="text-8xl md:text-7xl font-bold text-black mb-6"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Welcome to
            <motion.span 
              className="block text-black mt-2"
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"],
                color: ["#4A5D4F", "#8FA498", "#4A5D4F"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              EcoField
            </motion.span>
          </motion.h1>

          {/* Spinning Globe */}
          <SpinningGlobe />

          <motion.p 
            className="text-xl text-earthtone-900 max-w-2xl mx-auto mb-8"
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

      {/* Features Section */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center">
          <Leaf className="h-16 w-16 mx-auto text-green-500" />
          <h3 className="mt-4 text-xl font-semibold">Carbon Capture Estimates</h3>
          <p className="mt-2 text-gray-600">Accurately calculate how much carbon your land can capture.</p>
        </div>
        <div className="text-center">
          <Wind className="h-16 w-16 mx-auto text-blue-500" />
          <h3 className="mt-4 text-xl font-semibold">Sustainability Insights</h3>
          <p className="mt-2 text-gray-600">Get actionable insights to improve your sustainability practices.</p>
        </div>
        <div className="text-center">
          <Sprout className="h-16 w-16 mx-auto text-green-600" />
          <h3 className="mt-4 text-xl font-semibold">Track Your Progress</h3>
          <p className="mt-2 text-gray-600">Monitor your environmental impact over time and see your progress grow.</p>
        </div>
      </section>

      <div className="moving-object">
        <Leaf className="h-16 w-16 text-green-500" />
      </div>

      {/* Footer */}
      <footer className="mt-16 py-6 bg-gray-100 text-center">
        <p className="text-sm text-gray-500">&copy; 2025 EcoField. All rights reserved.</p>
      </footer>
    </div>
  );
};

export { HomePage, Welcome };
export default Welcome;