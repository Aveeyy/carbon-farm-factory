import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Wind, Leaf, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import React from 'react';
import SpinningGlobe from '../components/SpinningGlobe';
import '../components/ui/styles.css';
import grassImage from '../assets/grass.jpg';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Background with gradient and image */}
      <div className="absolute inset-0">
        <div className="h-1/3 bg-gradient-to-b from-green-50 to-green-100" />
        <div className="h-1/2 relative">
          <img 
            src={grassImage}
            alt="Agricultural field rows" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-green-100/80 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-8xl font-bold flex items-center">
            <span className="text-green-600">eco</span>
            <span className="text-earthtone-600 ml-4">field</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-green-800">Home</a>
            <a href="#" className="text-gray-600 hover:text-green-800">Field</a>
            <a href="#" className="text-gray-600 hover:text-green-800">Store</a>
            <a href="#" className="text-gray-600 hover:text-green-800">Pelos</a>
            <a href="#" className="text-gray-600 hover:text-green-800">Learn More</a>
            <a href="#" className="text-gray-600 hover:text-green-800">About</a>
            <a href="#" className="text-gray-600 hover:text-green-800">Company</a>
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <div className="relative z-10 min-h-[calc(100vh-80px)] flex">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-center">
            {/* Left Content */}
            <motion.div 
              className={`space-y-8 transform transition-all duration-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="space-y-4">
                <motion.h1 
                  className="text-7xl md:text-8xl font-bold text-gray-800 font-serif"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Empowering Farmers
                </motion.h1>
                <motion.div 
                  className="text-5xl md:text-3xl font-bold text-gray-800 font-sans mt-4"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="italic">Sustainability &</span>
                  <span className="italic">Carbon Capture Hub</span>
                </motion.div>
              </div>

              <motion.p 
                className="text-2xl text-white"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Farmers, Calculate Your Carbon Capture and Unlock Payments for Sustainability.
              </motion.p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate("/calculator")}
                  size="lg"
                  className="bg-earthtone-600 hover:bg-green-700 text-white px-8 py-6 text-xl rounded-lg flex items-center gap-2"
                >
                  Ready to Start
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Content - Globe */}
            <div className="relative">
              {/* Decorative Elements */}
              <motion.div 
                className="absolute -top-20 -right-20 w-40 h-40 text-green-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Leaf className="w-full h-full opacity-20" />
              </motion.div>
              
              {/* Globe Component */}
              <div className="relative w-full aspect-square">
                <SpinningGlobe />
              </div>

              {/* Bottom Decorative Elements */}
              <motion.div 
                className="absolute -bottom-10 -left-10 w-32 h-32"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <Sprout className="w-full h-full text-green-500 opacity-20" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative z-10 bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              className="text-center"
              whileHover={{ y: -10 }}
            >
              <Leaf className="h-16 w-16 mx-auto text-green-500" />
              <h3 className="mt-4 text-xl font-semibold">Carbon Capture Estimates</h3>
              <p className="mt-2 text-gray-600">Accurately calculate how much carbon your land can capture.</p>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ y: -10 }}
            >
              <Wind className="h-16 w-16 mx-auto text-blue-500" />
              <h3 className="mt-4 text-xl font-semibold">Sustainability Insights</h3>
              <p className="mt-2 text-gray-600">Get actionable insights to improve your sustainability practices.</p>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ y: -10 }}
            >
              <Sprout className="h-16 w-16 mx-auto text-green-600" />
              <h3 className="mt-4 text-xl font-semibold">Track Your Progress</h3>
              <p className="mt-2 text-gray-600">Monitor your environmental impact over time.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;