'use client'

import { motion } from 'framer-motion'

interface SimpleFeatureItemProps {
  text: string
  index?: number
}

export default function SimpleFeatureItem({
  text,
  index = 0
}: SimpleFeatureItemProps) {
  return (
    <motion.div
      className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
      whileHover={{ x: 10 }}
    >
      <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-600 to-primary" />
      <span className="font-medium">{text}</span>
    </motion.div>
  )
}
