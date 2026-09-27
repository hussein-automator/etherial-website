import { createFileRoute, notFound } from "@tanstack/react-router";
import { ImagePlaceholder, ArrowLink } from "@/components/etherial";

const CATEGORIES: Record<string, { name: string; intro: string }> = {
  closets: {
    name: "Fitted Closets",
    intro:
      "Floor-to-ceiling fitted closets designed around your wardrobe, your walls and the way you start your day.",
  },
  kitchens: {
    name: "Kitchens",
    intro:
      "Made-to-measure kitchens and pantries — cabinetry, worktops and storage built for real daily cooking.",
  },
  pantry: {
    name: "Pantry",
    intro: "Made-to-measure pantry storage planned around your kitchen and the way you use it.",
  },
  living: {
    name: "Living Spaces",
    intro:
      "Media walls, bookcases and concealed storage that settle into the room as if they were always there.",
  },
  wardrobes: {
    name: "Wardrobes",
    intro:
      "Sliding, hinged and walk-in wardrobes with interiors arranged around how you actually dress.",
  },
  bespoke: {
    name: "Bespoke Joinery",
    intro:
      "Home offices, pantries, vanities and one-off pieces — if you can describe it, our workshop can build it.",
  },
};

export const Route = createFileRoute("/portfolio/$category")({
  beforeLoad: ({ params }) => {
    if (!CATEGORIES[params.category]) throw notFound();
  },
  head: ({ params }) => {
    const cat = CATEGORIES[params.category];
    return {
      meta: [
        { title: `${cat?.name ?? "Portfolio"} — Etherial Interiors, Dubai` },
        { name: "description", content: cat?.intro ?? "Bespoke joinery by Etherial Interiors, Dubai." },
        { property: "og:title", content: `${cat?.name ?? "Portfolio"} — Etherial Interiors` },
        { property: "og:description", content: cat?.intro ?? "" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const cat = CATEGORIES[category];
  if (!cat) return null;

  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <p className="text-center text-[12px] font-medium uppercase tracking-[0.22em] text-brass">
        Portfolio
      </p>
      <h1 className="font-display mt-3 text-center text-5xl text-ink">{cat.name}</h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-muted-foreground">
        {cat.intro}
      </p>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ImagePlaceholder
            key={i}
            tall={i % 2 === 0}
            label={`${cat.name} project ${i + 1} — photo (client to supply)`}
          />
        ))}
      </div>
      <div className="mt-16 text-center">
        <ArrowLink to="/contact">Request a quote for your {cat.name.toLowerCase()}</ArrowLink>
      </div>
    </div>
  );
}
