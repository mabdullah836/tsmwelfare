import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DepartmentCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function DepartmentCard({ icon: Icon, title, description }: DepartmentCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-base">{description}</p>
      </CardContent>
    </Card>
  );
}