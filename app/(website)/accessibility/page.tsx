export default function AccessibilityPage() {
  return (
    <>
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Accessibility</h1>
            <p className="text-xl text-white/90">
              We are committed to ensuring our website is accessible to everyone, regardless of ability or technology.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Our Commitment to Accessibility</h2>
            <p>
              Sirat-e-Mustaqeem Welfare Trust is committed to providing a website that is accessible to the widest
              possible audience, regardless of technology or ability. We are actively working to increase the
              accessibility and usability of our website.
            </p>

            <h2>Standards</h2>
            <p>
              We strive to meet WCAG 2.1 Level AA standards for web accessibility. This includes:
            </p>
            <ul>
              <li>Providing text alternatives for non-text content</li>
              <li>Making all functionality available from a keyboard</li>
              <li>Providing ways to help users navigate, find content, and determine where they are</li>
              <li>Making text content readable and understandable</li>
              <li>Making content appear and operate in predictable ways</li>
              <li>Helping users avoid and correct mistakes</li>
              <li>Maximizing compatibility with current and future user tools</li>
            </ul>

            <h2>Accessibility Features</h2>
            <p>Our website includes the following accessibility features:</p>
            <ul>
              <li>Semantic HTML markup for better screen reader compatibility</li>
              <li>ARIA landmarks and labels where appropriate</li>
              <li>Keyboard navigation support</li>
              <li>Color contrast that meets WCAG guidelines</li>
              <li>Resizable text without loss of functionality</li>
              <li>Alt text for images</li>
              <li>Focus indicators for keyboard navigation</li>
              <li>Skip to main content link</li>
            </ul>

            <h2>Assistive Technologies</h2>
            <p>
              Our website is designed to be compatible with the following assistive technologies:
            </p>
            <ul>
              <li>Screen readers</li>
              <li>Screen magnifiers</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
            </ul>

            <h2>Known Issues</h2>
            <p>
              We are continuously working to improve the accessibility of our website. If you encounter any
              accessibility barriers, please let us know by:
            </p>
            <ul>
              <li>
                Emailing us at{" "}
                <a href="mailto:accessibility@sirat-e-mustaqeem.org">accessibility@sirat-e-mustaqeem.org</a>
              </li>
              <li>
                Using our <a href="/contact">contact form</a>
              </li>
              <li>Calling us at +92 123 456 7890</li>
            </ul>

            <h2>Feedback</h2>
            <p>
              We welcome your feedback on the accessibility of our website. Please let us know if you encounter any
              accessibility barriers or have suggestions for improvement. Your feedback helps us identify and address
              accessibility issues.
            </p>

            <div className="mt-8 p-6 bg-muted rounded-lg">
              <h3 className="text-xl font-bold mb-4">Need Assistance?</h3>
              <p className="mb-4">
                If you need assistance or have specific accessibility requirements, please don't hesitate to contact
                us. We're here to help!
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 