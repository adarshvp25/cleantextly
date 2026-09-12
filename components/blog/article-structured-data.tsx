const baseUrl = "https://cleantextly.com"

export function ArticleStructuredData({
  headline,
  description,
  path,
  datePublished,
}: {
  headline: string
  description: string
  path: string
  datePublished: string
}) {
  const url = `${baseUrl}${path}`

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    datePublished,
    author: { "@type": "Organization", name: "CleanTextly" },
    publisher: { "@type": "Organization", name: "CleanTextly" },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
      { "@type": "ListItem", position: 3, name: headline, item: url },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  )
}
