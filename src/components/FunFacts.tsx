
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

const facts = [
  "One acre of hemp can absorb as much CO₂ as a young forest!",
  "Soil can store three times as much carbon as the atmosphere.",
  "Regenerative farming could offset 40% of global CO₂ emissions.",
  "A single tree can absorb up to 48 pounds of CO₂ per year.",
];

const FunFacts = () => {
  const [currentFact, setCurrentFact] = useState(0);

  const nextFact = () => {
    setCurrentFact((prev) => (prev + 1) % facts.length);
  };

  return (
    <Card className="w-full bg-gradient-to-br from-earthtone-50 to-white">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <Leaf className="h-8 w-8 text-primary" />
          <p className="text-center text-lg font-medium text-earthtone-700">
            Did you know?
          </p>
          <p className="text-center text-earthtone-600 animate-fade-in">
            {facts[currentFact]}
          </p>
          <Button
            onClick={nextFact}
            variant="outline"
            className="mt-4 hover:bg-primary hover:text-white transition-colors"
          >
            Next Fact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FunFacts;
