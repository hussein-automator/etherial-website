import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionHeading, ImagePlaceholder, ArrowLink } from "@/components/etherial";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Etherial Interiors, Dubai" },
      {
        name: "description",
        content:
          "Explore Etherial Interiors' fitted closets, kitchens, living spaces, wardrobes and bespoke joinery projects across Dubai.",
      },
      { property: "og:title", content: "Portfolio — Etherial Interiors, Dubai" },
      {
        property: "og:description",
        content: "Fitted closets, kitchens, living spaces and bespoke joinery built in Dubai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

const CATEGORIES = [
  {
    slug: "closets",
    name: "Fitted Closets",
    blurb: "Floor-to-ceiling storage shaped around your wardrobe and your walls.",
  },
  {
    slug: "kitchens",
    name: "Kitchens",
    blurb: "Made-to-measure cabinetry, worktops and pantries, built for daily life.",
  },
  {
    slug: "living",
    name: "Living Spaces",
    blurb: "Media walls, shelving and storage that disappear into the room.",
  },
  {
    slug: "wardrobes",
    name: "Wardrobes",
    blurb: "Sliding, hinged and walk-in wardrobes with interiors that fit how you dress.",
  },
  {
    slug: "bespoke",
    name: "Bespoke Joinery",
    blurb: "Home offices, pantries and one-off pieces — if you can draw it, we can build it.",
  },
];

function PortfolioPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading eyebrow="Portfolio" title="Work we're proud to sign">
        Every project below was designed, built and installed by our own team in Dubai. Full
        photography is being added — each frame is a labeled placeholder for real project images.
      </SectionHeading>
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {CATEGORIES.map((cat, i) => (
          <Link
            key={cat.slug}
            to="/portfolio/$category"
            params={{ category: cat.slug }}
            className={`group block ${i % 3 === 0 ? "md:-mt-4" : ""}`}
          >
            <ImagePlaceholder label={`${cat.name} — featured project photo (client to supply)`} />
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-ink">{cat.name}</h2>
                <p className="mt-1 text-[15px] text-muted-foreground">{cat.blurb}</p>
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
