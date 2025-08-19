'use client'

import { motion } from 'framer-motion'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  gradient?: string
  border?: string
  iconBg?: string
  index?: number
  className?: string
}

export default function FeatureCard({
  icon,
  title,
  description,
  gradient = "from-primary/5 to-transparent",
  border = "border-primary/20",
  iconBg = "from-primary to-blue-600",
  index = 0,
  className = ""
}: FeatureCardProps) {
  return (
    <motion.div 
      className={`flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r ${gradient} border ${border} ${className}`}
      whileHover={{ scale: 1.02, x: 10 }}
      transition={{ duration: 0.2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ animationDelay: `${0.6 + index * 0.1}s` }}
    >
      <div className={`flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r ${iconBg} text-white shadow-lg`}>
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}
