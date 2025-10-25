"use server"

export async function bypassUrl(url: string) {
  try {
    // Validate URL format
    let parsedUrl: URL
    try {
      // Fix common URL issues (missing slashes)
      let fixedUrl = url.trim()
      if (fixedUrl.startsWith("http:/") && !fixedUrl.startsWith("http://")) {
        fixedUrl = fixedUrl.replace("http:/", "http://")
      }
      if (fixedUrl.startsWith("https:/") && !fixedUrl.startsWith("https://")) {
        fixedUrl = fixedUrl.replace("https:/", "https://")
      }
      parsedUrl = new URL(fixedUrl)
      url = fixedUrl
    } catch {
      return {
        success: false,
        error: "Invalid URL format. Please enter a valid URL.",
      }
    }

    // Only allow http and https protocols
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return {
        success: false,
        error: "Only HTTP and HTTPS URLs are supported.",
      }
    }

    const redirectChain: string[] = [url]
    let currentUrl = url
    let finalUrl = url
    const maxRedirects = 15
    let redirectCount = 0

    // Common URL shortener domains for enhanced handling
    const shortenerDomains = [
      "tinyurl.com",
      "bit.ly",
      "ow.ly",
      "is.gd",
      "buff.ly",
      "adf.ly",
      "goo.gl",
      "t.co",
      "lnkd.in",
      "db.tt",
      "qr.ae",
      "cutt.ly",
      "rebrandly.com",
      "short.io",
      "tiny.cc",
      "tr.im",
      "cli.gs",
      "linktr.ee",
      "soo.gd",
      "clicky.me",
      "s2r.co",
      "prettylinkpro.com",
      "scrnch.me",
      "filoops.info",
      "vurl.com",
      "linkvertise.com",
      "bc.vc",
      "j.mp",
      "lstu.fr",
      "x.co",
      "v.gd",
    ]

    while (redirectCount < maxRedirects) {
      try {
        const response = await fetch(currentUrl, {
          method: "GET",
          redirect: "manual",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
          },
        })

        console.log("[v0] Response status:", response.status, "for URL:", currentUrl)

        // Check for redirect status codes
        if ([301, 302, 303, 307, 308].includes(response.status)) {
          const location = response.headers.get("location")
          console.log("[v0] Found redirect location:", location)

          if (!location) {
            break
          }

          // Handle relative URLs
          const nextUrl = location.startsWith("http") ? location : new URL(location, currentUrl).toString()

          redirectChain.push(nextUrl)
          currentUrl = nextUrl
          finalUrl = nextUrl
          redirectCount++
          continue
        } else if (response.status === 200) {
          const html = await response.text()

          // Check for meta refresh
          const metaRefreshMatch = html.match(
            /<meta[^>]*http-equiv=["']refresh["'][^>]*content=["'][^"']*url=([^"']+)["']/i,
          )
          if (metaRefreshMatch && metaRefreshMatch[1]) {
            const nextUrl = metaRefreshMatch[1].startsWith("http")
              ? metaRefreshMatch[1]
              : new URL(metaRefreshMatch[1], currentUrl).toString()
            console.log("[v0] Found meta refresh redirect:", nextUrl)
            redirectChain.push(nextUrl)
            currentUrl = nextUrl
            finalUrl = nextUrl
            redirectCount++
            continue
          }

          // Check for JavaScript window.location redirects
          const jsRedirectMatch = html.match(/window\.location(?:\.href)?\s*=\s*["']([^"']+)["']/i)
          if (jsRedirectMatch && jsRedirectMatch[1]) {
            const nextUrl = jsRedirectMatch[1].startsWith("http")
              ? jsRedirectMatch[1]
              : new URL(jsRedirectMatch[1], currentUrl).toString()
            console.log("[v0] Found JavaScript redirect:", nextUrl)
            redirectChain.push(nextUrl)
            currentUrl = nextUrl
            finalUrl = nextUrl
            redirectCount++
            continue
          }

          // No more redirects found
          break
        } else {
          // No more redirects
          break
        }
      } catch (error) {
        console.log("[v0] Error fetching URL:", error)
        break
      }
    }

    if (redirectCount >= maxRedirects) {
      return {
        success: false,
        error: "Too many redirects detected. The URL may be in a redirect loop.",
      }
    }

    console.log("[v0] Final URL:", finalUrl, "Redirect count:", redirectCount)

    return {
      success: true,
      finalUrl,
      redirectChain: redirectChain.length > 1 ? redirectChain : undefined,
    }
  } catch (error) {
    console.log("[v0] Error in bypassUrl:", error)
    return {
      success: false,
      error: "Failed to process the URL. Please try again.",
    }
  }
}
