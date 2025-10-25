"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ExternalLink, Copy, CheckCircle2, AlertCircle, Shield, Zap } from "lucide-react"
import { bypassUrl } from "@/app/actions"

export function BypassForm() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    finalUrl?: string
    redirectChain?: string[]
    error?: string
  } | null>(null)
  const [copied, setCopied] = useState(false)
  const [bypassStage, setBypassStage] = useState<"idle" | "analyzing" | "bypassing" | "complete">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setLoading(true)
    setResult(null)
    setCopied(false)
    setBypassStage("analyzing")

    setTimeout(() => {
      setBypassStage("bypassing")
    }, 2000)

    try {
      const response = await bypassUrl(url.trim())

      setTimeout(() => {
        setBypassStage("complete")
        setResult(response)

        setTimeout(() => {
          setLoading(false)
          setBypassStage("idle")
        }, 800)
      }, 5000)
    } catch (error) {
      setTimeout(() => {
        setBypassStage("complete")
        setResult({
          success: false,
          error: "An unexpected error occurred. Please try again.",
        })

        setTimeout(() => {
          setLoading(false)
          setBypassStage("idle")
        }, 800)
      }, 5000)
    }
  }

  const handleCopy = async () => {
    if (result?.finalUrl) {
      await navigator.clipboard.writeText(result.finalUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background animate-in fade-in duration-300">
          <div className="w-full max-w-md space-y-6 px-8">
            {/* Animated Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <Shield className="h-16 w-16 text-accent animate-pulse" />
                <div className="absolute inset-0 animate-spin">
                  <Zap className="h-16 w-16 text-primary opacity-50" />
                </div>
              </div>
            </div>

            {/* Status Text */}
            <div className="text-center">
              <h3 className="mb-2 text-xl font-bold text-foreground">
                {bypassStage === "analyzing" && "Analyzing URL..."}
                {bypassStage === "bypassing" && "Bypassing Redirects..."}
                {bypassStage === "complete" && "Complete!"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {bypassStage === "analyzing" && "Scanning for redirect chains"}
                {bypassStage === "bypassing" && "Following redirect trail"}
                {bypassStage === "complete" && "Destination revealed"}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
              <div className="absolute inset-y-0 left-0 animate-progress bg-gradient-to-r from-accent via-primary to-accent" />
              {/* Scanning Line Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 w-full animate-scan bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              </div>
            </div>

            {/* Stage Indicators */}
            <div className="flex justify-between text-xs">
              <span className={bypassStage === "analyzing" ? "text-accent font-semibold" : "text-muted-foreground"}>
                Analyzing
              </span>
              <span className={bypassStage === "bypassing" ? "text-accent font-semibold" : "text-muted-foreground"}>
                Bypassing
              </span>
              <span className={bypassStage === "complete" ? "text-accent font-semibold" : "text-muted-foreground"}>
                Complete
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <Card className="relative overflow-hidden border-2 border-border bg-card p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium text-foreground">
                Enter Shortened URL
              </label>
              <div className="flex gap-2">
                <Input
                  id="url"
                  type="url"
                  placeholder="https://tinyurl.com/example or https://bit.ly/example"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                  className="flex-1 border-2 bg-background text-foreground"
                  required
                />
                <Button
                  type="submit"
                  disabled={loading || !url.trim()}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Bypassing...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Bypass
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Card>

        {/* Results */}
        {result && !loading && (
          <Card className="border-2 border-border bg-card p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {result.success && result.finalUrl ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Final Destination</h3>
                      <div className="flex items-center gap-2">
                        <code className="block flex-1 overflow-x-auto rounded border-2 border-border bg-background p-3 text-sm text-foreground">
                          {result.finalUrl}
                        </code>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleCopy}
                          title="Copy URL"
                          className="border-2 bg-transparent"
                        >
                          {copied ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          title="Open URL"
                          className="border-2 bg-transparent"
                        >
                          <a href={result.finalUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    {result.redirectChain && result.redirectChain.length > 1 && (
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                          Redirect Chain ({result.redirectChain.length} hops)
                        </h4>
                        <div className="space-y-2">
                          {result.redirectChain.map((redirectUrl, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <span className="shrink-0 text-accent font-semibold">{index + 1}.</span>
                              <code className="break-all text-muted-foreground">{redirectUrl}</code>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Alert variant="destructive" className="border-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {result.error || "Failed to bypass URL. Please check the URL and try again."}
                </AlertDescription>
              </Alert>
            )}
          </Card>
        )}
      </div>
    </>
  )
}
