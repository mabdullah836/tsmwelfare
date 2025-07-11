import { PageHeader } from "@/components/page-header"

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy">
        <p className="text-xl text-white/90">
          Learn about how we collect, use, and protect your personal information at The Sirat-e-Mustaqeem Welfare Trust.
        </p>
      </PageHeader>

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Introduction</h2>
            <p>
              At The Sirat-e-Mustaqeem Welfare Trust, we take your privacy seriously. This Privacy Policy explains how
              we collect, use, disclose, and safeguard your information when you visit our website, make donations, or use our
              services. As a faith-based organization serving our community since 2016, we are committed to maintaining the trust
              and confidence of our donors, volunteers, and beneficiaries.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Make a donation (Zakat, Sadaqah, or other contributions)</li>
              <li>Sign up for our newsletter</li>
              <li>Fill out a contact form</li>
              <li>Register for our programs (medical camps, food distribution, etc.)</li>
              <li>Apply for volunteer opportunities</li>
              <li>Apply for assistance (educational support, marriage support, etc.)</li>
            </ul>

            <p>This information may include:</p>
            <ul>
              <li>Name and contact details</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Mailing address</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>CNIC number (for verification purposes)</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>
              When you visit our website, we may automatically collect certain information about your device,
              including:
            </p>
            <ul>
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device type</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Time and date of visits</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the collected information for various purposes, including:</p>
            <ul>
              <li>Processing your donations and providing receipts</li>
              <li>Managing our welfare programs (medical camps, food distribution, etc.)</li>
              <li>Coordinating volunteer activities</li>
              <li>Communicating about our programs and services</li>
              <li>Responding to your inquiries</li>
              <li>Sending newsletters and updates (with your consent)</li>
              <li>Improving our website and services</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your
              information with:
            </p>
            <ul>
              <li>Service providers who assist in our operations</li>
              <li>Payment processors for donation processing (bank transfers, mobile wallets, etc.)</li>
              <li>Legal authorities when required by law</li>
              <li>Partner organizations for specific welfare programs (with your consent)</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of
              transmission over the internet is 100% secure, and we cannot guarantee absolute security. We take extra
              precautions to protect sensitive information like CNIC numbers and financial data.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of communications</li>
              <li>Withdraw consent where applicable</li>
              <li>Request information about how your donations are used</li>
            </ul>

            <h2>Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to improve your browsing experience. You can control
              cookie settings through your browser preferences.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our website is not intended for children under 13. We do not knowingly collect information from
              children under 13 without parental consent. For our educational support programs, we collect
              information about children only with explicit parental consent.
            </p>

            <h2>Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically. The latest version will be posted on this page with
              the effective date. We encourage you to review this policy regularly.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <ul>
              <li>
                Email:{" "}
                <a href="mailto:privacy@sirat-e-mustaqeem.org">privacy@sirat-e-mustaqeem.org</a>
              </li>
              <li>
                Phone: <a href="tel:+921234567890">+92 123 456 7890</a>
              </li>
              <li>
                Mail: The Sirat-e-Mustaqeem Welfare Trust
                <br />
                Mansehra Colony, Lal Kothi Stop
                <br />
                Landhi, Karachi
                <br />
                Pakistan
              </li>
            </ul>

            <div className="mt-8 p-6 bg-muted rounded-lg">
              <h3 className="text-xl font-bold mb-4">Have Privacy Concerns?</h3>
              <p className="mb-4">
                If you have any concerns about your privacy or how we handle your data, please don't hesitate to
                reach out to our privacy team. We are committed to addressing your concerns promptly and transparently.
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