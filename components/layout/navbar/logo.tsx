import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/logo.png"
        alt="CleanTextly"
        width={1774}
        height={887}
        priority
        className="h-10 w-auto md:h-12"
      />
    </Link>
  )
}
