# TechHeads Planner

This is the example repo.

## Deploy to Vercel + Supabase

TanStack Start (SSR) app backed by Supabase Postgres + Supabase Auth. The browser
talks to Supabase directly with the publishable key; row level security in the
database decides what each user can read and write.

### 1. Create the Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. From **Project Settings → API**, note:
   - **Project URL**, e.g. `https://abcdefghijkl.supabase.co`
   - **Project ref**, the `abcdefghijkl` part
   - **Publishable key** (called `anon` / `public` on older projects)
3. Apply the database schema from `supabase/migrations`:

   ```sh
   npx supabase login
   npx supabase link --project-ref <project-ref>
   npx supabase db push
   ```

### 2. Configure Supabase Auth

In the Supabase dashboard:

1. **Authentication → URL Configuration**
   - **Site URL**: `https://<your-app>.vercel.app` (or your custom domain)
   - **Redirect URLs**: add `https://<your-app>.vercel.app/**`
   - For preview deployments, also add `https://*-<your-vercel-team>.vercel.app/**`
2. **Authentication → Sign In / Providers → Email**: make sure Email is enabled.
   "Confirm email" on means users must click a link before they can sign in;
   turn it off for a demo.

### 3. Create the Vercel project

1. In Vercel, **Add New → Project** and import this GitHub repository.
2. Leave the framework preset, build command (`npm run build`) and output
   directory at their defaults.
3. Before the first deploy, open **Environment Variables** and add these for
   **Production** and **Preview**:

   | Name | Value |
   | --- | --- |
   | `NITRO_PRESET` | `vercel` |
   | `VITE_SUPABASE_URL` | Project URL |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | Publishable key |
   | `SUPABASE_URL` | Project URL (same as above) |
   | `SUPABASE_PUBLISHABLE_KEY` | Publishable key (same as above) |

   - `NITRO_PRESET=vercel` makes the build output a Vercel function. Without it
     the build targets Cloudflare Workers and the deploy will not work.
   - `VITE_*` values are baked into the browser bundle at build time. After
     changing them, redeploy.
   - The unprefixed values are read by the server at runtime (SSR).
   - No service role key is needed.

4. Click **Deploy**.

### 4. Check that it works

1. Open the deployed URL and build a schedule without signing in.
2. **Sign in → Create account**, then save the schedule.
3. Open **My schedules**, make the schedule **Public** and copy the link.
4. Open the link in a private window. It should show the schedule without a login.

If sign-up emails point at `localhost`, the Site URL in step 2 is wrong.

### Notes

- The committed `.env` points at the Supabase project managed by Lovable and is
  only used for local development and Lovable. Vercel ignores it and uses the
  variables above.
- To use Vercel's Supabase integration instead, you still need to add the
  `VITE_*` and `SUPABASE_*` variables above; the integration uses different names.
- The programme comes from `techheads-program-dataset.csv` and is parsed at build
  time. Replace the file and redeploy to update it; nothing changes in the
  database. Session IDs are derived from start time + title, so saved schedules
  survive row reordering.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
