import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-muted">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="The Sirat-e-Mustaqeem Welfare Trust Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-xl font-bold">The Sirat-e-Mustaqeem Welfare Trust</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Guiding people towards the straight path through compassion, service, and community support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-primary">
                  Current Projects
                </Link>
              </li>
              <li>
                <Link href="/zakat-calculator" className="text-muted-foreground hover:text-primary">
                  Zakat Calculator
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-muted-foreground hover:text-primary">
                  Media Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-muted-foreground hover:text-primary">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground">
              <p className="mb-2">123 Trust Street</p>
              <p className="mb-2">City, State 12345</p>
              <p className="mb-4">Pakistan</p>
              <p className="mb-2">
                <a href="tel:+921234567890" className="hover:text-primary">
                  +92 123 456 7890
                </a>
              </p>
              <p>
                <a href="mailto:info@sirat-e-mustaqeem.org" className="hover:text-primary">
                  info@sirat-e-mustaqeem.org
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} The Sirat-e-Mustaqeem Welfare Trust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
