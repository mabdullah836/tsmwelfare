import { metadata as pageMetadata } from "./page.metadata"

// The page titles are already complete; bypass the parent "%s | Trust name" template.
export const metadata = { ...pageMetadata, title: { absolute: pageMetadata.title } }

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children
}
