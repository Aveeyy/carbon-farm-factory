
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const feedstockOptions = [
  { value: "crop_residue", label: "Crop Residue" },
  { value: "manure", label: "Manure" },
  { value: "green_waste", label: "Green Waste" },
  { value: "wood_waste", label: "Wood Waste" },
];

const FeedstockInput = () => {
  const [feedstock, setFeedstock] = useState("");

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <Label htmlFor="feedstock" className="text-sm font-medium">
            Feedstock Material
          </Label>
          <Select value={feedstock} onValueChange={setFeedstock}>
            <SelectTrigger id="feedstock" className="bg-white border-earthtone-200">
              <SelectValue placeholder="Select feedstock type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {feedstockOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="cursor-pointer hover:bg-earthtone-50"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedstockInput;
