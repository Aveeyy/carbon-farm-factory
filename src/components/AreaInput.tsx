
import { useState } from "react";
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

const AreaInput = () => {
  const [area, setArea] = useState("");
  const [unit, setUnit] = useState("acres");

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <Label htmlFor="area" className="text-sm font-medium">
            Farm Area
          </Label>
          <div className="flex space-x-2">
            <Input
              id="area"
              type="number"
              placeholder="Enter size"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="bg-white border-earthtone-200"
            />
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger className="w-[120px] bg-white border-earthtone-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acres">Acres</SelectItem>
                <SelectItem value="hectares">Hectares</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AreaInput;
