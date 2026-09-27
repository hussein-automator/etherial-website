import { createFileRoute } from "@tanstack/react-router";
import { CONTACT } from "@/components/etherial";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [
    { title: "Privacy Policy — Etherial Interiors" },
    { name: "description", content: "Information about how Etherial Interiors handles contact and newsletter details on this website." },
    { property: "og:title", content: "Privacy Policy — Etherial Interiors" },
    { property: "og:description", content: "How contact and newsletter details are handled on the Etherial Interiors website." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Privacy,
});
function Privacy() { return <main className="mx-auto max-w-3xl px-5 py-20 text-[15px] leading-relaxed text-muted-foreground"><p className="text-xs uppercase tracking-widest text-brass">Legal</p><h1 className="font-display mt-3 text-5xl text-ink">Privacy policy</h1><p className="mt-6 border-l-2 border-brass pl-4">Draft information pending review by Etherial Interiors. Please contact us for the current official policy.</p><h2 className="font-display mt-10 text-2xl text-ink">Information you provide</h2><p className="mt-3">The quote form asks for your name, email, phone number and project details. The newsletter form asks for your email address. Form entries are saved in your browser on this device; if a submission service is configured, they may also be sent to that service.</p><h2 className="font-display mt-8 text-2xl text-ink">Your choices</h2><p className="mt-3">You can clear stored form entries using your browser’s site-data controls. To ask about your information or newsletter subscription, write to <a className="u-reveal text-ink" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p></main> }
