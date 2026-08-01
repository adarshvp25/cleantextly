"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

import { siteConfig } from "@/lib/site"
import { Button } from "@/components/ui/button"
import { NavLink } from "@/components/layout/navbar/nav-link"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X /> : <Menu />}
      </Button>

      {open && (
        <nav
          aria-label="Mobile"
          className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-border bg-background px-4 py-3"
        >
          {siteConfig.navLinks.map((link) => (
            <NavLink
              key={link.href}
              link={link}
              onNavigate={() => setOpen(false)}
              className="py-2 text-sm"
            />
          ))}
        </nav>
      )}
    </div>
  )
}
