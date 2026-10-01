import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { Menu, X, Star, ArrowRight, ChevronDown, Instagram, Facebook, Music2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { submitWixForm } from "@/lib/wix";
import { WIX_NEWSLETTER_FORM_ID } from "@/lib/wix-config";
import { SERVICE_SILOS, SILO_KEYS } from "@/lib/service-silos";

export const CONTACT = {
  phone: "+971 56 201 5550",
  email: "info@etherial.ae",
  address: "Umm Ramool, Dubai, UAE",
  hours: "Mon–Fri 9:00–18:00 · Sat 9:00–19:00",
  // PLACEHOLDER — replace with the client's real Google review URL
  googleReviewUrl: "#google-review-url-placeholder",
};

const SOCIALS = [
  { name: "Instagram", Icon: Instagram, url: "" },
  { name: "Facebook", Icon: Facebook, url: "" },
  { name: "TikTok", Icon: Music2, url: "" },
];

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-2xl tracking-wide ${className}`}>
      ETHERIAL<span className="text-brass">.</span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-linen-alt/90 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <Link to="/" aria-label="Etherial Interiors home">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-6 py-3 lg:flex" aria-label="Primary">
          <Link to="/" data-active={pathname === "/"} className="u-reveal text-xs font-medium uppercase text-ink">Home</Link>
          <div className="group relative flex items-center" onKeyDown={(e) => { if (e.key === "Escape") (e.currentTarget.querySelector("a") as HTMLElement | null)?.focus(); }}>
            <Link to="/portfolio" data-active={pathname === "/portfolio" || SILO_KEYS.some((slug) => pathname.startsWith(`/${slug}`))} aria-haspopup="true" className="u-reveal text-xs font-medium uppercase text-ink">Portfolio</Link>
            <ChevronDown className="ml-1 h-3.5 w-3.5 text-ink" aria-hidden="true" />
            <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-1 pt-4 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="border border-rule bg-linen-alt p-2 shadow-lg">
                {SILO_KEYS.map((slug) => <Link key={slug} to="/$section" params={{ section: slug }} className="block px-4 py-3 text-xs font-medium uppercase text-ink focus:bg-linen hover:bg-linen">{SERVICE_SILOS[slug].name}</Link>)}
                <div className="border-t border-rule"><Link to="/portfolio" className="block px-4 py-3 text-xs font-medium uppercase text-ink focus:bg-linen hover:bg-linen">All projects</Link></div>
              </div>
            </div>
          </div>
          <Link to="/about" data-active={pathname === "/about"} className="u-reveal text-xs font-medium uppercase text-ink">About</Link>
          <Link to="/blog" data-active={pathname === "/blog"} className="u-reveal text-xs font-medium uppercase text-ink">Blog</Link>
          <Link to="/contact" data-active={pathname === "/contact"} className="u-reveal text-xs font-medium uppercase text-ink">Contact</Link>
        </nav>
        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="btn-liquid inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.12em] text-primary-foreground"
          >
            Get a quote
          </Link>
        </div>
        <Button
          variant="ghost" size="icon" className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      {open && (
        <nav className="border-t border-rule bg-linen-alt px-5 py-4 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-4">
            <li><Link to="/" onClick={() => setOpen(false)} className="text-sm font-medium uppercase text-ink">Home</Link></li>
            <li>
              <div className="flex items-center justify-between">
                <Link to="/portfolio" onClick={() => setOpen(false)} className="text-sm font-medium uppercase text-ink">Portfolio</Link>
                <Button variant="ghost" size="icon" aria-label="Show portfolio collections" aria-expanded={portfolioOpen} onClick={() => setPortfolioOpen((value) => !value)}><ChevronDown className={`h-4 w-4 transition-transform ${portfolioOpen ? "rotate-180" : ""}`} /></Button>
              </div>
              {portfolioOpen && <ul className="mt-3 space-y-3 border-l border-rule pl-4">{SILO_KEYS.map((slug) => <li key={slug}><Link to="/$section" params={{ section: slug }} onClick={() => setOpen(false)} className="text-sm text-ink">{SERVICE_SILOS[slug].name}</Link></li>)}</ul>}
            </li>
            <li><Link to="/about" onClick={() => setOpen(false)} className="text-sm font-medium uppercase text-ink">About</Link></li>
            <li><Link to="/blog" onClick={() => setOpen(false)} className="text-sm font-medium uppercase text-ink">Blog</Link></li>
            <li><Link to="/contact" onClick={() => setOpen(false)} className="text-sm font-medium uppercase text-ink">Contact</Link></li>
            <li>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-liquid inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.12em] text-primary-foreground"
              >
                Get a quote
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const [email, setEmail] = useState("");

  function subscribe(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const list = JSON.parse(localStorage.getItem("etherialNewsletter") ?? "[]") as string[];
    list.push(email);
    localStorage.setItem("etherialNewsletter", JSON.stringify(list));
    const webhook = localStorage.getItem("n8nWebhookUrl");
    if (webhook) {
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email }),
      }).catch(() => {});
    }
    submitWixForm(WIX_NEWSLETTER_FORM_ID, { email, marketing_consent: true }).catch(() => {
      toast.error("We saved your email, but couldn't reach our mailing list. We'll add you shortly.");
    });
    setEmail("");
    toast.success("Thank you — you've been added to our list.");
  }

  return (
    <footer className="bg-ink-deep text-linen">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1.4fr]">
        <div>
          <Wordmark className="text-linen" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-linen/70">
            Bespoke fitted closets, kitchens and living spaces — designed and built in Dubai.
          </p>
        </div>
        <nav aria-label="Footer portfolio" className="text-sm leading-relaxed text-linen/70">
          <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.14em] text-linen">
            Portfolio
          </p>
          <ul className="space-y-2">
             <li><Link className="u-reveal" to="/$section" params={{ section: "custom-wardrobes-closets-dubai" }}>Wardrobes &amp; Closets</Link></li>
             <li><Link className="u-reveal" to="/$section" params={{ section: "bespoke-joinery-dubai" }}>Bespoke Joinery</Link></li>
             <li><Link className="u-reveal" to="/$section" params={{ section: "living-media-storage" }}>Living &amp; Media Storage</Link></li>
             <li><Link className="u-reveal" to="/$section" params={{ section: "kitchen-laundry-renovations" }}>Kitchen &amp; Laundry</Link></li>
             <li><Link className="u-reveal" to="/$section" params={{ section: "custom-cabinets-vanities" }}>Cabinets &amp; Vanities</Link></li>
            <li><Link className="u-reveal" to="/portfolio">All Projects</Link></li>
          </ul>
        </nav>
        <nav aria-label="Footer company" className="text-sm leading-relaxed text-linen/70">
          <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.14em] text-linen">Company</p>
          <ul className="space-y-2">
            <li><Link className="u-reveal" to="/about">About</Link></li>
            <li><Link className="u-reveal" to="/blog">Blog</Link></li>
            <li><Link className="u-reveal" to="/contact">Contact</Link></li>
            <li><Link className="u-reveal" to="/faqs">FAQs</Link></li>
          </ul>
        </nav>
        <div>
          <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.14em]">
            Occasional notes on joinery
          </p>
          <form onSubmit={subscribe} className="flex gap-2">
            <input
              type="email"
              aria-label="Email address for newsletter"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full rounded-md border border-linen/20 bg-transparent px-3 py-2.5 text-sm text-linen placeholder:text-linen/40 focus:border-brass focus:outline-none"
            />
            <button
              type="submit"
              className="btn-liquid rounded-md bg-linen px-4 py-2.5 text-[13px] font-medium uppercase tracking-[0.12em] text-ink"
            >
              Join
            </button>
          </form>
          <div className="mt-7 border-t border-linen/20 pt-6 text-sm leading-relaxed text-linen/70">
            <p>{CONTACT.address}</p>
            <p className="mt-1">{CONTACT.hours}</p>
            <p className="mt-3"><a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="u-reveal">{CONTACT.phone}</a></p>
            <p><a href={`mailto:${CONTACT.email}`} className="u-reveal">{CONTACT.email}</a></p>
            <div className="mt-5 flex items-center gap-3" aria-label="Social media profiles">
              {SOCIALS.map(({ name, Icon, url }) => url ? <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} className="flex h-10 w-10 items-center justify-center rounded-full border border-linen/40 text-linen transition-colors hover:border-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"><Icon size={18} /></a> : <span key={name} title={`${name} profile link coming soon`} aria-label={`${name} profile link coming soon`} className="flex h-10 w-10 items-center justify-center rounded-full border border-linen/30 text-linen/60"><Icon size={18} /></span>)}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl overflow-hidden px-5" aria-hidden="true"><div className="footer-wordmark font-display select-none whitespace-nowrap text-center text-7xl leading-none text-linen/25 sm:text-[8rem] lg:text-[12rem]">ETHERIAL.</div></div>
      <div className="border-t border-linen/10 px-5 py-5 text-xs text-linen/50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Etherial Interiors, Dubai. All rights reserved.</span>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link className="u-reveal" to="/privacy-policy">Privacy Policy</Link>
            <Link className="u-reveal" to="/terms-and-conditions">T&amp;Cs</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/** Labeled placeholder frame for imagery the client will supply. */
export function ImagePlaceholder({
  label,
  className = "",
  tall = false,
}: {
  label: string;
  className?: string;
  tall?: boolean;
}) {
  return (
    <div
      className={`frame-fold flex items-center justify-center border border-dashed border-rule bg-linen ${
        tall ? "aspect-[3/4]" : "aspect-[4/3]"
      } rounded-[48px_6px_48px_6px] ${className}`}
    >
      <span className="px-6 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function Stars() {
  return (
    <span className="inline-flex items-center gap-0.5 text-brass" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-brass">{eyebrow}</p>
      <Tag className="font-display mt-3 text-4xl leading-tight text-ink md:text-5xl">{title}</Tag>
      {children && <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{children}</p>}
    </div>
  );
}

export function ArrowLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-ink"
    >
      <span className="u-reveal">{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
