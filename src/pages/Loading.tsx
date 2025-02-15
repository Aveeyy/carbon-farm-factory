
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FunFacts from "@/components/FunFacts";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate calculation time
    const timer = setTimeout(() => {
      navigate("/results");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-earthtone-50 bg-[url('/nature-pattern.jpg')] bg-cover bg-fixed">
      <div className="min-h-screen bg-white/95 backdrop-blur-sm flex items-center justify-center">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="space-y-8 animate-fade-in">
            <FunFacts />
            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
