import { createFileRoute, notFound } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-pages";
import { getService, isSiloSlug } from "@/lib/service-silos";

export const Route = createFileRoute("/$section/$service")({
  beforeLoad: ({ params }) => { if (!getService(params.section, params.service)) throw notFound(); },
  head: ({ params }) => {
    const service = getService(params.section, params.service);
    const title = `${service?.title ?? "Service unavailable"} — Etherial Interiors`;
    const description = service?.intro ?? "Explore bespoke fitted joinery in Dubai.";
    const url = `/${params.section}/${params.service}`;
    return { scripts: service ? [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "Service", name: service.name,
      description: service.intro, provider: { "@type": "HomeAndConstructionBusiness", name: "Etherial Interiors" },
      areaServed: { "@type": "Place", name: "Dubai, UAE" },
    }) }] : [], meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ], links: [{ rel: "canonical", href: url }] };
  },
  component: () => {
    const { section, service } = Route.useParams();
    return isSiloSlug(section) && getService(section, service) ? <ServicePage section={section} service={service} /> : null;
  },
});