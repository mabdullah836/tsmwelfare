import React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FeatureCardProps } from "@/lib/types/featureCard"

export const FeatureCard = React.memo(function FeatureCard({ title, description, icon, className }: FeatureCardProps) {
  return (
    <Card className={cn("feature-card", className)}>
      <CardHeader className="pb-2">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
});
