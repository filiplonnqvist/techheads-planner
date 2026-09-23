# TechHeads Planner

This is the example repo.

## Deploy

TanStack Start (SSR) app backed by Supabase Postgres + Supabase Auth. The build
targets Cloudflare Workers by default (via Nitro).

1. **Supabase project**: create one at [supabase.com](https://supabase.com), then
   apply the schema in `supabase/migrations`:

   ```sh
   npx supabase login
   npx supabase link --project-ref <project-ref>
   npx supabase db push
   ```

2. **Auth URLs**: in the dashboard under Authentication → URL Configuration, set
   Site URL to your production URL and add `https://<your-domain>/**` to Redirect
   URLs (signup confirmation emails link back there).
3. **Environment**: copy `.env.example` to `.env` with the project URL and
   publishable key. `VITE_*` values are inlined at build time, so they must be
   set wherever the build runs.
4. **Build and host**:

   ```sh
   npm install
   npm run build
   npx nitro deploy --prebuilt   # runs wrangler against .output/
   ```

   Also set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` as Worker variables.

For local development against a local stack, run `npx supabase start` (needs
Docker), point `.env` at the URL/key from `npx supabase status`, then `npm run dev`.

The programme comes from `techheads-program-dataset.csv` and is parsed at build
time; replace the file and rebuild to update it. Session IDs are derived from
start time + title, so saved schedules survive row reordering.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
