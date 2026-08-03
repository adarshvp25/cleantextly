import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CleanTextly",
    short_name: "CleanTextly",
    description:
      "Free online text tools for formatting, cleaning, converting, sorting, counting, and transforming text instantly.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    // Matches --background / --primary from app/globals.css (light theme).
    background_color: "#ffffff",
    theme_color: "#171717",
    orientation: "portrait",
    categories: ["productivity", "utilities", "developer"],
    lang: "en",
    // Only the existing favicon is referenced here — no dedicated
    // 192x192/512x512 PNG app icons exist yet. Once real icon files are
    // added to public/ (e.g. icon-192.png, icon-512.png), append entries
    // to this array; nothing else in the manifest needs to change.
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
