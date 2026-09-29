// Public Wix Headless settings. The client ID is safe in browser code.
// The client secret must NEVER be added here.
export const WIX_CLIENT_ID = "295e539c-ea79-4744-bc14-1a286faaf0d2";

// TODO(client): paste the Wix Form IDs from the Wix dashboard.
// Leave empty to skip sending to Wix (localStorage + n8n still run).
export const WIX_QUOTE_FORM_ID = "";
export const WIX_NEWSLETTER_FORM_ID = "";

// Wix CMS collection IDs (read permission: Anyone).
export const WIX_PROJECTS_COLLECTION = "Projects";
export const WIX_JOURNAL_COLLECTION = "JournalPosts";
