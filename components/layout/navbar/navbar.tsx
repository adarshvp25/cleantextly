import { siteConfig } from "@/lib/site"
import { Logo } from "@/components/layout/navbar/logo"
import { NavLink } from "@/components/layout/navbar/nav-link"
import { MobileNav } from "@/components/layout/navbar/mobile-nav"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Logo />

        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-6 text-sm">
          {siteConfig.navLinks.map((link) => (
            <NavLink key={link.href} link={link} />
          ))}
        </nav>

        <MobileNav />
      </div>
    </header>
  )
}
