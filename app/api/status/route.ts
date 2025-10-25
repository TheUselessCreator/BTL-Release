import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const services = []

  const host = request.headers.get("host") || "www.bypass.zone.id"
  const protocol = request.headers.get("x-forwarded-proto") || "https"
  const siteUrl = `${protocol}://${host}`

  // Check Website Status
  try {
    const websiteStart = Date.now()
    const websiteResponse = await fetch("https://www.bypass.zone.id", {
      method: "HEAD",
      signal: AbortSignal.timeout(5000),
    })
    const websiteTime = Date.now() - websiteStart

    services.push({
      name: "Website",
      status: websiteResponse.ok ? "online" : "offline",
      responseTime: websiteTime,
      lastChecked: new Date().toLocaleTimeString(),
    })
  } catch (error) {
    services.push({
      name: "Website",
      status: "offline",
      lastChecked: new Date().toLocaleTimeString(),
    })
  }

  // Check Discord Bot Status - Real TCP connection test
  try {
    const botStart = Date.now()
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000) // Reduced timeout to 3s

    console.log("[v0] Attempting to connect to Discord bot at n1.weissx.net:20225")

    const botResponse = await fetch("http://n1.weissx.net:20225", {
      method: "GET",
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    const botTime = Date.now() - botStart

    console.log("[v0] Bot response status:", botResponse.status, "ok:", botResponse.ok)

    // Only mark as online if we get a 2xx response
    if (botResponse.ok) {
      services.push({
        name: "Discord Bot",
        status: "online",
        responseTime: botTime,
        lastChecked: new Date().toLocaleTimeString(),
      })
    } else {
      console.log("[v0] Bot returned non-OK status, marking offline")
      services.push({
        name: "Discord Bot",
        status: "offline",
        lastChecked: new Date().toLocaleTimeString(),
      })
    }
  } catch (error) {
    // Any connection error means the bot is offline
    console.log("[v0] Bot connection failed:", error instanceof Error ? error.message : "Unknown error")
    services.push({
      name: "Discord Bot",
      status: "offline",
      lastChecked: new Date().toLocaleTimeString(),
    })
  }

  // Check API Status
  try {
    const apiStart = Date.now()
    const testUrl = encodeURIComponent("https://example.com")
    const apiResponse = await fetch(`${siteUrl}/api/bypass/${testUrl}/code/36q4yhgrffbgrhgbruhf`, {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    })
    const apiTime = Date.now() - apiStart

    services.push({
      name: "API",
      status: apiResponse.ok ? "online" : "offline",
      responseTime: apiTime,
      lastChecked: new Date().toLocaleTimeString(),
    })
  } catch (error) {
    services.push({
      name: "API",
      status: "offline",
      lastChecked: new Date().toLocaleTimeString(),
    })
  }

  return NextResponse.json({ services })
}
