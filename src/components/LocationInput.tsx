
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

const LocationInput = () => {
  const [location, setLocation] = useState("");

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Label htmlFor="location" className="text-sm font-medium">
            Farm Location
          </Label>
          <div className="relative">
            <Input
              id="location"
              placeholder="Enter your farm's address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 bg-white border-earthtone-200 focus:border-primary"
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earthtone-400 w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationInput;
