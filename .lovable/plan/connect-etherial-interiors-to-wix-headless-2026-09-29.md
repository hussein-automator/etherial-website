# Connect Etherial Interiors to Wix (Headless)

The site stays a pure front-end site. Wix does all the storage and management, so there is still no database of our own. It connects with your public client ID `295e539c-ea79-4744-bc14-1a286faaf0d2`. The client secret is not needed and is never added to the site.

## What visitors and you will get

1. **Quote form → Wix Forms.** Contact page submissions show up in your Wix dashboard as form entries and create a Wix contact. The existing automation webhook keeps working as a backup if it is set.
2. **Newsletter → Wix.** Footer signups are sent as a Wix form submission with marketing consent, so the email lands in Wix Contacts as a subscriber.
3. **Portfolio and Journal from Wix CMS.** Portfolio category pages and the Journal page show items from two Wix collections. Until those collections have content, the current labeled placeholders stay in place, so nothing is invented.
4. **Book a consultation (Wix Bookings).** A "Book a consultation" section lists your Wix Bookings services. Clicking one sends the visitor to Wix's secure booking and checkout page, then back to the site.

## What you will need to set up in Wix (I will list exact steps after the build)

- Add the site's domain and the callback page `/booking-complete` to the allowed URLs in the Wix OAuth app settings.
- Create one Wix Form for quotes and one for the newsletter, then give me their form IDs. Placeholders are used until you do.
- Create CMS collections `Projects` (title, category, image, description) and `JournalPosts` (title, excerpt, cover image, date, slug), with read access set to "Anyone".
- Create at least one Bookings service, for example "Design consultation".

## Technical details

- Install `@wix/sdk`, `@wix/data`, `@wix/forms`, `@wix/bookings` and `@wix/redirects`.
- Create `src/lib/wix.ts`, a browser-only client using `OAuthStrategy({ clientId })`. Visitor tokens persist in `localStorage` (`etherialWixTokens`) and refresh through the SDK instead of being minted on every page load.
- Put the client ID in `src/lib/wix-config.ts` (it is public), along with placeholder form IDs and collection names clearly marked TODO.
- Quote form and newsletter: call `submissions.createSubmission`, show a toast on failure, and keep the current localStorage record and the n8n POST.
- Portfolio and Journal: use TanStack Query with the `items.query(collection)` filter by category, wrapped behind client-only rendering. Fall back to the placeholders on empty results or errors.
- Bookings: add a section on the Contact page that uses `services.queryServices()`. Clicking a service calls `redirects.createRedirectSession({ bookingsCheckout, callbacks })`. Add a new `/booking-complete` route with its own head metadata.
- Keep the nav at 5 links. Buttons use the existing liquid brass fill; links use the underline reveal.
- Record the Wix integration decision in AGENTS.md and update roadmap.md.
