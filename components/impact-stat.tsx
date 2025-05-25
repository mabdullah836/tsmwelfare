import { Card, CardContent } from "@/components/ui/card";

interface ImpactStatProps {
  value: string;
  label: string;
}

export function ImpactStat({ value, label }: ImpactStatProps) {
  return (
    <Card className="text-center p-6">
      <CardContent className="p-0">
        <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{value}</p>
        <p className="text-sm md:text-base text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}