import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading, ImagePlaceholder, ArrowLink } from "@/components/etherial";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Etherial Interiors, Dubai" },
      {
        name: "description",
        content:
          "Etherial Interiors is a Dubai workshop designing and building bespoke fitted closets, kitchens and living spaces — with a 10-year warranty on every build.",
      },
      { property: "og:title", content: "About — Etherial Interiors, Dubai" },
      {
        property: "og:description",
        content: "A Dubai workshop for bespoke fitted joinery, from design to installation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-brass">About us</p>
          <h1 className="font-display mt-4 text-5xl leading-tight text-ink">
            A workshop, not a showroom.
          </h1>
          <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
            Etherial Interiors began with a simple frustration: beautiful joinery in Dubai took too
            long, cost too much, and too often arrived as a compromise. So we built our own
            workshop in Umm Ramool and kept everything — design, manufacture, installation — under
            one roof.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Today we've completed more than 500 fit-outs across the city, each one measured,
            crafted and installed by our own team, and each one covered by a 10-year warranty.
          </p>
          <div className="mt-8">
            <ArrowLink to="/contact">Work with us</ArrowLink>
          </div>
        </div>
        <ImagePlaceholder
          label="Workshop or team photograph (client to supply)"
          tall
          className="frame-fold-large rounded-[120px_6px_120px_6px]"
        />
      </section>

      <section className="bg-linen py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow="What we stand by" title="Three promises, kept daily" />
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Honest timelines",
                body: "We quote a date and we keep it — 99.4% of our installations finish on time.",
              },
              {
                title: "Materials we'd use at home",
                body: "Boards, hardware and finishes chosen for Dubai's climate and for decades of daily use.",
              },
              {
                title: "One team, start to finish",
                body: "The people who measure your home are the people who build and fit your joinery.",
              },
            ].map((v) => (
              <div key={v.title} className="border-t border-rule pt-6">
                <h3 className="font-display text-2xl text-ink">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
