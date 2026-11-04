import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: "Admin Login | The Sirat-e-Mustaqeem Welfare Trust" },
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
