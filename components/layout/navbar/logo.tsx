import Link from "next/link"

import { siteConfig } from "@/lib/site"

export function Logo() {
  return (
    <Link
      href="/"
      className="text-lg font-semibold tracking-tight text-foreground"
    >
      {siteConfig.name}
    </Link>
  )
}
