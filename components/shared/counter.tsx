"use client"

import { useEffect, useState } from "react";

interface CounterProps {
  from?: number;
  to: number;
  duration?: number; // in seconds
}

export function Counter({ from = 0, to, duration = 2 }: CounterProps) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (from === to) return;
    const start = from;
    const end = to;
    const range = end - start;
    const minTimer = 50;
    const steps = Math.ceil((duration * 1000) / minTimer);
    let currentStep = 0;
    const increment = range / steps;
    const timer = setInterval(() => {
      currentStep++;
      setValue((prev) => {
        const next = prev + increment;
        if ((range > 0 && next >= end) || (range < 0 && next <= end) || currentStep >= steps) {
          clearInterval(timer);
          return end;
        }
        return next;
      });
    }, minTimer);
    return () => clearInterval(timer);
  }, [from, to, duration]);

  return <span>{Math.round(value)}</span>;
} 