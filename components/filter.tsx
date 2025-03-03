import { MapPin, X } from "lucide-react";
import { FacetedFilter } from "./facated-filter";
import { CONTINENTS } from "@/lib/consts";
import { Button } from "./ui/button";
import { MonthFilter } from "./month-filter";

interface FilterProps {
  continents: string[];
  setContinents: (continents: string[]) => void;
  months: number[];
  setMonths: (months: number[]) => void;
  canReset: boolean;
  handleReset: () => void;
}

export function Filter({
  continents,
  setContinents,
  months,
  setMonths,
  canReset,
  handleReset,
}: FilterProps) {
  return (
    <div className="border-t border-b bg-[#393939]">
      <div className="flex items-center overflow-x-auto pr-1">
        <FacetedFilter
          title="Where?"
          options={CONTINENTS}
          selected={continents}
          handleSelect={setContinents}
          icon={<MapPin />}
        />
        <MonthFilter selected={months} setSelected={setMonths} />

        {/* <Button variant="ghost" size="xl" className="bg-background border-r">
          <Hash className="size-3" /> What? <ChevronDown className="size-3" />
        </Button> */}
        {canReset && (
          <Button
            variant="ghost"
            size="xl"
            className="bg-background border-r"
            onClick={handleReset}
          >
            <X className="size-4" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
