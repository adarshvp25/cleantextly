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
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
}

export type FooterLinkGroup = {
  heading: string
  links: NavLink[]
}

export const footerDescription =
  "Free online text tools for cleaning, formatting, converting, and transforming text directly in your browser."

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    heading: "Tools",
    links: [
      { label: "All Tools", href: "/tools" },
      { label: "Categories", href: "/categories" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
]

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
