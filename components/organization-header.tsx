import Image from "next/image"

type OrganizationHeaderProps = {
  variant?: "full" | "icon" | "text"
  size?: "md" | "lg"
  showTagline?: boolean
  className?: string
}

export function OrganizationHeader({
  variant = "full",
  size = "md",
  showTagline = false,
  className = ""
}: OrganizationHeaderProps) {
  // Size variants
  const sizeClasses = {
    md: {
      logo: "h-10 w-10",
      text: "text-xl",
      tagline: "text-sm"
    },
    lg: {
      logo: "h-12 w-12",
      text: "text-2xl",
      tagline: "text-base"
    }
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {variant !== "text" && (
        <div className={`relative ${sizeClasses[size].logo} shrink-0`}>
          <Image
            src="/images/logo.png"
            alt="Sirat-e-Mustaqeem Welfare Trust Logo"
            sizes="48px"
            fill
            className="object-contain"
          />
        </div>
      )}

      {(variant === "full" || variant === "text") && (
        <div className="flex flex-col">
          <div className="group">
            {/* Not a heading: this brand mark appears on every page, which already has its own <h1>. */}
            <span className={`block font-bold leading-tight tracking-tight ${sizeClasses[size].text} text-foreground group-hover:text-primary transition-colors`}>
              The Sirat-e-Mustaqeem
              <span className="text-primary"> Welfare Trust</span>
            </span>
          </div>
          
          {showTagline && (
            <p className={`${sizeClasses[size].tagline} text-muted-foreground mt-1`}>
              Guiding towards the straight path
            </p>
          )}
        </div>
      )}
    </div>
  )
}