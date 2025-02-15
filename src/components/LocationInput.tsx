
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const LocationInput = () => {
  const [location, setLocation] = useState("");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    // Check if Google Maps API is loaded
    if (typeof google === "undefined") {
      console.error("Google Maps API not loaded");
      return;
    }

    // Initialize the map
    if (mapRef.current && !map) {
      setIsLoading(false);
      const initialMap = new google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 2,
        styles: [
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }]
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }]
          }
        ]
      });
      setMap(initialMap);

      // Initialize marker
      const newMarker = new google.maps.Marker({
        map: initialMap,
        draggable: true
      });
      setMarker(newMarker);

      // Initialize autocomplete
      const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("location") as HTMLInputElement,
        { types: ["address"] }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          initialMap.setCenter(place.geometry.location!);
          initialMap.setZoom(15);
          newMarker.setPosition(place.geometry.location!);
          setLocation(place.formatted_address || "");
        }
      });

      autocompleteRef.current = autocomplete;
    }
  }, [mapRef, map]);

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
          {isLoading ? (
            <Skeleton className="w-full h-[200px] rounded-lg" />
          ) : (
            <div ref={mapRef} className="w-full h-[200px] rounded-lg overflow-hidden shadow-md" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationInput;
