import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="space-y-6">
          <div className="relative">
            <div className="text-[10rem] font-bold text-primary/10 leading-none select-none">404</div>
            <h1 className="text-4xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Page Not Found
            </h1>
          </div>

          <p className="text-lg text-muted-foreground">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/" className="inline-flex items-center gap-2">
                <Home className="h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            <Button asChild>
              <Link href="javascript:history.back()" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Link>
            </Button>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            <p>Need assistance? Visit our</p>
            <Link href="/contact" className="text-primary hover:underline">
              Contact Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 