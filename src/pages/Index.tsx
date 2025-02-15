
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LocationInput from "@/components/LocationInput";
import FeedstockInput from "@/components/FeedstockInput";
import AreaInput from "@/components/AreaInput";
import TimeWindowInput from "@/components/TimeWindowInput";
import ResultsView from "@/components/ResultsView";
import FunFacts from "@/components/FunFacts";

const Index = () => {
  return (
    <div className="min-h-screen bg-earthtone-50">
      <main className="container mx-auto py-8 px-4 space-y-8">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold text-earthtone-700">
            Carbon Capture Calculator
          </h1>
          <p className="text-lg text-earthtone-600 max-w-2xl mx-auto">
            Estimate your farm's carbon capture potential and explore financial
            opportunities in the growing carbon credit market.
          </p>
        </div>

        <Tabs defaultValue="calculator" className="w-full animate-fade-in">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="funFacts">Fun Facts</TabsTrigger>
          </TabsList>
          <TabsContent value="calculator" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LocationInput />
              <FeedstockInput />
              <AreaInput />
              <TimeWindowInput />
            </div>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Calculate Potential
              </Button>
            </div>
            <ResultsView />
          </TabsContent>
          <TabsContent value="funFacts" className="mt-6">
            <FunFacts />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
