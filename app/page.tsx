import { BypassForm } from "@/components/bypass-form"
import { BottomNav } from "@/components/bottom-nav"
import { Shield, Lock, Zap, Globe } from "lucide-react"

export default function Home() {
  return (
    <main className="relative bg-background">
      <div className="fixed inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />

      <div className="container relative mx-auto px-4 py-12 pt-24 md:py-20 md:pt-28">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent backdrop-blur-sm">
              <Shield className="h-4 w-4" />
              Security Tool
            </div>
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Bypass-Your-Link
            </h1>
            <p className="text-pretty text-lg text-muted-foreground md:text-xl">
              Safely reveal the final destination of shortened URLs before clicking them. Protect yourself from
              malicious links and phishing attempts.
            </p>
          </div>

          {/* Main Form Card */}
          <BypassForm />

          {/* Info Section */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border-2 border-border bg-card p-6 transition-all hover:border-accent/50">
              <Lock className="mb-3 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-semibold text-foreground">Safe & Secure</h3>
              <p className="text-sm text-muted-foreground">
                Check links without visiting them. Stay protected from malicious redirects.
              </p>
            </div>
            <div className="rounded-lg border-2 border-border bg-card p-6 transition-all hover:border-primary/50">
              <Zap className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold text-foreground">Instant Results</h3>
              <p className="text-sm text-muted-foreground">
                Get the final destination URL in seconds. No waiting, no hassle.
              </p>
            </div>
            <div className="rounded-lg border-2 border-border bg-card p-6 transition-all hover:border-accent/50">
              <Globe className="mb-3 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-semibold text-foreground">Universal Support</h3>
              <p className="text-sm text-muted-foreground">
                Works with TinyURL, Bitly, Linkvertise, Rebrandly, and 50+ URL shorteners.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
