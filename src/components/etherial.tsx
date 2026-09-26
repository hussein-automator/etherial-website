import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { Menu, X, Star, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const CONTACT = {
  phone: "+971 56 201 5550",
  email: "info@etherial.ae",
  address: "Umm Ramool, Dubai, UAE",
  hours: "Mon–Fri 9:00–18:00 · Sat 9:00–19:00",
  // PLACEHOLDER — replace with the client's real Google review URL
  googleReviewUrl: "#google-review-url-placeholder",
};

const NAV = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" aria-label="Etherial Interiors home">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              data-active={pathname === item.to}
              className="u-reveal text-[13px] font-medium uppercase tracking-[0.14em] text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link
            to="/contact"
            className="btn-liquid inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.12em] text-primary-foreground"
          >
            Get a quote
          </Link>
        </div>
        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-rule bg-linen-alt px-5 py-4 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-4">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
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
    setEmail("");
    toast.success("Thank you — you've been added to our list.");
  }

  return (
    <footer className="bg-ink-deep text-linen">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-3">
        <div>
          <Wordmark className="text-linen" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-linen/70">
            Bespoke fitted closets, kitchens and living spaces — designed and built in Dubai.
          </p>
        </div>
        <div className="text-sm leading-relaxed text-linen/70">
          <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.14em] text-linen">
            Visit us
          </p>
          <p>{CONTACT.address}</p>
          <p className="mt-1">{CONTACT.hours}</p>
          <p className="mt-3">
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="u-reveal">
              {CONTACT.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${CONTACT.email}`} className="u-reveal">
              {CONTACT.email}
            </a>
          </p>
        </div>
        <div>
          <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.14em]">
            Occasional notes on joinery
          </p>
          <form onSubmit={subscribe} className="flex gap-2">
            <input
              type="email"
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
      <div className="border-t border-linen/10 py-5 text-center text-xs text-linen/50">
        © {new Date().getFullYear()} Etherial Interiors, Dubai. All rights reserved.
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
      className={`flex items-center justify-center border border-dashed border-rule bg-linen ${
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
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-brass">{eyebrow}</p>
      <h2 className="font-display mt-3 text-4xl leading-tight text-ink md:text-5xl">{title}</h2>
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
