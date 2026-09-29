// Browser-only Wix Headless client (visitor OAuth). Only call these helpers
// from event handlers or client-side queries, never during SSR.
import { createClient, OAuthStrategy, media } from "@wix/sdk";
import { items } from "@wix/data";
import { submissions } from "@wix/forms";
import { services } from "@wix/bookings";
import { redirects } from "@wix/redirects";
import {
  WIX_CLIENT_ID,
  WIX_JOURNAL_COLLECTION,
  WIX_PROJECTS_COLLECTION,
} from "./wix-config";

const TOKEN_KEY = "etherialWixTokens";

function makeClient() {
  let tokens: any;
  try {
    tokens = JSON.parse(localStorage.getItem(TOKEN_KEY) ?? "null") ?? undefined;
  } catch {
    tokens = undefined;
  }
  const auth = OAuthStrategy({ clientId: WIX_CLIENT_ID, tokens });
  return createClient({ modules: { items, submissions, services, redirects }, auth });
}

let client: ReturnType<typeof makeClient> | null = null;

async function wix() {
  if (typeof window === "undefined") throw new Error("Wix client is browser-only");
  if (!client) client = makeClient();
  const auth = client.auth as any;
  // Reuse stored visitor tokens; the SDK refreshes them when expired.
  if (!auth.getTokens?.()?.accessToken?.value) {
    const t = await auth.generateVisitorTokens();
    auth.setTokens(t);
  }
  localStorage.setItem(TOKEN_KEY, JSON.stringify(auth.getTokens()));
  return client;
}

export function wixImageUrl(src?: string, w = 900, h = 1100) {
  if (!src) return undefined;
  if (!src.startsWith("wix:image")) return src;
  try {
    return media.getScaledToFillImageUrl(src, w, h, {});
  } catch {
    return undefined;
  }
}

export async function submitWixForm(formId: string, values: Record<string, unknown>) {
  if (!formId) return false;
  const c = await wix();
  await (c.submissions as any).createSubmission({ formId, submissions: values });
  return true;
}

export type WixProject = { id: string; title: string; description?: string; image?: string };
export async function fetchProjects(category: string): Promise<WixProject[]> {
  const c = await wix();
  const res = await (c.items as any)
    .query(WIX_PROJECTS_COLLECTION)
    .eq("category", category)
    .limit(24)
    .find();
  return (res.items ?? []).map((i: any) => ({
    id: i._id,
    title: i.title ?? "",
    description: i.description,
    image: wixImageUrl(i.image),
  }));
}

export type WixPost = { id: string; title: string; excerpt?: string; cover?: string; date?: string };
export async function fetchPosts(): Promise<WixPost[]> {
  const c = await wix();
  const res = await (c.items as any)
    .query(WIX_JOURNAL_COLLECTION)
    .descending("date")
    .limit(24)
    .find();
  return (res.items ?? []).map((i: any) => ({
    id: i._id,
    title: i.title ?? "",
    excerpt: i.excerpt,
    cover: wixImageUrl(i.coverImage ?? i.cover, 900, 700),
    date: i.date ? new Date(i.date).toLocaleDateString("en-GB", { dateStyle: "medium" }) : undefined,
  }));
}

export type WixService = { id: string; name: string; description?: string; slug?: string };
export async function fetchServices(): Promise<WixService[]> {
  const c = await wix();
  const res = await (c.services as any).queryServices().limit(12).find();
  return (res.items ?? []).map((s: any) => ({
    id: s._id,
    name: s.name ?? "",
    description: s.tagLine ?? s.description,
    slug: s.mainSlug?.name,
  }));
}

export async function startBooking(serviceId: string) {
  const c = await wix();
  const origin = window.location.origin;
  const { redirectSession } = await (c.redirects as any).createRedirectSession({
    bookingsBook: { serviceId },
    callbacks: { postFlowUrl: `${origin}/booking-complete`, thankYouPageUrl: `${origin}/booking-complete` },
  });
  if (redirectSession?.fullUrl) window.location.href = redirectSession.fullUrl;
}
