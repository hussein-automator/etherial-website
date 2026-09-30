import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

const LEGACY: Record<string, string> = {
  closets: "custom-wardrobes-closets-dubai", wardrobes: "custom-wardrobes-closets-dubai",
  kitchens: "kitchen-laundry-renovations", pantry: "kitchen-laundry-renovations",
  living: "living-media-storage", bespoke: "bespoke-joinery-dubai",
};

export const Route = createFileRoute("/portfolio/$category")({
  beforeLoad: ({ params }) => {
    const section = LEGACY[params.category];
    if (!section) throw notFound();
    throw redirect({ href: `/${section}`, statusCode: 301 });
  },
  head: ({ params }) => {
    const section = LEGACY[params.category];
    return {
      meta: [
        { title: "Portfolio category moved — Etherial Interiors" },
        { name: "description", content: "This portfolio category has moved to our service collection." },
        { property: "og:title", content: "Portfolio category moved — Etherial Interiors" },
        { property: "og:description", content: "Browse our service collections." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: section ? [{ rel: "canonical", href: `/${section}` }] : [],
    };
  },
  component: () => null,
});
