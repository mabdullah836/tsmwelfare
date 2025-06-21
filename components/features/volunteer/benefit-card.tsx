import { Card, CardContent } from "@/components/ui/card"
import { BenefitCardProps } from "@/lib/types/volunteer"

export const BenefitCard = ({ icon, title, description }: BenefitCardProps) => (
  <Card className="bg-background">
    <CardContent className="pt-6">
      {icon}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
); 