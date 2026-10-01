import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { CONTACT } from "@/components/etherial";
import { BookConsultation } from "@/components/book-consultation";
import { submitWixForm } from "@/lib/wix";
import { WIX_QUOTE_FORM_ID } from "@/lib/wix-config";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Get a Quote — Etherial Interiors, Dubai" },
      {
        name: "description",
        content:
          "Tell us about your space and receive a tailored estimate by email within 2 hours. Bespoke fitted closets, kitchens and living spaces in Dubai.",
      },
      { property: "og:title", content: "Get a Quote — Etherial Interiors, Dubai" },
      {
        property: "og:description",
        content: "A tailored estimate by email within 2 hours — bespoke joinery, built in Dubai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const PROJECT_TYPES = ["Fitted closet", "Kitchen", "Living space", "Wardrobe", "Bespoke joinery"];
const BUDGETS = ["Under AED 15k", "AED 15k–40k", "AED 40k–80k", "AED 80k+", "Not sure yet"];

type FormData = {
  projectType: string;
  budget: string;
  details: string;
  name: string;
  email: string;
  phone: string;
  contactPreference: string;
};

const initial: FormData = {
  projectType: "",
  budget: "",
  details: "",
  name: "",
  email: "",
  phone: "",
  contactPreference: "",
};

function ContactPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(() => {
    try {
      return { ...initial, ...JSON.parse(localStorage.getItem("etherialQuoteDraft") ?? "{}") };
    } catch {
      return initial;
    }
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function update(patch: Partial<FormData>) {
    setData((d) => {
      const next = { ...d, ...patch };
      localStorage.setItem("etherialQuoteDraft", JSON.stringify(next));
      return next;
    });
  }

  function canNext() {
    if (step === 0) return data.projectType !== "";
    if (step === 1) return data.budget !== "";
    if (step === 2)
      return data.name.trim() !== "" && data.email.includes("@") && data.phone.trim() !== "" && ["Email", "Call", "WhatsApp"].includes(data.contactPreference);
    return true;
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!canNext()) {
      toast.error("Please complete the required fields.");
      return;
    }
    setSending(true);
    const payload = { type: "quote", ...data, submittedAt: new Date().toISOString() };
    const webhook = localStorage.getItem("n8nWebhookUrl");
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch {
        // Webhook unreachable — draft stays in localStorage; still confirm to the user.
      }
    }
    try {
      await submitWixForm(WIX_QUOTE_FORM_ID, {
        first_name: data.name,
        email: data.email,
        phone: data.phone,
        contact_preference: data.contactPreference,
        project_type: data.projectType,
        budget: data.budget,
        project_details: data.details,
      });
    } catch {
      toast.error("Your request is saved, but we couldn't reach our inbox. We'll follow up by phone.");
    }
    localStorage.setItem("etherialLastQuote", JSON.stringify(payload));
    localStorage.removeItem("etherialQuoteDraft");
    setSending(false);
    setSubmitted(true);
  }

  const inputCls =
    "w-full rounded-md border border-rule bg-linen-alt px-4 py-3 text-[15px] text-ink placeholder:text-muted-foreground focus:border-brass focus:outline-none";

  return (
    <div className="mx-auto grid max-w-6xl gap-16 px-5 py-20 lg:grid-cols-[1fr_380px]">
      {/* Form */}
      <div>
        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-brass">
          Get a quote
        </p>
        <h1 className="font-display mt-3 text-5xl leading-tight text-ink">
          Tell us about your space.
        </h1>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
          Two minutes of questions, and we'll reply using your preferred contact method — usually
          within 2 hours during working hours.
        </p>

        {submitted ? (
          <div className="frame-fold mt-10 rounded-[48px_6px_48px_6px] border border-rule bg-linen p-10 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brass text-linen-alt">
              <Check className="h-6 w-6" />
            </span>
            <h2 className="font-display mt-5 text-3xl text-ink">Thank you, {data.name}.</h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-muted-foreground">
              Your project details are in. We'll reach you by {data.contactPreference.toLowerCase()} with a tailored estimate,
              usually within 2 hours during working hours.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-10">
            {/* Step indicator */}
            <div className="mb-8 flex items-center gap-3">
              {["Project", "Budget", "You"].map((label, i) => (
                <div key={label} className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-medium ${
                      i <= step ? "bg-ink text-linen-alt" : "border border-rule text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`text-[12px] uppercase tracking-[0.14em] ${
                      i <= step ? "text-ink" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                  {i < 2 && <span className="h-px w-8 bg-rule" />}
                </div>
              ))}
            </div>

            {step === 0 && (
              <fieldset>
                <legend className="font-display text-2xl text-ink">What are we building?</legend>
                <div className="mt-5 flex flex-wrap gap-3">
                  {PROJECT_TYPES.map((t) => (
                    <Button
                      key={t}
                      type="button"
                      onClick={() => update({ projectType: t })}
                      className={`rounded-md border px-5 py-3 text-sm transition-colors ${
                        data.projectType === t
                          ? "border-ink bg-ink text-linen-alt"
                          : "border-rule bg-linen-alt text-ink hover:border-brass"
                      }`}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
                <textarea
                  value={data.details}
                  onChange={(e) => update({ details: e.target.value })}
                  placeholder="Anything else we should know? Room dimensions, timeline, inspiration…"
                  rows={4}
                  className={`${inputCls} mt-5`}
                />
              </fieldset>
            )}

            {step === 1 && (
              <fieldset>
                <legend className="font-display text-2xl text-ink">
                  What budget should we design to?
                </legend>
                <div className="mt-5 flex flex-wrap gap-3">
                  {BUDGETS.map((b) => (
                    <Button
                      key={b}
                      type="button"
                      onClick={() => update({ budget: b })}
                      className={`rounded-md border px-5 py-3 text-sm transition-colors ${
                        data.budget === b
                          ? "border-ink bg-ink text-linen-alt"
                          : "border-rule bg-linen-alt text-ink hover:border-brass"
                      }`}
                    >
                      {b}
                    </Button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset>
                 <legend className="font-display text-2xl text-ink">How can we reach you?</legend>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <input
                    value={data.name}
                    onChange={(e) => update({ name: e.target.value })}
                    placeholder="Full name"
                    aria-label="Full name"
                    required
                    className={inputCls}
                  />
                  <input
                    type="email"
                    aria-label="Email address"
                    value={data.email}
                    onChange={(e) => update({ email: e.target.value })}
                    placeholder="Email address"
                    required
                    className={inputCls}
                  />
                  <input
                    type="tel"
                    aria-label="Phone number"
                    value={data.phone}
                    onChange={(e) => update({ phone: e.target.value })}
                     placeholder="Phone number (include country code)"
                    required
                    className={`${inputCls} sm:col-span-2`}
                  />
                </div>
                 <div className="mt-6">
                   <p id="contact-method-label" className="text-sm font-medium text-ink">How would you prefer to be contacted?</p>
                   <div role="radiogroup" aria-labelledby="contact-method-label" className="mt-3 flex flex-wrap gap-3">
                     {["Email", "Call", "WhatsApp"].map((method) => (
                       <label key={method} className={`cursor-pointer rounded-md border px-5 py-3 text-sm ${data.contactPreference === method ? "border-ink bg-ink text-linen-alt" : "border-rule bg-linen-alt text-ink"}`}>
                         <input type="radio" name="contactPreference" value={method} checked={data.contactPreference === method} onChange={() => update({ contactPreference: method })} className="sr-only" required />
                         {method}
                       </label>
                     ))}
                   </div>
                 </div>
              </fieldset>
            )}

            <div className="mt-8 flex items-center gap-4">
              {step > 0 && (
                 <Button variant="ghost"
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-muted-foreground hover:text-ink"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                 </Button>
              )}
              {step < 2 ? (
                 <Button
                  type="button"
                  onClick={() => (canNext() ? setStep((s) => s + 1) : toast.error("Please choose an option first."))}
                  className="btn-liquid inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.12em] text-primary-foreground"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                 </Button>
              ) : (
                 <Button
                  type="submit"
                  disabled={sending}
                  className="btn-liquid inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.12em] text-primary-foreground disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send my request"} <ArrowRight className="h-4 w-4" />
                 </Button>
              )}
            </div>
          </form>
        )}
      </div>

      {/* Sidebar: process roadmap + visit info */}
      <aside className="space-y-10">
        <BookConsultation />
        <div className="frame-fold rounded-[48px_6px_48px_6px] border border-rule bg-linen p-8">
          <h2 className="font-display text-2xl text-ink">What happens next</h2>
          <ol className="mt-6 space-y-6">
            {[
              { n: "1", t: "Intake received", d: "Your details land with our design team immediately." },
               { n: "2", t: "Estimate within 2 hours", d: "A tailored price scope follows by your preferred contact method." },
              { n: "3", t: "Project launch", d: "We visit, measure, and your build begins — typically fitted within 14 days." },
            ].map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-sm text-linen-alt">
                  {s.n}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{s.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="frame-fold rounded-[48px_6px_48px_6px] border border-rule bg-linen-alt p-8">
          <h2 className="font-display text-2xl text-ink">Visit the workshop</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {CONTACT.address}
            <br />
            {CONTACT.hours}
          </p>
          <p className="mt-3 text-sm">
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="u-reveal font-medium text-ink">
              {CONTACT.phone}
            </a>
            <br />
            <a href={`mailto:${CONTACT.email}`} className="u-reveal font-medium text-ink">
              {CONTACT.email}
            </a>
          </p>
          {/* PLACEHOLDER — replace with the client's Google Maps embed URL */}
          <div className="mt-5 flex aspect-[4/3] items-center justify-center rounded-md border border-dashed border-rule bg-linen">
            <span className="px-6 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Google Maps embed — Umm Ramool location (embed URL to be supplied)
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
