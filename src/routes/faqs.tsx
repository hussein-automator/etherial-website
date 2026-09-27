import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLink } from "@/components/etherial";

export const Route = createFileRoute("/faqs")({
  head: () => ({ meta: [
    { title: "FAQs — Etherial Interiors, Dubai" },
    { name: "description", content: "Answers to common questions about Etherial Interiors' bespoke fitted joinery in Dubai." },
    { property: "og:title", content: "FAQs — Etherial Interiors" },
    { property: "og:description", content: "Common questions about bespoke fitted closets, kitchens and joinery in Dubai." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: FAQs,
});
const items = [
  { q: "What can you make?", a: "We design and build fitted closets, kitchens, wardrobes, living-room joinery, pantries and other made-to-measure pieces." },
  { q: "Where are you based?", a: "Our workshop is in Umm Ramool, Dubai, UAE." },
  { q: "How do I request an estimate?", a: "Use our contact form to tell us about your space, or reach us by phone or email. We'll discuss the scope with you before confirming any quote." },
  { q: "Do you offer a warranty?", a: "Our builds come with a 10-year warranty. Ask our team for the applicable terms for your project." },
];
function FAQs() { return <main className="mx-auto max-w-3xl px-5 py-20"><p className="text-xs uppercase tracking-widest text-brass">Company</p><h1 className="font-display mt-3 text-5xl text-ink">Frequently asked questions</h1><Accordion type="single" collapsible className="mt-10">{items.map((item, i) => <AccordionItem key={item.q} value={`item-${i}`}><AccordionTrigger className="text-left text-ink">{item.q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{item.a}</AccordionContent></AccordionItem>)}</Accordion><div className="mt-10"><ArrowLink to="/contact">Ask us a question</ArrowLink></div></main> }
