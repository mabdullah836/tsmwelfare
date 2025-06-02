import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Media Gallery | The Sirat-e-Mustaqeem Welfare Trust",
  description: "Browse through our media gallery showcasing our events, activities, and impact.",
}

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 