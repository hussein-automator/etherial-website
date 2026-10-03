import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { recommendOutfit } from "@/lib/stylist.functions";
import { SectionHeading, ArrowLink } from "@/components/etherial";

export const Route = createFileRoute("/stylist")({
  head: () => ({
    meta: [
      { title: "Wardrobe Stylist — Etherial Interiors, Dubai" },
      { name: "description", content: "Describe an occasion and the pieces in your wardrobe — get a personalised outfit suggestion from the Etherial stylist." },
      { property: "og:title", content: "Wardrobe Stylist — Etherial Interiors" },
      { property: "og:description", content: "Personalised outfit suggestions from the clothes you already own." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StylistPage,
});

function StylistPage() {
  const ask = useServerFn(recommendOutfit);
  const [occasion, setOccasion] = useState("");
  const [wardrobe, setWardrobe] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (occasion.trim().length < 3 || wardrobe.trim().length < 3) {
      setError("Please describe the occasion and a few wardrobe items.");
      return;
    }
    setLoading(true); setError(""); setResult("");
    try {
      const language = document.documentElement.lang === "ar" ? "ar" : "en";
      const res = await ask({ data: { occasion, wardrobe, language } });
      if (res.ok) setResult(res.text); else setError(res.error);
    } catch {
      setError("We couldn't create a recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const field = "w-full rounded-[18px_6px_18px_6px] border border-rule bg-background px-4 py-3 text-[15px] text-ink outline-none focus:border-brass";

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2">
      <section>
        <SectionHeading as="h1" eyebrow="Wardrobe stylist" title="What should I wear?">
          Describe the occasion and the pieces hanging in your wardrobe — our stylist will suggest an outfit from what you already own.
        </SectionHeading>
        <form onSubmit={onSubmit} className="mt-10 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-ink">The occasion</span>
            <input className={field} value={occasion} maxLength={500} onChange={(e) => setOccasion(e.target.value)} placeholder="e.g. Evening wedding reception in Jumeirah" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-ink">Items in your wardrobe</span>
            <textarea className={`${field} min-h-40`} value={wardrobe} maxLength={2000} onChange={(e) => setWardrobe(e.target.value)} placeholder="e.g. navy linen suit, white shirt, tan loafers, silk scarf, gold watch" />
          </label>
          <button type="submit" disabled={loading} className="btn-liquid inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60">
            {loading ? "Styling…" : "Suggest an outfit"}
          </button>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        </form>
      </section>
      <section aria-live="polite" className="rounded-[32px_10px_32px_10px] border border-rule bg-linen-alt p-8">
        <p className="text-xs uppercase tracking-widest text-brass">Your recommendation</p>
        {result ? (
          <div className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-ink" data-no-translate>{result}</div>
        ) : (
          <p className="mt-4 text-[15px] text-muted-foreground">{loading ? "Putting your look together…" : "Your personalised outfit will appear here."}</p>
        )}
        <div className="mt-10 border-t border-rule pt-6">
          <p className="text-sm text-muted-foreground">Want a wardrobe that keeps every piece in view?</p>
          <div className="mt-2"><ArrowLink to="/custom-wardrobes-closets-dubai">Explore our wardrobes</ArrowLink></div>
        </div>
      </section>
    </div>
  );
}
