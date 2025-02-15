import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapIcon } from "lucide-react";

interface AreaInputProps {
  value: string;
  onChange: (value: string) => void;
  unit: string;
  onUnitChange: (unit: string) => void;
}

const convertAcresToMeters = (acres: number) => acres * 4046.86;
const convertHectaresToMeters = (hectares: number) => hectares * 10000;
const convertToSquareMeters = (value: string, unit: string) => {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return 0;

  switch (unit) {
    case "acres":
      return convertAcresToMeters(numericValue);
    case "hectares":
      return convertHectaresToMeters(numericValue);
    case "m2":
      return numericValue;
    default:
      return 0;
  }
};

const AreaInput = ({ value, onChange, unit, onUnitChange }: AreaInputProps) => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <Label
            htmlFor="area"
            className="text-sm font-medium flex items-center gap-2"
          >
            <MapIcon className="w-4 h-4 text-primary/60" />
            Farm Area
          </Label>
          <div className="flex space-x-2">
            <Input
              id="area"
              type="number"
              placeholder="Enter size"
              value={value}
              onChange={(e) =>
                onChange(convertToSquareMeters(e.target.value, unit).toString())
              }
              className="bg-white border-earthtone-200 hover:border-primary/80 transition-colors"
            />
            <Select value={unit} onValueChange={onUnitChange}>
              <SelectTrigger className="w-[120px] bg-white border-earthtone-200 hover:border-primary/80 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acres">Acres</SelectItem>
                <SelectItem value="hectares">Hectares</SelectItem>
                <SelectItem value="m2">Square Meters</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AreaInput;
