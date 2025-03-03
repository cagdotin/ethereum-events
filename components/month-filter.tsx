"use client";

import { Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";

const MONTHS = [
  { name: "January", value: 0 },
  { name: "February", value: 1 },
  { name: "March", value: 2 },
  { name: "April", value: 3 },
  { name: "May", value: 4 },
  { name: "June", value: 5 },
  { name: "July", value: 6 },
  { name: "August", value: 7 },
  { name: "September", value: 8 },
  { name: "October", value: 9 },
  { name: "November", value: 10 },
  { name: "December", value: 11 },
];

interface MonthFilterProps {
  selected: number[];
  setSelected: (months: number[]) => void;
}

export function MonthFilter({ selected, setSelected }: MonthFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="xl" className="bg-background border-r">
          <Calendar /> When?
          {selected.length > 0 && (
            <Badge
              variant="secondary"
              className="rounded-sm px-1 font-normal lg:hidden ml-4"
            >
              {selected.length}
            </Badge>
          )}
          <div className="hidden space-x-1 lg:flex">
            {selected.length > 2 ? (
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {selected.length} selected
              </Badge>
            ) : (
              MONTHS.filter((month) => selected.includes(month.value)).map(
                (month) => (
                  <Badge
                    variant="secondary"
                    key={month.value}
                    className="rounded-sm px-1 font-normal"
                  >
                    {month.name}
                  </Badge>
                )
              )
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" alignOffset={-1}>
        <div className="grid grid-cols-3 gap-2">
          {MONTHS.map((month) => (
            <Button
              size={"sm"}
              variant={selected.includes(month.value) ? "outline" : "ghost"}
              key={month.value}
              className="text-xs"
              onClick={() => {
                if (selected.includes(month.value)) {
                  setSelected(selected.filter((m) => m !== month.value));
                } else {
                  setSelected([...selected, month.value]);
                }
              }}
            >
              {month.name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
