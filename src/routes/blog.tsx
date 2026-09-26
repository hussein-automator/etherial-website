import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading, ImagePlaceholder, ArrowLink } from "@/components/etherial";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Etherial Interiors, Dubai" },
      {
        name: "description",
        content:
          "Notes on bespoke joinery, fitted storage and interior craftsmanship from the Etherial Interiors workshop in Dubai.",
      },
      { property: "og:title", content: "Journal — Etherial Interiors, Dubai" },
      {
        property: "og:description",
        content: "Notes on bespoke joinery and interior craftsmanship from our Dubai workshop.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

// PLACEHOLDER articles — replace with real posts
const POSTS = [
  {
    title: "Placeholder article — how to plan a fitted closet",
    excerpt: "A short placeholder excerpt. Replace with a real article about planning fitted storage.",
    date: "Coming soon",
  },
  {
    title: "Placeholder article — choosing kitchen materials for Dubai's climate",
    excerpt: "A short placeholder excerpt. Replace with a real article about materials and finishes.",
    date: "Coming soon",
  },
  {
    title: "Placeholder article — what a 14-day fit-out actually looks like",
    excerpt: "A short placeholder excerpt. Replace with a real article about our installation process.",
    date: "Coming soon",
  },
];

function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading eyebrow="Journal" title="Notes from the workshop">
        Occasional writing on joinery, materials and making the most of Dubai homes. Articles are
        on their way — the cards below are placeholders.
      </SectionHeading>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {POSTS.map((post) => (
          <article key={post.title} className="flex flex-col">
            <ImagePlaceholder label="Article cover image (client to supply)" />
            <p className="mt-4 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
              {post.date}
            </p>
            <h2 className="font-display mt-2 text-2xl leading-snug text-ink">{post.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{post.excerpt}</p>
          </article>
        ))}
      </div>
      <div className="mt-16 text-center">
        <ArrowLink to="/contact">Ask us a question instead</ArrowLink>
      </div>
    </div>
  );
}
