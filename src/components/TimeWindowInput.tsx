
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";

const TimeWindowInput = () => {
  const [years, setYears] = useState<string>("");

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow positive numbers
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setYears(value);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary/60" />
            Time Window (Years)
          </Label>
          <div className="relative">
            <Input
              type="text"
              value={years}
              onChange={handleYearChange}
              placeholder="Enter number of years"
              className="bg-white border-earthtone-200 focus:border-primary"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeWindowInput;
