import Image from "next/image"
import { cn } from "@/lib/utils"

interface OrganizationHeaderProps {
  variant?: "full" | "compact" | "banner" | "emblem" | "modern"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showTagline?: boolean
}

export function OrganizationHeader({
  variant = "full",
  size = "md",
  className,
  showTagline = true,
}: OrganizationHeaderProps) {
  const sizeClasses = {
    sm: {
      logo: "h-12 w-12",
      title: "text-lg md:text-xl",
      subtitle: "text-sm",
      tagline: "text-xs",
      container: "gap-3",
      arabic: "text-sm",
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

  if (variant === "modern") {
    return (
      <div
        className={cn(
          "flex items-center justify-center py-8 px-6 bg-gradient-to-r from-emerald-50 via-white to-teal-50 dark:from-emerald-950/20 dark:via-background dark:to-teal-950/20 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/30",
          className,
        )}
      >
        <div className={cn("flex items-center", currentSize.container)}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-xl"></div>
            <Image
              src="/images/smw-logo-transparent.png"
              alt="SMW Logo"
              width={80}
              height={80}
              className={cn("relative object-contain drop-shadow-xl", currentSize.logo)}
            />
          </div>
          <div className="text-center md:text-left">
            {showTagline && (
              <div className="space-y-1">
                <p className={cn("font-medium text-emerald-700 dark:text-emerald-400", currentSize.arabic)} dir="rtl">
                  صراط مستقیم ویلفیئر ٹرسٹ
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (variant === "banner") {
    return (
      <div
        className={cn(
          "flex items-center justify-center py-6 px-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl",
          className,
        )}
      >
        <div className={cn("flex items-center", currentSize.container)}>
          <div className="relative">
            <Image
              src="/images/smw-logo-transparent.png"
              alt="SMW Logo"
              width={80}
              height={80}
              className={cn("object-contain drop-shadow-lg", currentSize.logo)}
            />
          </div>
          <div className="text-center">
            <h1 className={cn("font-bold text-foreground leading-tight", currentSize.title)}>
              <span className="text-primary">Sirat-e-Mustaqeem</span>
              <br />
              <span className="text-secondary-foreground">Welfare Trust</span>
            </h1>
            {showTagline && (
              <div className="mt-2 space-y-1">
                <p className={cn("text-primary font-medium", currentSize.arabic)} dir="rtl">
                  صراط مستقیم ویلفیئر ٹرسٹ
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (variant === "emblem") {
    return (
      <div
        className={cn(
          "relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950/20 dark:via-background dark:to-teal-950/20 rounded-3xl shadow-2xl border border-emerald-200/50 dark:border-emerald-800/30",
          className,
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-teal-100/50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl"></div>
        <div className="relative z-10">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-teal-500/30 rounded-full blur-2xl"></div>
            <Image
              src="/images/smw-logo-transparent.png"
              alt="SMW Logo"
              width={120}
              height={120}
              className={cn("relative object-contain drop-shadow-2xl", currentSize.logo)}
            />
          </div>
          <div className="space-y-3">
            <h1 className={cn("font-bold leading-tight", currentSize.title)}>
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Sirat-e-Mustaqeem
              </span>
              <br />
              <span className="bg-gradient-to-r from-slate-700 to-slate-600 dark:from-slate-300 dark:to-slate-400 bg-clip-text text-transparent">
                Welfare Trust
              </span>
            </h1>
            {showTagline && (
              <div className="space-y-2">
                <p className={cn("text-emerald-700 dark:text-emerald-400 font-semibold", currentSize.arabic)} dir="rtl">
                  صراط مستقیم ویلفیئر ٹرسٹ
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center", currentSize.container, className)}>
        <Image
          src="/images/smw-logo-transparent.png"
          alt="SMW Logo"
          width={60}
          height={60}
          className={cn("object-contain", currentSize.logo)}
        />
        <div>
          <h1 className={cn("font-bold text-foreground leading-tight", currentSize.title)}>
            <span className="text-primary">SMW</span> <span className="text-secondary-foreground">Trust</span>
          </h1>
          {showTagline && (
            <p className={cn("text-emerald-700 dark:text-emerald-400 font-medium", currentSize.tagline)} dir="rtl">
              صراط مستقیم ویلفیئر ٹرسٹ
            </p>
          )}
        </div>
      </div>
    )
  }

  // Default "full" variant - Enhanced
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
          src="/images/smw-logo-transparent.png"
          alt="The Sirat-e-Mustaqeem Welfare Trust Logo"
          width={80}
          height={80}
          className={cn("relative object-contain drop-shadow-xl", currentSize.logo)}
        />
      </div>
      <div className="flex-1">
        <div className="mb-2">
          <h1 className={cn("font-bold leading-tight", currentSize.title)}>
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Sirat-e-Mustaqeem
            </span>
            <br />
            <span className="text-slate-700 dark:text-slate-300">Welfare Trust</span>
          </h1>
        </div>
        {showTagline && (
          <div className="space-y-1">
            <p className={cn("text-emerald-700 dark:text-emerald-400 font-semibold", currentSize.arabic)} dir="rtl">
              صراط مستقیم ویلفیئر ٹرسٹ
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
