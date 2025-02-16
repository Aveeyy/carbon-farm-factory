import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]); // Store chat history
  const [isChatting, setIsChatting] = useState(false); // State to track if user has started chatting

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { user: message }]);
      setMessage("");
      setIsChatting(true); // Mark that the user has started chatting

      // Example of a dummy bot response (replace with backend call)
      setChatHistory((prev) => [
        ...prev,
        { bot: "I’m here to help! How can I assist you further?" },
      ]);
    }
  };

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
    <div className="min-h-screen bg-[#f3f8f1] relative overflow-hidden flex flex-col">
      <div className="min-h-screen bg-[#f3f8f1]/95 backdrop-blur-sm flex-1">
        <main className="container mx-auto py-8 px-4 flex flex-col">
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
              className="mb-8 text-black-300 hover:text-primary"
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
              <Card className="h-400 w-15 bg-earthtone-500/50 border-primary/20 flex flex-col">
                <CardContent className="p-4 flex-1">
                  <div className="flex items-center space-x-2 mb-4 text-white-100">
                    <MessageSquare className="h-12 w-12" />
                    <h2 className="font-bold">Carbon Buddy</h2>
                  </div>
                  <div className="bg-earthtone-900/50 rounded-lg bg-gray-300 p-4 mb-4">
                    <p className="text-sm text-white-100">
                      Hi! I'm your Carbon Buddy. Need help understanding your
                      results or looking for ways to improve your carbon capture
                      potential?
                    </p>
                  </div>

                  {/* Chat History: Render only if user has started chatting */}
                  {isChatting && (
                    <div className="overflow-y-auto h-[50vh] mb-4 mt-12 p-2 bg-white rounded-lg">
                      {chatHistory.map((chat, index) => (
                        <div key={index} className="mb-2">
                          {chat.user && (
                            <div className="text-right text-white-200">
                              <p>{chat.user}</p>
                            </div>
                          )}
                          {chat.bot && (
                            <div className="text-left text-white-300">
                              <p>{chat.bot}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Chat Input: Always show placeholder initially */}
                  <div className="mt-8 flex items-center space-x-2 p-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 p-2 rounded-lg bg-white-700 text-black-300 placeholder-white-500"
                      placeholder={isChatting ? "Type your message here..." : "Start typing..."} // Changes based on chat state
                    />
                    <Button
                      className="text-white bg-primary hover:bg-primary/90"
                      onClick={handleSendMessage}
                    >
                      Send
                    </Button>
                  </div>
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
