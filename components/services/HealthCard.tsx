'use client'

import { motion } from 'framer-motion'

interface HealthCardProps {
  icon: React.ReactNode
  title: string
  index?: number
}

export default function HealthCard({
  icon,
  title,
  index = 0
}: HealthCardProps) {
  return (
    <motion.div 
      className="border-0 rounded-2xl p-6 text-center bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.05, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
    >
      {icon}
      <p className="font-bold text-lg">{title}</p>
    </motion.div>
  )
}
