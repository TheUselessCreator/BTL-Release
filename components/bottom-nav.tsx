import Link from "next/link"
import { Home, Bot, FileText, Shield, Activity, Users } from "lucide-react"

export function BottomNav() {
  return (
    <nav className="fixed top-4 left-1/2 z-40 -translate-x-1/2">
      <div className="rounded-2xl border-2 border-border/50 bg-background/80 px-6 py-3 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-accent/10 hover:text-accent"
          >
            <Home className="h-5 w-5" />
            <span className="whitespace-nowrap">Home</span>
          </Link>
          <Link
            href="https://discord.com/oauth2/authorize?client_id=1431425906550771754&permissions=2048&integration_type=0&scope=bot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-primary/10 hover:text-primary"
          >
            <Bot className="h-5 w-5" />
            <span className="whitespace-nowrap">Discord Bot</span>
          </Link>
          <Link
            href="https://discord.gg/NryTTu9xZQ"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-accent/10 hover:text-accent"
          >
            <Users className="h-5 w-5" />
            <span className="whitespace-nowrap">Server</span>
          </Link>
          <Link
            href="/status"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-accent/10 hover:text-accent"
          >
            <Activity className="h-5 w-5" />
            <span className="whitespace-nowrap">Status</span>
          </Link>
          <Link
            href="/terms"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-accent/10 hover:text-accent"
          >
            <FileText className="h-5 w-5" />
            <span className="whitespace-nowrap">Terms</span>
          </Link>
          <Link
            href="/privacy"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-accent/10 hover:text-primary"
          >
            <Shield className="h-5 w-5" />
            <span className="whitespace-nowrap">Privacy</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
