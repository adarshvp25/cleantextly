import Link from "next/link"

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="CleanTextly"
      className="flex items-center text-2xl font-bold tracking-tight md:text-3xl"
    >
      <span className="text-[#0F172A]">Clean</span>
      <span className="bg-linear-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
        Textly
      </span>
    </Link>
  )
}
