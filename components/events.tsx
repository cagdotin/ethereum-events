/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Filter } from "./filter";
import { events as events_raw } from "@/lib/events";
import { Calendar, ExternalLink, Globe, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { useRouter, useSearchParams } from "next/navigation";

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    // year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

const isPast = (date: string) => {
  return new Date(date) < new Date();
};

const isOngoing = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return new Date() >= startDate && new Date() <= endDate;
};

const isInMonths = (date: string, months: number[]) => {
  const month = new Date(date).getMonth();

  return months.some((m) => m == month);
};

export function Events() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const c = searchParams.get("c");
  const m = searchParams.get("m");

  const [continents, setContinents] = useState<string[]>([]);
  const [events, setEvents] = useState<typeof events_raw>(events_raw);
  const [months, setMonths] = useState<number[]>([]);

  useEffect(() => {
    if (c) setContinents(c.split(","));
    if (m) setMonths(m.split(",").map(Number));
  }, [c, m]);

  useEffect(() => {
    const updateRoute = () => {
      const params: { c?: string; m?: string } = {};
      if (continents.length > 0) params.c = continents.join(",");
      if (months.length > 0) params.m = months.join(",");

      router.push(`/?${new URLSearchParams(params).toString()}`);
    };

    const filteredEvents = events_raw
      .filter((event) => {
        let show = true;

        if (isPast(event.endDate)) show = false;

        if (months.length > 0 && !isInMonths(event.startDate, months))
          show = false;

        if (
          continents.length > 0 &&
          !continents.includes(event.continent || "")
        )
          show = false;

        return show;
      })
      .sort((a, b) => {
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      });

    setEvents(filteredEvents);
    updateRoute();
  }, [continents, months, router]);

  // Filter events based on if there are any continents selected
  // Filter events based on if there are any continents selected
  const canReset = continents.length > 0 || months.length > 0;

  const reset = () => {
    setContinents([]);
    setMonths([]);
  };

  return (
    <div>
      <div className="w-full border border-b-0 flex flex-col ">
        <div className="flex h-full">
          <h1 className="text-5xl md:text-7xl font-semibold mx-4 my-6">
            ETHEREUM
            <br />
            EVENTS
            <br />
            2025
          </h1>
        </div>
        <div className="mt-auto">
          <Filter
            continents={continents}
            setContinents={setContinents}
            months={months}
            setMonths={setMonths}
            canReset={canReset}
            handleReset={reset}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l">
        {events.map((event, index) => (
          <div
            key={index}
            className="p-4 bg-background rounded-md flex flex-col justify-between border-r border-b"
          >
            <div>
              {/* <div className="mb-4 h-48">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div> */}
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{event.title}</h2>

                <div className="flex items-center gap-0">
                  {isOngoing(event.startDate, event.endDate) && (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-2 font-mono rounded-md h-6 mr-[-1px]"
                    >
                      ongoing
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                      </span>
                    </Badge>
                  )}
                  {/* <Button
                    variant="outline"
                    size="icon"
                    className="w-6 h-6 border-solid"
                  >
                    <Bookmark className="size-3" />
                  </Button> */}
                </div>
              </div>

              <div className="mt-2 mb-6">
                <p className="text-sm font-sans">{event.description}</p>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-1 font-mono text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="size-3" />
                  {event.location}, {event.country}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-3" />
                  {formatDate(event.startDate)} - {formatDate(event.endDate)}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                asChild
                // className=" rounded-full"
              >
                <Link
                  href={event.href}
                  target="_blank"
                  className="font-mono text-xs"
                >
                  <Globe className="size-3" />
                  website
                  <ExternalLink className="size-3 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
