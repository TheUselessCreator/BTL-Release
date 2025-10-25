import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />

      <BottomNav />

      <div className="container relative mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="mb-8 text-4xl font-bold text-balance md:text-5xl">Privacy Policy</h1>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">1. Information We Collect</h2>
              <p className="leading-relaxed mb-4">
                When you use Bypass-Your-Link, we may collect the following information:
              </p>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>
                  <strong>URLs Submitted:</strong> The shortened URLs you submit for analysis
                </li>
                <li>
                  <strong>Technical Data:</strong> IP addresses, browser type, device information, and access times
                </li>
                <li>
                  <strong>API Usage:</strong> API requests, authentication tokens, and usage patterns
                </li>
                <li>
                  <strong>Cookies:</strong> Essential cookies for service functionality
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">We use the collected information for the following purposes:</p>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>To provide and maintain the URL bypass service</li>
                <li>To analyze and improve service performance</li>
                <li>To detect and prevent abuse or malicious activity</li>
                <li>To monitor API usage and enforce rate limits</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">3. Data Storage and Security</h2>
              <p className="leading-relaxed">
                We implement reasonable security measures to protect your information. However, no method of
                transmission over the internet is 100% secure. URL submissions and redirect chains may be temporarily
                logged for service operation and debugging purposes. We do not permanently store the content of bypassed
                URLs.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">4. Data Sharing and Disclosure</h2>
              <p className="leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share information only
                in the following circumstances:
              </p>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>When required by law or legal process</li>
                <li>To protect our rights, property, or safety</li>
                <li>With service providers who assist in operating the Service</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">5. Third-Party Services</h2>
              <p className="leading-relaxed">
                Our Service interacts with third-party URL shortening services to resolve links. We are not responsible
                for the privacy practices of these external services. When you submit a URL, we may make requests to
                third-party servers to follow redirects.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">6. Cookies and Tracking</h2>
              <p className="leading-relaxed">
                We use essential cookies to maintain service functionality. We do not use tracking cookies for
                advertising purposes. You can disable cookies in your browser settings, but this may affect service
                functionality.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">7. Data Retention</h2>
              <p className="leading-relaxed">
                We retain technical logs and usage data for a limited period necessary for service operation, security,
                and debugging. URL submissions are not permanently stored unless required for abuse prevention.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">8. Your Rights</h2>
              <p className="leading-relaxed mb-4">Depending on your jurisdiction, you may have the following rights:</p>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate data</li>
                <li>Deletion of your data</li>
                <li>Objection to data processing</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">9. Children's Privacy</h2>
              <p className="leading-relaxed">
                Our Service is not intended for children under 13 years of age. We do not knowingly collect personal
                information from children. If you believe we have collected information from a child, please contact us
                immediately.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">10. Changes to Privacy Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
                revision date. Continued use of the Service after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">11. Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please contact us through our
                Discord bot or support channels.
              </p>
            </section>

            <p className="pt-8 text-sm">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
