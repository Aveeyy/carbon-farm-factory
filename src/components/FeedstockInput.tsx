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
import { Sprout, Factory, Leaf, Trees } from "lucide-react";

interface FeedstockInputProps {
  value: string;
  onChange: (value: string) => void;
}

const feedstockOptions = [
  { value: "basalt", label: "Basalt", icon: Sprout },
  { value: "larnite", label: "Larnite", icon: Factory },
  { value: "wollastonite", label: "Wollastonite", icon: Leaf },
];

const FeedstockInput = ({ value, onChange }: FeedstockInputProps) => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <Label htmlFor="feedstock" className="text-sm font-medium">
            Feedstock Material
          </Label>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger
              id="feedstock"
              className="bg-white border-earthtone-200 hover:border-primary/80 transition-colors"
            >
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
