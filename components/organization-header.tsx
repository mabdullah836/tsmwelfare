import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

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
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 ${className}`} // Ensure flex and gap-3 are here
    >
      {variant !== "text" && (
        <div className={`relative ${sizeClasses[size].logo} shrink-0`}>
          <Image
            src="/images/logo.png"
            alt="Sirat-e-Mustaqeem Welfare Trust Logo"
            fill
            className="object-contain"
          />
        </div>
      )}

      {(variant === "full" || variant === "text") && (
        <div className="flex flex-col">
          <Link href="/" className="group">
            <h1 className={`font-bold tracking-tight ${sizeClasses[size].text} text-foreground group-hover:text-primary transition-colors`}>
              Sirat-e-Mustaqeem
              <span className="text-primary"> Welfare Trust</span>
            </h1>
          </Link>
          
          {showTagline && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${sizeClasses[size].tagline} text-muted-foreground mt-1`}
            >
              Guiding towards the straight path
            </motion.p>
          )}
        </div>
      )}
    </motion.div>
  )
}