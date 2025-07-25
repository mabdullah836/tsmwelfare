import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface ImpactStatProps {
  value: string;
  label: string;
  icon?: ReactNode;
}

export function ImpactStat({ value, label, icon }: ImpactStatProps) {
  return (
    <Card className="group relative overflow-hidden text-center p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      {/* Gradient background effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-500 rounded-lg" />
      
      <CardContent className="p-0 relative z-10">
        {/* Icon container with animation */}
        {icon && (
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:bg-gradient-to-r group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
              {icon}
            </div>
          </div>
        )}
        
        {/* Stat value with scaling effect */}
        <p className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-3 transition-transform duration-300 group-hover:scale-105">
          {value}
        </p>
        
        {/* Label with subtle animation */}
        <p className="text-sm md:text-base text-muted-foreground font-medium transition-all duration-300 group-hover:text-foreground">
          {label}
        </p>
      </CardContent>
    </Card>
  );
}