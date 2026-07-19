const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://allankirsten.com";

/** Person structured data, shared by home and /about. */
export default function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Allan Kirsten",
    url: SITE,
    image: `${SITE}/images/allan-portrait.jpg`,
    jobTitle: "Product & Design Leader",
    description:
      "Product and design leader. Ten years building product for startups, twenty-three in the career. Works at the intersection of design, product, business, data and execution.",
    email: "mailto:allankirsten@gmail.com",
    sameAs: ["https://www.linkedin.com/in/allankirsten"],
    worksFor: {
      "@type": "Organization",
      name: "Bipa",
    },
    nationality: {
      "@type": "Country",
      name: "Brazil",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
