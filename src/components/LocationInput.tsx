import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
}

const LocationInput = ({ value, onChange }: LocationInputProps) => {
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const sessionToken = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !autocompleteService.current) {
      const loader = new google.maps.places.AutocompleteService();
      autocompleteService.current = loader;
      sessionToken.current = new google.maps.places.AutocompleteSessionToken();
    }
  }, []);

  const handleInputChange = async (input: string) => {
    onChange(input);
    
    if (!input || !autocompleteService.current) {
      setPredictions([]);
      return;
    }

    try {
      const request = {
        input,
        sessionToken: sessionToken.current,
        types: ['address'],  // Keep this to ensure we only get addresses
      };

      const response = await autocompleteService.current.getPlacePredictions(request);
      setPredictions(response.predictions);
    } catch (error) {
      console.error('Error fetching place predictions:', error);
      setPredictions([]);
    }
  };

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
              value={value}
              onChange={(e) => handleInputChange(e.target.value)}
              className="pl-10 bg-white border-earthtone-200 focus:border-primary"
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earthtone-400 w-4 h-4" />
            {predictions.length > 0 && (
              <ul className="fixed left-0 w-[90vw] md:w-[600px] mt-2 bg-white rounded-lg border shadow-xl max-h-[300px] overflow-auto z-[9999] ml-4">
                {predictions.map((prediction) => (
                  <li
                    key={prediction.place_id}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center text-base"
                    onClick={() => {
                      onChange(prediction.description);
                      setPredictions([]);
                      sessionToken.current = new google.maps.places.AutocompleteSessionToken();
                    }}
                  >
                    <MapPin className="mr-2 h-4 w-4 text-earthtone-400 flex-shrink-0" />
                    <span className="line-clamp-2">{prediction.description}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationInput;
