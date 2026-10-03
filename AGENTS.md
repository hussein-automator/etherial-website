<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep client photography placeholders distinct from generated hero concept images; the hero slideshow explicitly labels renderings so conceptual work cannot be mistaken for completed projects.
- Keep the five service silos in shared data, with parent/detail dynamic routes and permanent redirects from old portfolio categories; this preserves existing URLs while keeping each service hierarchy consistent.
- Wix Headless (visitor OAuth, public client ID in src/lib/wix-config.ts) powers forms, CMS content and bookings from the browser only; keeps the site static with no secret in code.
- Keep navigation capped at five top-level paths and nest the five existing service silos beneath Portfolio; this preserves focused navigation without merging their individual pages.
- Generate sitemap entries from the shared service silo data only after a real public domain is available; XML sitemap locations must be absolute and must not use preview hosts.

- AI features run through a single TanStack server function per feature (src/lib/*.functions.ts) calling the Lovable AI Gateway; the key stays server-side and the rest of the site remains static.
- DOM enhancements (Arabic translation, section reveal) start only after React hydrates route content; mutating earlier causes hydration mismatches.
