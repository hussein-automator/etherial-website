import { createFileRoute } from "@tanstack/react-router";
import { CONTACT } from "@/components/etherial";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({ meta: [
    { title: "Terms & Conditions — Etherial Interiors" },
    { name: "description", content: "Website terms information for Etherial Interiors in Dubai." },
    { property: "og:title", content: "Terms & Conditions — Etherial Interiors" },
    { property: "og:description", content: "Website terms information for Etherial Interiors in Dubai." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Terms,
});
function Terms() { return <main className="mx-auto max-w-3xl px-5 py-20 text-[15px] leading-relaxed text-muted-foreground"><p className="text-xs uppercase tracking-widest text-brass">Legal</p><h1 className="font-display mt-3 text-5xl text-ink">Terms &amp; conditions</h1><p className="mt-6 border-l-2 border-brass pl-4">Draft information pending review by Etherial Interiors. Please contact us for the current official terms before commissioning work.</p><h2 className="font-display mt-10 text-2xl text-ink">Website enquiries</h2><p className="mt-3">Submitting an enquiry does not constitute an order or a binding quotation. Project scope, pricing, timelines, payment arrangements and warranty coverage should be confirmed directly with Etherial Interiors in writing before work begins.</p><h2 className="font-display mt-8 text-2xl text-ink">Website content</h2><p className="mt-3">Concept imagery is illustrative and not a photograph of completed client work. Please confirm product specifications and availability with our team.</p><h2 className="font-display mt-8 text-2xl text-ink">Contact</h2><p className="mt-3">Questions about these terms? Email <a className="u-reveal text-ink" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p></main> }
