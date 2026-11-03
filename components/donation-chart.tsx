"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from "recharts";
import React from "react";
import { useDonations } from '@/lib/hooks/useDonations';

type DonationChartProps = {
  type: "bar" | "area" | "pie";
  title?: string;
  description?: string;
  xKey?: string;
  yKey?: string;
  color?: string;
  pieNameKey?: string;
  pieValueKey?: string;
  pieColors?: string[];
};

const DEFAULT_PIE_COLORS = [
  "#6366f1", // Indigo
  "#f59e42", // Orange
  "#10b981", // Green
  "#ef4444", // Red
  "#3b82f6", // Blue
  "#a21caf", // Purple
  "#fbbf24", // Yellow
  "#0ea5e9", // Sky
];

export function DonationChart({
  type,
  title,
  description,
  xKey = "name",
  yKey = "amount",
  color = "hsl(var(--primary))",
  pieNameKey = "name",
  pieValueKey = "value",
  pieColors = DEFAULT_PIE_COLORS,
}: DonationChartProps) {
  const { donations, isLoading } = useDonations();
  return (
    <Card>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle className="text-base">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={type === "pie" ? "h-72 flex items-center justify-center" : "h-[300px]"}>
        {isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : !donations || donations.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">No data available</div>
        ) : type === "bar" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={donations}>
              <XAxis dataKey={xKey} fontSize={12} axisLine={false} tickLine={false} />
              <YAxis fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip formatter={(value: number) => [`Rs. ${Number(value).toLocaleString()}`, "Amount"]} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </BarChart>
          </ResponsiveContainer>
        ) : type === "area" ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={donations}>
              <defs>
                <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey={xKey} fontSize={12} axisLine={false} tickLine={false} />
              <YAxis fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip formatter={(value: number) => [`Rs. ${Number(value).toLocaleString()}`, "Amount"]} wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey={yKey} stroke={color} fillOpacity={1} fill="url(#colorDonations)" />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </AreaChart>
          </ResponsiveContainer>
        ) : type === "pie" ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donations}
                dataKey={pieValueKey}
                nameKey={pieNameKey}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {donations.map((entry: any, idx: number) => (
                  <Cell key={entry[pieNameKey] || idx} fill={pieColors[idx % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`Rs. ${Number(value).toLocaleString()}`, "Amount"]} wrapperStyle={{ fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        ) : null}
      </CardContent>
    </Card>
  );
}
