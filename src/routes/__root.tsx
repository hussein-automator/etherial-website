import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader, SiteFooter } from "@/components/etherial";
import { localizePage } from "@/lib/arabic";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="u-reveal inline-flex text-sm font-medium tracking-wide text-foreground"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-liquid inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="u-reveal inline-flex items-center text-sm font-medium text-foreground">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Etherial Interiors — Bespoke Fitted Joinery, Dubai" },
      {
        name: "description",
        content:
          "Etherial Interiors designs and builds bespoke fitted closets, kitchens and living spaces in Dubai. 10-year warranty, 14-day average turnaround.",
      },
      { name: "author", content: "Etherial Interiors" },
      { property: "og:title", content: "Etherial Interiors — Bespoke Fitted Joinery, Dubai" },
      {
        property: "og:description",
        content:
          "Bespoke fitted closets, kitchens and living spaces, designed and built in Dubai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600&family=Montserrat:wght@300;400;500;600&family=Noto+Naskh+Arabic:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/** Runs DOM-mutating enhancements only after React has hydrated the lazy route content (avoids hydration mismatches). */
let hydrated = false;
function afterHydration(run: () => void) {
  if (hydrated) { run(); return () => {}; }
  let timer = 0;
  let tries = 0;
  const check = () => {
    const leaf = document.querySelector("#etherial-content > *");
    const ready = leaf && Object.keys(leaf).some((key) => key.startsWith("__reactFiber"));
    if (ready || ++tries > 100) { hydrated = true; requestAnimationFrame(run); return; }
    timer = window.setTimeout(check, 100);
  };
  check();
  return () => window.clearTimeout(timer);
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [dark, setDark] = useState(false);
  const [preferencesReady, setPreferencesReady] = useState(false);

  useEffect(() => {
    setLanguage(localStorage.getItem("etherialLanguage") === "ar" ? "ar" : "en");
    const stored = localStorage.getItem("etherialTheme");
    setDark(stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
    setPreferencesReady(true);
  }, []);

  useEffect(() => {
    if (!preferencesReady) return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("etherialTheme", dark ? "dark" : "light");
  }, [dark, preferencesReady]);

  useEffect(() => {
    if (!preferencesReady) return;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("etherialLanguage", language);
    const root = document.getElementById("etherial-site");
    if (!root) return;
    let queued = false;
    const refresh = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; localizePage(root, language); });
    };
    const observer = new MutationObserver(refresh);
    const cancel = afterHydration(() => {
      refresh();
      observer.observe(root, { childList: true, subtree: true, characterData: true });
    });
    return () => { cancel(); observer.disconnect(); };
  }, [language, preferencesReady]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.getElementById("etherial-content");
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target;
        element.classList.toggle("section-in-view", entry.isIntersecting);
        element.classList.toggle("section-out-of-view", !entry.isIntersecting);
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
    const tracked = new WeakSet<Element>();
    const attach = () => {
      root.querySelectorAll("section").forEach((element) => {
        if (!tracked.has(element)) { tracked.add(element); observer.observe(element); }
      });
    };
    const additions = new MutationObserver(attach);
    const cancel = afterHydration(() => {
      attach();
      additions.observe(root, { childList: true, subtree: true });
    });
    return () => { cancel(); observer.disconnect(); additions.disconnect(); };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div id="etherial-site" className="flex min-h-screen flex-col">
        <SiteHeader language={language} onLanguageChange={setLanguage} dark={dark} onDarkChange={setDark} />
        <main id="etherial-content" className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
