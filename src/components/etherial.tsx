import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { Menu, X, Star, ArrowRight } from "lucide-react";
import { toast } from "sonner";
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

const NAV = SILO_KEYS.map((section) => ({ section, label: SERVICE_SILOS[section].name }));

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-2xl tracking-wide ${className}`}>
      ETHERIAL<span className="text-brass">.</span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-linen-alt/90 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <Link to="/" aria-label="Etherial Interiors home">
          <Wordmark />
        </Link>
        <nav className="hidden flex-wrap items-center justify-center gap-x-5 gap-y-2 py-3 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.section}
              to="/$section"
              params={{ section: item.section }}
              data-active={pathname.startsWith(`/${item.section}`)}
              className="u-reveal text-[11px] font-medium uppercase tracking-[0.08em] text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="btn-liquid inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.12em] text-primary-foreground"
          >
            Get a quote
          </Link>
        </div>
        <button
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-rule bg-linen-alt px-5 py-4 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-4">
            {NAV.map((item) => (
              <li key={item.section}>
                <Link
                  to="/$section"
                  params={{ section: item.section }}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium uppercase tracking-[0.14em] text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
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
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Wordmark className="text-linen" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-linen/70">
            Bespoke fitted closets, kitchens and living spaces — designed and built in Dubai.
          </p>
          <div className="mt-5 text-sm leading-relaxed text-linen/70">
            <p>{CONTACT.address}</p>
            <p className="mt-1">{CONTACT.hours}</p>
            <p className="mt-3"><a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="u-reveal">{CONTACT.phone}</a></p>
            <p><a href={`mailto:${CONTACT.email}`} className="u-reveal">{CONTACT.email}</a></p>
          </div>
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
        </div>
      </div>
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
