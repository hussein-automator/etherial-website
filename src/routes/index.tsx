import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HeroSlideshow } from "@/components/hero-slideshow";
import {
  SectionHeading,
  ImagePlaceholder,
  Stars,
  ArrowLink,
  CONTACT,
} from "@/components/etherial";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Etherial Interiors — Bespoke Fitted Closets & Kitchens, Dubai" },
      {
        name: "description",
        content:
          "Bespoke fitted closets, kitchens and living spaces designed and built in Dubai. 4.9/5 rated, 500+ fit-outs, 10-year warranty, 14-day average turnaround.",
      },
      { property: "og:title", content: "Etherial Interiors — Bespoke Fitted Joinery, Dubai" },
      {
        property: "og:description",
        content: "Bespoke fitted closets, kitchens and living spaces, designed and built in Dubai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const CATEGORIES = [
  { slug: "closets", name: "Fitted Closets" },
  { slug: "kitchens", name: "Kitchens" },
  { slug: "living", name: "Living Spaces" },
  { slug: "wardrobes", name: "Wardrobes" },
  { slug: "bespoke", name: "Bespoke Joinery" },
];

const STATS = [
  { value: "500+", label: "Fit-outs completed" },
  { value: "14 days", label: "Average turnaround" },
  { value: "10 years", label: "Warranty on every build" },
  { value: "99.4%", label: "On-time installation" },
];

// PLACEHOLDER testimonials — replace with real client reviews
const TESTIMONIALS = [
  {
    quote:
      "Placeholder review — replace with a real client testimonial about their fitted closet project.",
    name: "Client name",
    project: "Fitted closet, Dubai",
  },
  {
    quote:
      "Placeholder review — replace with a real client testimonial about their kitchen renovation.",
    name: "Client name",
    project: "Kitchen, Dubai",
  },
  {
    quote:
      "Placeholder review — replace with a real client testimonial about their living space joinery.",
    name: "Client name",
    project: "Living space, Dubai",
  },
];

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
        <div className="fade-in-slow">
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-brass">
            Bespoke fitted joinery · Dubai
          </p>
          <h1 className="font-display mt-4 text-5xl leading-[1.05] text-ink md:text-6xl">
            Interiors made to measure, built to last.
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Etherial Interiors designs and builds fitted closets, kitchens and living spaces —
            measured to your home, crafted in our workshop, installed in as little as 14 days.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              to="/contact"
              className="btn-liquid inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.12em] text-primary-foreground"
            >
              Start your project <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Stars />
              <span>
                <strong className="font-semibold text-ink">4.9/5</strong> from 200+ local clients
              </span>
            </div>
          </div>
        </div>
        <HeroSlideshow />
      </section>

      {/* Why Etherial */}
      <section className="bg-linen py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow="Why Etherial" title="Craftsmanship without the wait">
            Every piece is designed around your rooms and your routines — then built in our own
            Dubai workshop, so nothing is lost between the drawing and the installation.
          </SectionHeading>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Designed around you",
                body: "A designer visits your home, measures every millimetre, and draws joinery that fits your space — not a catalogue.",
              },
              {
                title: "Built in our workshop",
                body: "We manufacture everything ourselves in Dubai. No middlemen, no shipping delays, no surprises on quality.",
              },
              {
                title: "Installed in 14 days",
                body: "From sign-off to final fitting in about two weeks, backed by a 10-year warranty on every build.",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-rule pt-6">
                <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work preview */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading eyebrow="Our work" title="Five crafts, one standard" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              to="/portfolio/$category"
              params={{ category: cat.slug }}
              className={`group block ${i === 0 ? "sm:col-span-2 lg:col-span-1 lg:-mt-6" : ""}`}
            >
              <ImagePlaceholder label={`${cat.name} — project photo (client to supply)`} />
              <div className="mt-4 flex items-center justify-between">
                <h3 className="font-display text-xl text-ink">{cat.name}</h3>
                <ArrowRight className="h-4 w-4 text-brass transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
          <div className="frame-fold flex items-center justify-center rounded-[48px_6px_48px_6px] border border-rule bg-linen-alt p-10 text-center">
            <div>
              <p className="font-display text-2xl text-ink">Have a space in mind?</p>
              <div className="mt-4">
                <ArrowLink to="/contact">Tell us about it</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stat band */}
      <section className="bg-ink-deep py-16 text-linen">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 text-center sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl text-brass md:text-5xl">{s.value}</p>
              <p className="mt-2 text-[13px] uppercase tracking-[0.14em] text-linen/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading eyebrow="How it works" title="From first sketch to final fitting" />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Tell us about your space",
              body: "Send a few details through our quote form — it takes two minutes.",
            },
            {
              step: "02",
              title: "Estimate within 2 hours",
              body: "We reply with a tailored price scope by email, usually the same day.",
            },
            {
              step: "03",
              title: "Design, build, install",
              body: "We measure, craft and fit your joinery — typically within 14 days of sign-off.",
            },
          ].map((p) => (
            <div key={p.step} className="relative border-t border-rule pt-6">
              <span className="font-display text-5xl text-rule">{p.step}</span>
              <h3 className="font-display mt-2 text-2xl text-ink">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="btn-liquid inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.12em] text-primary-foreground"
          >
            Get your estimate <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-linen py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow="Client words" title="Five stars, every time" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={i}
                className="frame-fold rounded-[48px_6px_48px_6px] border border-rule bg-linen-alt p-8"
              >
                <Stars />
                <blockquote className="mt-4 text-[15px] leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm text-muted-foreground">
                  <span className="font-medium text-ink">{t.name}</span> — {t.project}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href={CONTACT.googleReviewUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-liquid inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.12em] text-primary-foreground"
            >
              Rate us on Google
            </a>
            <p className="mt-3 text-xs text-muted-foreground">
              Placeholder link — the client's Google review URL will be added here.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
