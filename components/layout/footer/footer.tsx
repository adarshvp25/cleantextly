import { Logo } from "@/components/layout/navbar/logo"
import { NavLink } from "@/components/layout/navbar/nav-link"
import { footerDescription, footerLinkGroups } from "@/lib/site"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              {footerDescription}
            </p>
          </div>

          <nav aria-label="Footer" className="contents">
            {footerLinkGroups.map((group) => (
              <div key={group.heading} className="flex flex-col gap-4">
                <h2 className="text-sm font-semibold text-foreground">
                  {group.heading}
                </h2>
                <ul className="flex flex-col gap-3 text-sm">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <NavLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 border-t border-border pt-8 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <p>© {year} CleanTextly. All rights reserved.</p>
          <p>Built for developers, writers, students, and professionals.</p>
        </div>
      </div>
    </footer>
  )
}
