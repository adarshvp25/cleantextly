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
    { label: "Tools", href: "/tools" },
    { label: "Categories", href: "/categories" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact", disabled: true },
  ] satisfies NavLink[],
}

// Shared Open Graph / Twitter image, spread into both the root layout's
// default metadata and any page (like the homepage) that defines its own
// openGraph/twitter object, since Next.js metadata merging replaces those
// nested objects wholesale rather than deep-merging them.
export const ogImage = {
  url: "/og-image.png",
  width: 1734,
  height: 907,
  alt: "CleanTextly — Free Online Text Tools",
}
