"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import type { NavLink as NavLinkType } from "@/lib/site"
import { cn } from "@/lib/utils"

type NavLinkProps = {
  link: NavLinkType
  onNavigate?: () => void
  className?: string
}

export function NavLink({ link, onNavigate, className }: NavLinkProps) {
  const pathname = usePathname()

  if (link.disabled) {
    return (
      <span
        role="link"
        aria-disabled="true"
        tabIndex={-1}
        title="Coming Soon"
        className={cn(
          "cursor-not-allowed text-muted-foreground/50 select-none",
          className
        )}
      >
        {link.label}
      </span>
    )
  }

  const isActive = pathname === link.href

  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
        isActive ? "text-foreground font-medium" : "text-muted-foreground",
        className
      )}
    >
      {link.label}
    </Link>
  )
}
