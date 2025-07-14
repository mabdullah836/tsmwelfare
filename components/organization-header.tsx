import { cn } from "@/lib/utils"
import Image from "next/image"

interface OrganizationHeaderProps {
  variant?: "full" | "compact" | "banner" | "emblem" | "modern"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showTagline?: boolean
}

export function OrganizationHeader({
  size = "md",
  className,
}: OrganizationHeaderProps) {
  // Increased logo sizes
  const sizeClasses = {
    sm: {
      logo: "h-12 w-12",
      title: "text-lg md:text-xl",
      subtitle: "text-sm",
      tagline: "text-xs",
      container: "gap-3",
      arabic: "text-lg",
    },
    md: {
      logo: "h-16 w-16 md:h-20 md:w-20",
      title: "text-xl md:text-2xl lg:text-3xl",
      subtitle: "text-base md:text-lg",
      tagline: "text-sm",
      container: "gap-4",
      arabic: "text-base",
    },
    lg: {
      logo: "h-20 w-20 md:h-24 md:w-24",
      title: "text-2xl md:text-3xl lg:text-4xl",
      subtitle: "text-lg md:text-xl",
      tagline: "text-base",
      container: "gap-6",
      arabic: "text-lg",
    },
    xl: {
      logo: "h-24 w-24 md:h-32 md:w-32",
      title: "text-3xl md:text-4xl lg:text-5xl",
      subtitle: "text-xl md:text-2xl",
      tagline: "text-lg",
      container: "gap-8",
      arabic: "text-xl",
    },
  }

  const currentSize = sizeClasses[size]

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-center text-center md:text-left",
        currentSize.container,
        className,
      )}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-lg"></div>
        <Image
          src="/images/logo.png"
          alt="The Sirat-e-Mustaqeem Welfare Trust Logo"
          width={120}
          height={120}
          className={cn("relative object-contain drop-shadow-xl", currentSize.logo)}
        />  
      </div>
        <div className="flex-1">
          <p className={cn("text-emerald-700 dark:text-emerald-400 font-extrabold", currentSize.arabic)} dir="rtl">
            صراط مستقیم ویلفیئر ٹرسٹ
          </p>
        </div>
    </div>
  )
}
