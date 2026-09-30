import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionHeading, ImagePlaceholder, ArrowLink } from "@/components/etherial";
import { SERVICE_SILOS, SILO_KEYS } from "@/lib/service-silos";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Etherial Interiors, Dubai" },
      {
        name: "description",
        content:
          "Explore five service collections: custom wardrobes, bespoke joinery, media storage, kitchen and laundry, and cabinets and vanities in Dubai.",
      },
      { property: "og:title", content: "Portfolio — Etherial Interiors, Dubai" },
      {
        property: "og:description",
        content: "Explore Etherial Interiors' five bespoke joinery service collections in Dubai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

const CATEGORIES = SILO_KEYS.map((slug) => ({ slug, ...SERVICE_SILOS[slug] }));

function PortfolioPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
       <SectionHeading as="h1" eyebrow="Portfolio" title="Explore our craftsmanship">
         Explore five areas of bespoke joinery. Project photography will be added as it becomes available.
      </SectionHeading>
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {CATEGORIES.map((cat, i) => (
          <Link
            key={cat.slug}
            to="/$section"
            params={{ section: cat.slug }}
            className={`group block ${i % 3 === 0 ? "md:-mt-4" : ""}`}
          >
            <ImagePlaceholder label={`${cat.name} — featured project photo (client to supply)`} />
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-ink">{cat.name}</h2>
                <p className="mt-1 text-[15px] text-muted-foreground">{cat.intro}</p>
              </div>
              <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-brass transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-16 text-center">
        <ArrowLink to="/contact">Start your own project</ArrowLink>
      </div>
    </div>
  );
}
