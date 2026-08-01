export type NavLink = {
  label: string
  href: string
  disabled?: boolean
}

export const siteConfig = {
  name: "CleanTextly",
  description: "Fast browser-based text utilities.",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools", disabled: true },
    { label: "Categories", href: "/categories", disabled: true },
    { label: "About", href: "/about", disabled: true },
    { label: "Contact", href: "/contact", disabled: true },
  ] satisfies NavLink[],
}
