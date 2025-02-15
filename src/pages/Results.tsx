
import ResultsView from "@/components/ResultsView";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageSquare, ArrowLeft } from "lucide-react";

const Results = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-earthtone-50 bg-[url('/globe-pattern.jpg')] bg-cover bg-fixed">
      <div className="min-h-screen bg-white/95 backdrop-blur-sm">
        <main className="container mx-auto py-8 px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8 text-earthtone-600 hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculator
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <ResultsView />
            </div>
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-4 text-earthtone-700">
                    <MessageSquare className="h-5 w-5" />
                    <h2 className="font-semibold">Carbon Buddy</h2>
                  </div>
                  <div className="bg-earthtone-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-earthtone-600">
                      Hi! I'm your Carbon Buddy. Need help understanding your results
                      or looking for ways to improve your carbon capture potential?
                    </p>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    Chat with Carbon Buddy
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Results;
