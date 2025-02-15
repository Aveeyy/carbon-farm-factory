
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
import { Leaf, Tree, Factory, Grain } from "lucide-react";

const feedstockOptions = [
  { value: "crop_residue", label: "Crop Residue", icon: Grain },
  { value: "manure", label: "Manure", icon: Factory },
  { value: "green_waste", label: "Green Waste", icon: Leaf },
  { value: "wood_waste", label: "Wood Waste", icon: Tree },
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
            <SelectTrigger id="feedstock" className="bg-white border-earthtone-200 hover:border-primary/80 transition-colors">
              <SelectValue placeholder="Select feedstock type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {feedstockOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="cursor-pointer hover:bg-earthtone-50 flex items-center gap-2 py-2"
                    >
                      <Icon className="w-4 h-4 text-primary/60" />
                      {option.label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedstockInput;
