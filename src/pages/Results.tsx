import { useLocation, useNavigate } from "react-router-dom";
import ResultsView from "@/components/ResultsView";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { inference } = location.state || {};

  if (!inference) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4">
          No inference data available. Please run a calculation first.
        </p>
        <Button onClick={() => navigate("/")}>Back to Calculator</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f8f1] relative overflow-hidden">
      {/* [Your animated background and other UI elements] */}
      <div className="min-h-screen bg-[#f3f8f1]/95 backdrop-blur-sm">
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
              {/* Pass the API response to the ResultsView */}
              <ResultsView data={inference} />
            </motion.div>
            <motion.div
              className="lg:col-span-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* [Your Carbon Buddy Card content] */}
              {/* ... */}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Results;
