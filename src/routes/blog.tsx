import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SectionHeading, ImagePlaceholder, ArrowLink } from "@/components/etherial";
import { fetchPosts } from "@/lib/wix";

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
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const { data: live = [] } = useQuery({ queryKey: ["wix-posts"], queryFn: fetchPosts, enabled: ready, retry: false });
  const posts = live.length
    ? live.map((p) => ({ key: p.id, title: p.title, excerpt: p.excerpt ?? "", date: p.date ?? "", cover: p.cover }))
    : POSTS.map((p) => ({ key: p.title, ...p, cover: undefined as string | undefined }));
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading as="h1" eyebrow="Journal" title="Notes from the workshop">
        Occasional writing on joinery, materials and making the most of Dubai homes. 
      </SectionHeading>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.key} className="flex flex-col">
            {post.cover ? (
              <img src={post.cover} alt={post.title} loading="lazy" className="frame-fold aspect-[4/3] w-full rounded-[48px_6px_48px_6px] object-cover" />
            ) : (
              <ImagePlaceholder label="Article cover image (client to supply)" />
            )}
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
