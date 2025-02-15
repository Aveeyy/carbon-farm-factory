
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Wind, Sun, Leaf } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-earthtone-50 to-earthtone-100 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <Wind className="absolute top-[20%] left-[10%] w-16 h-16 text-earthtone-300 opacity-20 animate-spin-slow" />
        <Sun className="absolute top-[30%] right-[15%] w-20 h-20 text-earthtone-300 opacity-20" />
        <Leaf className="absolute bottom-[25%] left-[20%] w-16 h-16 text-earthtone-300 opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className={`text-center space-y-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-6xl md:text-7xl font-bold text-earthtone-700 mb-6">
            Welcome to
            <span className="block text-primary mt-2">EcoField</span>
          </h1>
          
          {/* Globe Placeholder - Replace with actual globe component */}
          <div className="relative w-64 h-64 mx-auto my-12">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary animate-pulse" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-earthtone-200 to-primary animate-spin-slow" />
            <div className="absolute inset-4 rounded-full bg-white/90 backdrop-blur-sm" />
          </div>

          <p className="text-xl text-earthtone-600 max-w-2xl mx-auto mb-8">
            Join us in measuring and maximizing your farm's contribution to global sustainability
          </p>

          <Button
            onClick={() => navigate("/calculator")}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-xl rounded-full transform transition-all hover:scale-105"
          >
            Start Your Sustainability Journey
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/farm-pattern.svg')] opacity-5 pointer-events-none" />
    </div>
  );
};

export default Welcome;
