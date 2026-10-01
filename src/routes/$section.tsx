import { createFileRoute, notFound } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-pages";
import { SERVICE_SILOS, isSiloSlug } from "@/lib/service-silos";

export const Route = createFileRoute("/$section")({
  beforeLoad: ({ params }) => { if (!isSiloSlug(params.section)) throw notFound(); },
  head: ({ params }) => {
    const silo = isSiloSlug(params.section) ? SERVICE_SILOS[params.section] : undefined;
    const title = `${silo?.title ?? "Service unavailable"} — Etherial Interiors`;
    const description = silo?.intro ?? "Explore bespoke fitted joinery in Dubai.";
    const url = `/${params.section}`;
    return { scripts: silo ? [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "Service", name: silo.name,
      description: silo.intro, provider: { "@type": "HomeAndConstructionBusiness", name: "Etherial Interiors" },
      areaServed: { "@type": "Place", name: "Dubai, UAE" },
    }) }] : [], meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ], links: [{ rel: "canonical", href: url }] };
  },
  component: () => {
    const { section } = Route.useParams();
    return isSiloSlug(section) ? <ServicePage section={section} /> : null;
  },
});