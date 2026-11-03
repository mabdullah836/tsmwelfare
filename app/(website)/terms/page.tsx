import { PageHeader } from "@/components/page-header"

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Service" eyebrow="Legal">
        <p className="text-lg text-muted-foreground">
          Please read these terms carefully before using our website and services.
        </p>
      </PageHeader>

      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="prose-site rounded-2xl border bg-card p-6 shadow-sm sm:p-10">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provisions of
              this agreement. If you do not agree to abide by these terms, please do not use this website.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials (information or software) on Sirat-e-Mustaqeem
              Welfare Trust's website for personal, non-commercial viewing only.
            </p>

            <h3>This license shall not allow you to:</h3>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h2>3. Disclaimer</h2>
            <p>
              The materials on Sirat-e-Mustaqeem Welfare Trust's website are provided on an 'as is' basis.
              Sirat-e-Mustaqeem Welfare Trust makes no warranties, expressed or implied, and hereby disclaims and
              negates all other warranties including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or non-infringement of intellectual property or
              other violation of rights.
            </p>

            <h2>4. Limitations</h2>
            <p>
              In no event shall Sirat-e-Mustaqeem Welfare Trust or its suppliers be liable for any damages
              (including, without limitation, damages for loss of data or profit, or due to business interruption)
              arising out of the use or inability to use the materials on the website.
            </p>

            <h2>5. Accuracy of Materials</h2>
            <p>
              The materials appearing on our website could include technical, typographical, or photographic errors.
              We do not warrant that any of the materials on our website are accurate, complete, or current.
            </p>

            <h2>6. Links</h2>
            <p>
              Sirat-e-Mustaqeem Welfare Trust has not reviewed all of the sites linked to its website and is not
              responsible for the contents of any such linked site. The inclusion of any link does not imply
              endorsement by us of the site. Use of any such linked website is at the user's own risk.
            </p>

            <h2>7. Modifications</h2>
            <p>
              We may revise these terms of service at any time without notice. By using this website, you are
              agreeing to be bound by the then current version of these terms of service.
            </p>

            <h2>8. Donations and Payments</h2>
            <p>
              All donations made through our website are final and non-refundable. We use secure payment processors
              to handle transactions, but we cannot guarantee absolute security of your payment information.
            </p>

            <h2>9. User Content</h2>
            <p>
              Any content you submit to our website (including comments, feedback, or suggestions) may be used by us
              without restriction or compensation to you.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Pakistan, and
              you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>

            <div className="mt-8 p-6 bg-muted rounded-lg">
              <h3 className="text-xl font-bold mb-4">Questions About Our Terms?</h3>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact our legal team.
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