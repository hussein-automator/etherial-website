import { createServerFn } from "@tanstack/react-start";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

const Input = z.object({
  occasion: z.string().trim().min(3).max(500),
  wardrobe: z.string().trim().min(3).max(2000),
  language: z.enum(["en", "ar"]).default("en"),
});

export const recommendOutfit = createServerFn({ method: "POST" })
  .inputValidator((data) => Input.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { ok: false as const, error: "The stylist isn't configured yet." };
    let runId: string | undefined;
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: async (input, init) => {
        const headers = new Headers(init?.headers);
        if (runId) headers.set("X-Lovable-AIG-Run-ID", runId);
        const res = await fetch(input, { ...init, headers });
        runId ??= res.headers.get("X-Lovable-AIG-Run-ID") ?? undefined;
        return res;
      },
    });
    let failure: { status: number | undefined; message: string | undefined } | undefined;
    try {
      const result = streamText({
        model: provider.responses("openai/gpt-6-astra"),
        maxRetries: 0,
        system:
          "You are a refined personal stylist for Etherial Interiors, a Dubai bespoke wardrobe studio. Using ONLY the items the visitor lists, recommend one complete outfit for their occasion. Consider Dubai climate and cultural context. Format: a short title line, then bullet points for each piece and why, then one styling tip. If an essential piece is missing, mention it briefly. Keep under 180 words. Plain text with '-' bullets, no markdown headings." +
          (data.language === "ar" ? " Respond in Arabic." : ""),
        prompt: `Occasion: ${data.occasion}\n\nWardrobe items I have:\n${data.wardrobe}`,
        onError: ({ error }) => {
          const e = error as { statusCode?: number; message?: string };
          failure = { status: e.statusCode, message: e.message };
        },
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });
      const text = (await result.text).trim();
      if (!text) throw new Error("empty");
      return { ok: true as const, text };
    } catch (err) {
      const status = failure?.status ?? (err as { statusCode?: number }).statusCode;
      const msg =
        status === 429
          ? "The stylist is busy right now — please try again in a minute."
          : status === 402 || status === 403
            ? "The stylist is temporarily unavailable."
            : "We couldn't create a recommendation. Please try again.";
      console.error("stylist error", status, failure?.message ?? err);
      return { ok: false as const, error: msg };
    }
  });
