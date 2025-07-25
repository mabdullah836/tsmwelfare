import { Variants } from "framer-motion"

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right', delay: number): Variants => ({
  hidden: {
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    opacity: 0
  },
  visible: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween' as const,
      duration: 0.5,
      delay,
      ease: [0.25, 0.25, 0.25, 0.75]
    }
  }
})

export const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}