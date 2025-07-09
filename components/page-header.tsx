import { ReactNode } from "react"

export function PageHeader({
  title,
  children,
}: {
  title: string
  children?: ReactNode
}) {
  return (
    <section className="bg-primary text-white py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </section>
  )
}
