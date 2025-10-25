"use client"

import { useEffect, useState } from "react"
import { Activity, Globe, Bot, RefreshCw, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"

interface ServiceStatus {
  name: string
  status: "online" | "offline" | "checking"
  responseTime?: number
  lastChecked?: string
}

export default function StatusPage() {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: "Website", status: "checking" },
    { name: "Discord Bot", status: "checking" },
    { name: "API", status: "checking" },
  ])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const checkStatus = async () => {
    setIsRefreshing(true)
    try {
      const response = await fetch("/api/status")
      const data = await response.json()
      setServices(data.services)
    } catch (error) {
      console.error("Failed to fetch status:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    checkStatus()
    const interval = setInterval(checkStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="fixed inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />

      <BottomNav />

      <div className="container relative mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-accent/10 p-4">
              <Activity className="h-12 w-12 text-accent" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">System Status</h1>
            <p className="text-lg text-muted-foreground">Real-time monitoring of all services</p>
          </div>

          {/* Refresh Button */}
          <div className="mb-8 flex justify-end">
            <Button onClick={checkStatus} disabled={isRefreshing} variant="outline" className="gap-2 bg-transparent">
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh Status
            </Button>
          </div>

          {/* Status Cards */}
          <div className="space-y-4">
            {services.map((service, index) => (
              <div
                key={service.name}
                className="rounded-2xl border-2 border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-border"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-xl p-3 ${index === 0 ? "bg-primary/10" : index === 1 ? "bg-accent/10" : "bg-green-500/10"}`}
                    >
                      {index === 0 ? (
                        <Globe className="h-6 w-6 text-primary" />
                      ) : index === 1 ? (
                        <Bot className="h-6 w-6 text-accent" />
                      ) : (
                        <Zap className="h-6 w-6 text-green-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{service.name}</h3>
                      {service.lastChecked && (
                        <p className="text-sm text-muted-foreground">Last checked: {service.lastChecked}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {service.responseTime && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Response Time</p>
                        <p className="text-lg font-semibold text-foreground">{service.responseTime}ms</p>
                      </div>
                    )}
                    <div
                      className={`flex items-center gap-2 rounded-full px-4 py-2 ${
                        service.status === "online"
                          ? "bg-green-500/20 text-green-500"
                          : service.status === "offline"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          service.status === "online"
                            ? "bg-green-500 animate-pulse"
                            : service.status === "offline"
                              ? "bg-red-500"
                              : "bg-yellow-500 animate-pulse"
                        }`}
                      />
                      <span className="font-semibold capitalize">{service.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overall Status */}
          <div className="mt-8 rounded-2xl border-2 border-border/50 bg-card/30 p-6 text-center backdrop-blur-sm">
            <p className="text-lg text-muted-foreground">
              {services.every((s) => s.status === "online") ? (
                <span className="text-green-500 font-semibold">✓ All systems operational</span>
              ) : services.some((s) => s.status === "checking") ? (
                <span className="text-yellow-500 font-semibold">⟳ Checking systems...</span>
              ) : (
                <span className="text-red-500 font-semibold">⚠ Some systems are experiencing issues</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
