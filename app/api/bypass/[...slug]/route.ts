import { bypassUrl } from "@/app/actions"
import { type NextRequest, NextResponse } from "next/server"

const API_PASSWORD = "36q4yhgrffbgrhgbruhf"

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  try {
    const { slug } = await params

    // Expected format: [encodedLink, "code", password]
    if (!slug || slug.length < 3) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid API format. Use: /api/bypass/{link}/code/{password}",
        },
        { status: 400 },
      )
    }

    // Extract password (last element) and code keyword (second to last)
    const password = slug[slug.length - 1]
    const codeKeyword = slug[slug.length - 2]

    // Validate password
    if (codeKeyword !== "code" || password !== API_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized. Invalid password.",
        },
        { status: 401 },
      )
    }

    // Reconstruct the link from remaining slug parts
    // Everything before "code" is part of the URL
    const linkParts = slug.slice(0, -2)
    const encodedLink = linkParts.join("/")

    // Decode the URL
    let decodedLink: string
    try {
      decodedLink = decodeURIComponent(encodedLink)
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid URL encoding.",
        },
        { status: 400 },
      )
    }

    // Bypass the URL using existing logic
    const result = await bypassUrl(decodedLink)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 400 },
      )
    }

    return NextResponse.json({
      success: true,
      originalUrl: decodedLink,
      finalUrl: result.finalUrl,
      redirectChain: result.redirectChain,
      redirectCount: result.redirectChain ? result.redirectChain.length - 1 : 0,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error.",
      },
      { status: 500 },
    )
  }
}
