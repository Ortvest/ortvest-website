This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values.

| Variable               | Required            | Description                                                                                                                                                                      |
| ---------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ORTVEST_CMS_API_URL`  | **Build + Runtime** | Base URL of Ortvest CMS (e.g. `https://cms.ortvest.com`). Server-only. The build **fails** if this is absent in production. In development, defaults to `http://localhost:3200`. |
| `ORTVEST_CMS_API_KEY` | Contact forms            | Server-only organization API key. `/api/contact` loads the form schema from CMS and stores submissions in that organization. Never use a `NEXT_PUBLIC_` prefix for this server-side proxy. |
| `REVALIDATE_SECRET`    | Runtime             | Shared secret for the `POST /api/revalidate` ISR webhook. The CMS sends this in the `x-revalidate-secret` header after publishing a post. Generate with `openssl rand -hex 32`.  |
| `NEXT_PUBLIC_SITE_URL` | Runtime             | Public URL of this site, used for Stripe cancel URLs.                                                                                                                            |
| `GOOGLE_ANALYTICS_ID`  | Optional            | GA4 measurement ID.                                                                                                                                                              |
| `LINKEDIN_PARTNER_ID`  | Optional            | LinkedIn Insight Tag partner ID.                                                                                                                                                 |
| `COOKIEYES_SITE_ID`    | Optional            | CookieYes site ID.                                                                                                                                                               |
| `MONGODB_URI`          | Runtime             | MongoDB connection string for the contact form.                                                                                                                                  |

For a site with a backend, generate the tenant's API key in the CMS organization
billing settings and set `ORTVEST_CMS_API_URL` and `ORTVEST_CMS_API_KEY` in the
website server environment. Each client website deployment must use the key
for its own organization. This server-side configuration is sent only by
`/api/contact` and must never be exposed to browser code.

Sites without a backend can call `POST https://<cms-origin>/api/contacts`
directly from the browser using the organization's key in the Bearer header.
That key is public in browser code and is limited to lead submission and reads
of published blog posts for its organization. Anyone who obtains it can submit
leads, so do not use an administrator credential as a website key.

All contact forms (including the partnership page) render the organization's
CMS schema. The input `name` comes from `key`, its visible title from `label`,
and its initial value from `value`. Submitted values are sent as `fields` under
those configured keys. There is no hardcoded fallback form. Add fields in the
CMS before enabling the website form; the same fields become the Orders columns.

### Blog ISR revalidation webhook

After publishing or updating a post, Ortvest CMS should call:

```
POST https://www.ortvest.com/api/revalidate
x-revalidate-secret: <REVALIDATE_SECRET>
```

This purges the `blog` cache tag so visitors see fresh content within seconds, without a redeploy. Without the webhook, content updates are reflected automatically within 5 minutes (`revalidate: 300`).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
