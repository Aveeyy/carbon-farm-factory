import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import ResultsView from "@/components/ResultsView";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import InferenceResponse from "@/types/InferenceResponse";

interface ResultsProps {
  inference: InferenceResponse | null;
  onReset: () => void;
  years: string;
}

const Results = ({ inference, onReset, years }: ResultsProps) => {
  const navigate = useNavigate();

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
      <div className="min-h-screen bg-[#f3f8f1]/95 backdrop-blur-sm">
        <main className="container mx-auto py-8 px-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              onClick={() => {
                onReset();
                navigate("/calculator");
              }}
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
              <ResultsView data={inference} years={parseInt(years)} />
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
                      Hi! I'm your Carbon Buddy. Need help understanding your
                      results or looking for ways to improve your carbon capture
                      potential?
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
