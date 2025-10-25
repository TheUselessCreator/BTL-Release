import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

export default function TermsOfService() {
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

          <h1 className="mb-8 text-4xl font-bold text-balance md:text-5xl">Terms of Service</h1>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using Bypass-Your-Link ("the Service"), you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">2. Description of Service</h2>
              <p className="leading-relaxed">
                Bypass-Your-Link is a URL analysis tool that reveals the final destination of shortened URLs by
                following redirect chains. The Service is provided for security and transparency purposes, allowing
                users to verify where links lead before clicking them.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">3. Acceptable Use</h2>
              <p className="leading-relaxed mb-4">
                You agree to use the Service only for lawful purposes. You must not use the Service:
              </p>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>To bypass security measures or access restricted content illegally</li>
                <li>To facilitate phishing, malware distribution, or other malicious activities</li>
                <li>To violate any applicable laws or regulations</li>
                <li>To abuse, harass, or harm another person or entity</li>
                <li>To overload or attempt to gain unauthorized access to the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">4. API Usage</h2>
              <p className="leading-relaxed">
                Access to the API requires authentication. Unauthorized access attempts are prohibited. API keys and
                passwords must be kept confidential and are non-transferable. We reserve the right to revoke API access
                at any time.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">5. Disclaimer of Warranties</h2>
              <p className="leading-relaxed">
                The Service is provided "as is" without warranties of any kind, either express or implied. We do not
                guarantee that the Service will be uninterrupted, secure, or error-free. We are not responsible for the
                content of external websites or the accuracy of redirect information.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">6. Limitation of Liability</h2>
              <p className="leading-relaxed">
                In no event shall Bypass-Your-Link be liable for any indirect, incidental, special, consequential, or
                punitive damages resulting from your use of or inability to use the Service. This includes damages for
                loss of profits, data, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">7. Modifications to Service</h2>
              <p className="leading-relaxed">
                We reserve the right to modify or discontinue the Service at any time without notice. We shall not be
                liable to you or any third party for any modification, suspension, or discontinuance of the Service.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">8. Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to update these Terms of Service at any time. Continued use of the Service after
                changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">9. Contact Information</h2>
              <p className="leading-relaxed">
                For questions about these Terms of Service, please contact us through our Discord bot or support
                channels.
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
