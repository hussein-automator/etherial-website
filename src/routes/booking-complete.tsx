import { createFileRoute } from "@tanstack/react-router";
import { ArrowLink } from "@/components/etherial";

export const Route = createFileRoute("/booking-complete")({
  head: () => ({
    meta: [
      { title: "Booking received — Etherial Interiors" },
      { name: "description", content: "Your consultation with Etherial Interiors is booked. We look forward to meeting you." },
      { property: "og:title", content: "Booking received — Etherial Interiors" },
      { property: "og:description", content: "Your design consultation with Etherial Interiors in Dubai." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookingComplete,
});

function BookingComplete() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-brass">Consultation</p>
      <h1 className="font-display mt-3 text-5xl text-ink">Thank you — see you soon.</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
        Your booking confirmation is on its way to your inbox. If you need to change the time, just reply to that email.
      </p>
      <div className="mt-10">
        <ArrowLink to="/portfolio">Browse our work while you wait</ArrowLink>
      </div>
    </div>
  );
}
