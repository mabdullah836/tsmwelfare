import { BenefitCardProps } from "@/lib/types/volunteer"

export const BenefitCard = ({ icon, title, description }: BenefitCardProps) => (
  <div className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm">
    <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary [&_svg]:m-0 [&_svg]:h-6 [&_svg]:w-6" aria-hidden>
      {icon}
    </span>
    <h3 className="text-lg font-bold">{title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
  </div>
);
