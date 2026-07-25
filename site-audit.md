# Ortvest site content audit

Scope: the current working tree of `ortvest-website`. This is a literal code/content inventory, not a recommendation document. “Client” and “server” below describe the component boundary (`'use client'` versus a server component), not whether Next.js emits any HTML for it during SSR.

## 1. Homepage section order

Render order from `src/app/[locale]/page.tsx`:

1. **Header** — `src/modules/Header/index.tsx` — client component.
2. **Hero** — `src/modules/Hero/index.tsx` — client component.
3. **SectionDivider** — `src/components/SectionDivider.tsx` — async server component.
4. **About / approach** — `src/modules/About/index.tsx` — async server component.
5. **Team** — `src/modules/Team/index.tsx` — client component.
6. **ServicesSection** — `src/modules/Services/ServicesSection.tsx` — client component inside `Suspense`.
7. **Reviews** — `src/modules/Reviews/index.tsx` — client component.
8. **Cases** — `src/modules/Cases/index.tsx` — client component.
9. **Consultation** — `src/modules/Consultation/index.tsx` — client component.
10. **BlogSection** — `src/modules/Blog/BlogSection.tsx` — async server component; renders `src/modules/Blog/BlogSectionClient.tsx`, a client component.
11. **FAQ** — `src/modules/FAQ/index.tsx` — client component.
12. **Contact** — `src/modules/Contact/index.tsx` — client component.
13. **Footer** — `src/modules/Footer/index.tsx` — client component.
14. **Modal host** — `src/modules/Modals/index.tsx` — client component; conditionally renders success/error overlays rather than a page section.

The page itself, `src/app/[locale]/page.tsx`, is a server component wrapped by the client component `src/global/store/ReduxProvider.tsx`.

`Industries`, `Process`, and `Technologies` are imported but commented out at `src/app/[locale]/page.tsx:40-42`; they do not render. Their content is partially duplicated inside the tabs of `ServicesSection`.

## 2. Section-by-section content

### Header

- **Component:** `src/modules/Header/index.tsx`
- **Child components:** `src/modules/Header/features/Navagation/index.tsx`, `Burger/index.tsx`, `BurgerMenu/index.tsx`, `LangSwitch/index.tsx`
- **JSON:** `nav.*`, plus `footer.language` for the language selector.
- **Hardcoded:** dropdown sublabels in `src/modules/Header/features/Navagation/index.tsx:15,21,27,33`; locale abbreviations in `LangSwitch`; accessibility labels in the header/burger components.

Visible English:

- Logo alt: `Ortvest`
- Logo link aria-label: `Home`
- Desktop/mobile CTA: `Get a quote`
- Navigation: `About`, `Team`, `Services`, `Cases`, `Blog`, `FAQ`
- Services dropdown:
  - `What we do` — `Design, Dev & Marketing`
  - `Industries` — `P2P, Community, Logistics…`
  - `Process` — `How we work, step by step`
  - `Technologies` — `Our tech stack`
- Language selector: `Language`, `EN`, `UA`, `PL`
- Mobile menu slogan: `From idea to launch. One team.`
- Mobile accessibility labels: `Open menu`, `Close menu`

Structural constraints:

- One horizontal desktop nav at `md+`; mobile uses a CTA plus burger.
- Services dropdown has four fixed items and `min-w-[220px]`.
- Header height is `h-14` / `sm:h-16`; mobile logo is capped at `max-w-[160px]`.
- Language button has a minimum width of 72px.

30%-longer risks:

- Desktop nav has no overflow strategy; longer labels can crowd the CTA.
- Dropdown rows place an icon and two text lines inside a 220px minimum-width panel.
- The four dropdown sublabels remain English in PL/UA.
- A longer mobile CTA can squeeze the burger button.

### Hero

- **Component:** `src/modules/Hero/index.tsx`
- **JSON:** `hero.badge`, `hero.title1`, `hero.title2`, `hero.subtitle`, `hero.cta.*`, `hero.freecall.*`, `hero.nodes.*`
- **Hardcoded:** `ORTVEST` at `src/modules/Hero/index.tsx:145`.

Visible English:

- Eyebrow: `For marketplaces, P2P products and member networks`
- Heading line 1: `The hard part was never the code.`
- Heading line 2: `It's the empty platform.`
- Subheading: `Marketplaces, P2P products and member networks only work when strangers start trusting each other. That's the problem we specialise in — and we've solved day one five times.`
- Primary CTA: `See how we handle the cold start`
- Secondary CTA: `Look at the work`
- Under-CTA text: `Not sure it's us? 30 minutes, no pitch →`
- Under-CTA link: `Book a call`
- Diagram labels: `P2P`, `Community`, `Logistics`, `ORTVEST`

Structural constraints:

- H1 always inserts a `<br />` between `title1` and `title2`; the break is not locale-controlled.
- Two-column layout at `md+`.
- Subtitle is capped at `max-w-[400px]`.
- CTA row wraps.
- Three orbit labels use fixed percentage positions and 10px text.

30%-longer risks:

- Each forced H1 line can wrap internally, turning the intended two-line title into three or four lines.
- Longer satellite labels can collide with the fixed orbit graphic.
- Longer subtitle/CTA copy increases the left column height while the right graphic remains square.
- The under-CTA row can break between its sentence and link.

### SectionDivider

- **Component:** `src/components/SectionDivider.tsx`
- **JSON:** `divider.*`
- **Hardcoded values:** `5`, `1`, `3`, and visual `·` separators.

Visible English:

- `5` — `two-sided platforms shipped`
- `1` — `product we fund ourselves — YachtMate`
- `3` — `industries. No others claimed.`
- Caption: `P2P · Community · Logistics`

Structural constraints:

- Exactly three stat blocks.
- Stacked on mobile; one horizontal row from `sm`.
- Labels are 11–12px; the caption is uppercase, 10px, with wide letter spacing.

30%-longer risks:

- The YachtMate label is already substantially longer than the other two and will produce unequal stat heights.
- A longer caption can wrap despite the wide tracking.
- Counts are hardcoded independently of their labels.

### About / approach

- **Component:** `src/modules/About/index.tsx`
- **JSON:** `approach.*`

Visible English:

- Eyebrow: `How we think`
- Heading: `Most studios ask what you want built. We ask who shows up first.`
- Body: `A two-sided product is worthless on launch day and nobody warns you. Owners won't join without renters. Renters won't join without owners. Clubs won't pay for a network with three clubs in it. We start there, before a single screen exists — because that's the question that decides whether the thing lives.`
- Quote: `Design comes after the cold start.`
- Quote body: `The empty platform is the first product state we design for.`
- Group label: `How we work`
- Card 1 title: `We've been the client`
- Card 1 body: `We build and fund YachtMate ourselves — a platform for yacht clubs. We pay for our own mistakes, our own churn, our own empty first month. Very few studios can say that, and it changes how we argue with you.`
- Card 2 title: `We'll tell you not to build it`
- Card 2 body: `Sometimes the answer is a spreadsheet, an existing tool, or nothing. We'd rather lose the project at the discovery call than six months in. Ask us for an example — we have them.`
- Card 3 title: `Same timezone, EU contracts`
- Card 3 body: `Poznań, Poland. Your legal team gets an EU entity, your PM gets a team that's awake when they are, and nobody schedules a 6am standup.`
- Group label: `What the product needs`
- Card 1 title: `Cold start before pixels`
- Card 1 body: `The first question in every project: who joins on day one, and why do they stay while the other side is still empty?`
- Card 2 title: `Trust is a feature, not a policy page`
- Card 2 body: `Verification, reputation, disputes, moderation. In a P2P product this isn't compliance — it's the product.`
- Card 3 title: `We ship the boring 20%`
- Card 3 body: `Admin panels, moderation queues, refund flows, dispute handling. Unglamorous, never in the portfolio, and the reason platforms survive their first year.`

Structural constraints:

- One header, one quote panel, two fixed grids of exactly three cards each.
- Both card grids switch to three columns at `sm`.
- Heading is capped at `max-w-2xl`; body at `max-w-xl`.
- Quote sentence is assembled from `quote.text` and an inline highlighted `quote.em`.

30%-longer risks:

- Longer card bodies produce visibly unequal card content density.
- The highlighted quote fragment can wrap separately from the first fragment.
- The already long section body adds substantial vertical height.

### Team

- **Component:** `src/modules/Team/index.tsx`
- **JSON:** `team.*`

Visible English:

- Eyebrow: `Who you'll actually work with`
- Heading: `3 people. The ones who scope it write it.`
- Body: `No account managers, no handoff to a junior bench after you sign. You talk to the people building the thing, for the whole project. That caps how much we can take on, which is why we run few projects at a time.`
- Card 1 title: `Engineering`
- Card 1 body: `Backend that survives a marketplace: verification, matching, payments, roles, permissions. We've built the parts that get ugly at scale, and the admin tooling nobody demos.`
- Card 2 title: `Product & Design`
- Card 2 body: `Interfaces for products where two different people want two different things from the same screen. Owner and renter. Club and member. Shipper and carrier.`
- Card 3 title: `Go-to-market (optional add-on)`
- Card 3 body: `The first hundred users on each side don't arrive through ads. We've done manual onboarding, seeded supply, and founder-led outreach — and we'll say so when paid acquisition is the wrong answer.`
- Carousel accessibility caption: `Team pagination`

Structural constraints:

- Exactly three discipline cards.
- Three-column grid at `md+`; one-card mobile carousel below `md`.
- Mobile carousel autoplays every seven seconds and has three pagination dots.
- `team.*.years` and `team.*.yearsLabel` remain in JSON but are not rendered.

30%-longer risks:

- The go-to-market title can wrap while the other two remain one line.
- Descriptions have no clamp; card heights/content positions become uneven.
- Longer mobile cards increase the swipe region and carousel height.
- The number `3` is embedded in translated copy rather than derived from the cards.

### Services

- **Component:** `src/modules/Services/ServicesSection.tsx`
- **JSON:** `servicesSection.*`
- **Hardcoded:** tag chips, step numbers, industry numbers, process tags, and technology names in the component.

Always visible:

- Eyebrow: `What we do`
- Heading: `Built for products where nobody knows each other yet.`
- Subheading: `Design, development and optional go-to-market for two-sided products.`
- Tabs: `What we do`, `Industries`, `Process`, `Technologies`

#### What we do tab

Exactly three expandable cards:

1. **Design**
   - Body: `UX for two-sided flows, verification and trust states, production-ready UI in Figma. We design the empty state first — it's what most of your early users will actually see.`
   - Tags: `Figma`, `Design systems`, `Prototyping`
   - Hint: `Tap to see what's included`
   - Expanded label: `What's included`
   - Bullets: `Two-sided user flows`; `Verification and trust states`; `Empty-state design`; `Design systems`; `Production-ready Figma`
   - CTA: `Get a quote`
2. **Development**
   - Body: `Web and mobile. Multi-tenant architecture, role and permission models, verification and payment rails, moderation and admin tooling.`
   - Tags: `React`, `Next.js`, `Node.js`, `Go`
   - Hint/label/CTA: `Tap to see what's included`; `What's included`; `Get a quote`
   - Bullets: `Multi-tenant web and mobile`; `Roles and permissions`; `Verification and payments`; `Moderation and disputes`; `Admin tooling`
3. **Marketing**
   - Badge: `Optional`
   - Body: `Cold-start acquisition, positioning, SEO, paid, CRM. Available as an add-on — and we'll tell you when your product isn't ready for traffic yet.`
   - Tags: `Positioning`, `SEO`, `Ads`, `Content`, `CRM`
   - Tier `Basic`: `SEO optimization`; `Analytics setup`; `Targeted advertising`; `Social media marketing`
   - Tier `Advanced`: `Email marketing & automation`; `Content strategy`; `Persuasive copywriting`; `CRM setup & marketing`
   - Tier `Premium`: `Full marketing strategy`; `Market & audience research`; `Competitive analysis`; `Brand positioning`

The Marketing card spans both columns at `sm+`; its expanded tiers become three columns at `sm+`.

#### Industries tab

Exactly three expandable cards:

1. `01` — `P2P`
   - Tags: `Verification`, `Matching`, `Payouts`
   - Hint: `Tap to learn more`
   - Expanded body: `Verification, trust, matching, disputes and payouts.`
2. `02` — `Community & clubs`
   - Tags: `Membership`, `Roles`, `Events`
   - Hint: `Tap to learn more`
   - Expanded body: `Membership, roles, events, dues and member directories.`
3. `03` — `Logistics`
   - Tags: `Fleet`, `Shipments`, `Multi-party workflows`, `Integrations`
   - Hint: `Tap to learn more`
   - Expanded body: `Fleet, shipments, multi-party workflows and integrations.`

Footer note: `Not on this list? Say so on the call. If it isn't ours, we'll say that too.`

Logistics spans both columns at `sm+`.

#### Process tab

Exactly five steps; only one is expanded at a time:

1. `Discovery`
   - Body: `We dig into your business, users, and competitors. Define the problem before touching a pixel or line of code.`
   - Duration: `1–2 weeks`
   - Tags: `Interviews`, `Competitor analysis`, `Tech audit`
2. `Design`
   - Body: `Wireframes, user flows, and high-fidelity UI. You approve every screen before development starts.`
   - Duration: `2–4 weeks`
   - Tags: `Figma`, `Prototyping`, `Design system`
3. `Development`
   - Body: `1-week sprints with demos every cycle. Working software, never a black box.`
   - Duration: `6–16 weeks`
   - Tags: `1-week sprints`, `Weekly demos`, `Code review`
4. `Marketing`
   - Badge: `Optional`
   - Body: `Landing pages, SEO setup, analytics, and go-to-market strategy. Available as an add-on.`
   - Duration: `2–4 weeks`
   - Tags: `Landing page`, `SEO`, `Analytics`, `GTM strategy`
5. `Launch & Support`
   - Body: `Deployment, monitoring, and post-launch iterations. We stay after go-live.`
   - Duration: `Ongoing`
   - Tags: `CI/CD`, `Monitoring`, `Retainer`

#### Technologies tab

Five groups:

- `Frontend`: `React`, `React Native`, `Next.js`, `TypeScript`
- `Databases`: `PostgreSQL`, `Redis`, `MongoDB`
- `Backend`: `Node.js`, `GoLang`, `Python`, `REST API`, `GraphQL`
- `Real-time`: `MQTT`, `WebSocket`
- `Infrastructure`: `AWS`, `Docker`, `CI/CD`

Structural constraints:

- Four horizontally scrollable tabs.
- Three expandable service cards, three expandable industry cards, five process items, five technology groups.
- URL `?tab=` can select the active tab.
- Several labels and every technology/process tag are hardcoded English.

30%-longer risks:

- The tab strip starts horizontally scrolling.
- Title/badge rows can wrap or squeeze.
- The three marketing tier columns become uneven and tall.
- Expanded cards animate to content height, increasing layout movement.
- Hardcoded chips cannot become longer through normal translation because they remain English.

### Reviews

- **Component:** `src/modules/Reviews/index.tsx`
- **JSON:** `reviews.*`
- **Runtime source:** `GET /api/reviews`

Static visible English:

- Eyebrow: `Reviews`
- Heading: `What clients say.`
- Expand controls: `Read more`, `Show less`
- CTA: `Worked with us? We'd love to hear from you.`
- CTA link: `Leave a review`
- Accessibility templates: `{n} out of 5 stars`, `Avatar of {name}`, `Reviews pagination`, `Page {n}`

Per-review runtime fields:

- `name`
- `role`
- `company`
- `text`
- `rating`, displayed with five star icons and a one-decimal numeric value.

Structural constraints:

- Initially renders three 240px skeleton cards.
- Hides the entire section after loading if the API returns no reviews.
- Desktop carousel displays three cards per page; mobile displays one.
- Review text is clamped to four lines until expanded.
- Name and `role, company` are single-line truncated.

30%-longer risks:

- Names and role/company strings are clipped.
- Body growth is handled by the clamp and expand control.
- The bottom CTA wraps.

### Cases

- **Component:** `src/modules/Cases/index.tsx`
- **JSON:** `cases.*`, `hero.nicheTags.*`
- **Hardcoded data:** titles, tags, featured IDs, NDA state and assets in `src/modules/Cases/data.ts`

Visible English:

- Eyebrow: `Our work`
- Heading: `Five platforms that had to start empty.`
- Subheading: `P2P, community and logistics. Some are under NDA — we'll walk you through those on a call.`
- Banner: `Some projects are under NDA — we'll walk you through those on a call.`
- Featured titles: `YachtMate`, `SharingGround`, `Pachaca`
- Featured tags: `Community`, `P2P`, `P2P`
- YachtMate summary: `Private network for yacht club members with real-time communication.`
- SharingGround summary: `Peer-to-peer item sharing platform with trust and logistics system.`
- Pachaca summary: `A full-stack cleaning and dry-cleaning service platform – mobile apps, web service, and an internal management system built from scratch.`
- Card hover label: `View case study →`
- Per-card prompt: `Same problem?`
- Per-card CTA: `Let's talk about your day one →`
- Listing CTA: `View all cases`
- Lower prompt: `See the same cold-start problem in your product?`
- Lower link: `Let's talk about your day one →`
- CTA-band heading: `Building something two-sided?`
- CTA-band body: `Marketplace, P2P product, member network, multi-party logistics — if your product needs strangers to trust each other, that's our whole job.`
- CTA-band buttons: `Book a call`, `Get a quote`

Structural constraints:

- Homepage list is fixed to exactly three IDs.
- Grid is one, two, then three columns.
- Card summaries are clamped to two lines.
- Card titles are not clamped.
- The section contains a banner and three separate CTA areas.

30%-longer risks:

- Summary text is silently hidden by the two-line clamp.
- Longer titles make card heights uneven.
- CTA groups wrap safely.

### Consultation

- **Component:** `src/modules/Consultation/index.tsx`
- **JSON:** `consultation.*`

Visible English is listed in full in section 6 below.

Structural constraints:

- Exactly two cards.
- One column on mobile, two columns from `sm`.
- The Cold Start Audit has seven bullets; Discovery has four.
- Badges are uppercase 11px text.

30%-longer risks:

- Badge wrapping misaligns the tops of the two cards.
- More bullet wrapping makes the already longer audit card substantially taller.

### Blog

- **Server component:** `src/modules/Blog/BlogSection.tsx`
- **Client component:** `src/modules/Blog/BlogSectionClient.tsx`
- **JSON:** `blog.*`
- **Runtime source:** Ortvest CMS via `src/lib/cms-api.ts`

Static visible English:

- Eyebrow: `Blog`
- Heading: `Insights & Updates`
- Subheading: `Thoughts on design, development, and building digital products.`
- Filter: `All`
- Featured CTA: `Read article`
- Read-time template: `{n} min read`
- Listing CTA: `View all articles`

Runtime CMS text:

- Tag filter labels.
- Post titles, tags, excerpts, author names and publication dates.
- Featured excerpt is truncated by code at 150 characters.
- Grid excerpts are truncated by code at 100 characters.
- Missing author falls back to hardcoded `Ortvest`.

Structural constraints:

- Entire section is omitted if the server CMS call returns no posts.
- First filtered post is featured; only the next three enter the grid.
- Featured card becomes two columns at `md`.
- Grid becomes two columns at `sm`, three at `lg`.

30%-longer risks:

- Featured title overlays a cover image inside `max-w-[280px]`.
- Author/date/read-time share one flex row and can crowd.
- Excerpts remain capped regardless of source length.

### FAQ

- **Component:** `src/modules/FAQ/index.tsx`
- **JSON:** `faq.*`

Visible English is listed in full in section 5 below.

Structural constraints:

- Exactly eight hardcoded keys, `q1` through `q8`.
- Single-open accordion inside `max-w-[680px]`.
- Open answer containers have `max-h-[300px]`.

30%-longer risks:

- An answer taller than 300px is clipped because the panel is not scrollable.
- Questions wrap safely in the flex row.

### Contact

- **Component:** `src/modules/Contact/index.tsx`
- **Form:** `src/modules/Contact/layout/Form/index.tsx`
- **JSON:** `contact.*`

Visible English:

- Eyebrow: `Contact`
- Heading: `Tell us what you're building.`
- Body: `Include who's on each side of your product and which one you can reach today. That single detail tells us more than a full spec.`
- Trust captions: `Reply within 24h`, `No spam, ever`, `Free 30-min discovery call`
- Steps label: `What happens next`
- The four steps are listed verbatim in section 4.
- Field: `Name`; placeholder: `Your name`
- Field: `Email`; placeholder: `you@company.com`
- Field: `Project type`; marker: `(optional)`
- Field: `Budget`; marker: `(optional)`
- Field: `Consultation type`
- Field: `Message`; placeholder: `What are you building and when do you want to launch?`; marker: `(optional)`
- Legal sentence: `I agree to the Privacy Policy and Terms of Use`
- Submit: `Send message`
- Submit-row caption: `Reply within 24h`
- Success heading: `Message sent!`
- Success body: `We'll get back to you within 24h.`

Structural constraints:

- Two columns at `lg`: four steps left, form right.
- Project type is multi-select; budget is single-select; consultation has a default.
- Option pills wrap.
- Name and email share two columns from `sm`.
- Successful submission replaces the form.

30%-longer risks:

- Trust captions can form multiple uneven rows.
- Longer consultation labels can wrap inside pills.
- Form/help/legal text otherwise wraps naturally.

### Footer

- **Component:** `src/modules/Footer/index.tsx`
- **JSON:** `footer.*`, `nav.*`
- **Hardcoded:** company, email, address, social labels and copyright.

Visible English:

- Logo alt: `Ortvest`
- Runtime copyright: `© {current year} Ortvest`
- Legal links: `Privacy Policy`, `Terms of Use`
- Column labels: `Navigation`, `Language`, `Contact`
- Navigation: `About`, `Team`, `Services`, `Cases`, `Blog`, `FAQ`
- Email: `contact@ortvest.com`
- Social labels: `LinkedIn`, `Instagram`
- Company: `Ortvest sp. z o.o. | NIP: 7812111756 | KRS: 0001244461`
- Address: `ul. Szamarzewskiego 21/2, Poznan, Poland`

Structural constraints:

- Two columns at `sm`, four at `lg`.
- Mobile uses a two-column nav plus a separate language/contact row.
- Company and address are centered fixed lines but can wrap.

30%-longer risks:

- Legal/company lines become uneven multi-line blocks.
- The mobile language/email/social row is tight.

### Modal host

- **Component:** `src/modules/Modals/index.tsx`
- **Children:** `features/SuccessfullySentModal/index.tsx`, `features/SendFailedModal/index.tsx`
- **JSON:** `modals.*`
- **Hardcoded accessibility label:** `Close`

Conditionally visible English:

- Success: `Message sent`; `We'll get back to you within 24 hours.`
- Error: `Something went wrong`; `Please try again later or contact us by email.`

Structural constraints:

- Two mutually state-controlled overlays, each in a `max-w-md` panel.
- These belong to the older Redux modal flow; the active contact form has its own inline success state.

30%-longer risks:

- Both panels have enough width and natural wrapping; no obvious clipping constraint.

## 3. Case studies

Cases are defined in `src/modules/Cases/data.ts`. Localized case-detail narratives live under `caseStudies.*` in each locale JSON. Per-case feature/gallery configuration is in `src/modules/Cases/caseStudyConfig.ts`.

| Name | Industry | Service tags | Appears in listing/filter | Homepage featured | NDA |
|---|---|---|---|---|---|
| YachtMate | `community` | — | Yes: All, Community | Yes | No |
| SharingGround | `p2p` | — | Yes: All, P2P | Yes | No |
| ProfitCraft | `community` | — | Yes: All, Community | No | No |
| ProfitCraft Auto | `community` | — | Yes: All, Community | No | No |
| Ski&Sail Club | `community` | — | Yes: All, Community | No | No |
| Navexa | `logistics` | `marketing` | Yes: All, Logistics | No | Yes |
| Teya Logistics | `logistics` | — | Yes: All, Logistics | No | No |
| Pachaca | `p2p` | — | Yes: All, P2P | Yes | No |
| Gambit | — | `brand` | Yes: All only | No | No |
| [Re.] skin&hair | — | `brand` | Yes: All only | No | No |
| Navexa - Logo | — | — | No; excluded from `portfolioGridCases` | No | Yes |
| Ortvest | — | — | No; excluded from `portfolioGridCases` | No | No |

Exact `CasesListingClient.tsx` filter keys:

1. `all` — label `All`
2. `p2p` — label `P2P`
3. `community` — label `Community`
4. `logistics` — label `Logistics`

`cases.filterIndustries.all` contains `All projects`, but the listing uses `cases.page.filter.all` (`All`) instead.

`mie` has `cases.items.mie`, a complete `caseStudies.mie` translation, and an entry in `caseStudyConfig.ts`, but no `CaseItem` in `data.ts`; it therefore has no generated case route.

## 4. Contact form

Active form: `src/modules/Contact/layout/Form/index.tsx`.

### Project types

| Union value | English label |
|---|---|
| `p2p` | `P2P` |
| `community` | `Community & clubs` |
| `logistics` | `Logistics` |
| `other` | `Other` |

The form permits multiple project types.

### Budgets

| Union value | English label |
|---|---|
| `10k25k` | `€10–25k` |
| `25k50k` | `€25–50k` |
| `50k100k` | `€50–100k` |
| `100k` | `€100k+` |
| `unsure` | `Not sure yet` |

The form permits one budget selection.

### Consultation options

| Union value | English label |
|---|---|
| `discovery` | `Discovery Call (Free)` |
| `strategy` | `Cold Start Audit (€199)` |

`discovery` is the default.

### “What happens next”

1. **You send the details** — `What you're building, who it's for, rough budget and timing.`
2. **We reply in 24h** — `Relevant cases and an honest read on whether we're the right studio.`
3. **Free 30-min call** — `Scope, cold start and next steps.`
4. **Proposal** — `Fixed scope, fixed price, clear timeline. If it fits, we start.`

## 5. FAQ

Order is fixed by `FAQ_KEYS` in `src/modules/FAQ/index.tsx`.

1. **Will you build my Uber for X?**

   `Maybe. But on the first call we'll ask which side you can get 100 of by hand, without ads. If there's no answer, the product isn't ready and we'll say so instead of taking the money.`

2. **Why only three industries?**

   `Because a fourth would be a claim we can't back with work. We build platforms where participants have to find and trust each other — that shape repeats across P2P, clubs and logistics. Outside it we'd be guessing on your budget.`

3. **How much does a platform cost?**

   `It depends on the trust model, number of participant roles and operational tooling. We'll give you a rough budget range on the first call and a fixed price after scope. If a prototype is the smarter first step, we'll say so.`

4. **Can I hire you for just design, or just development?**

   `Yes. Design-only, build-only, or marketing-only all work. We'll scope it accordingly.`

5. **Do you work with existing codebases?**

   `Yes. We'll audit first and give you an honest verdict, including "rewrite" or "keep your current team."`

6. **What does working together look like?**

   `Discovery → design → build → launch. One-week sprints, a demo every sprint. You always know what shipped and what's next.`

7. **What happens after launch?**

   `Retainers for ongoing development and iteration. Most clients stay — but the first version is the one that decides whether there's anything to iterate on.`

8. **How do we start?**

   `Book the free call or send the form. We reply within 24 hours with relevant cases and an honest read on fit.`

## 6. Consultation section

Section copy:

- Eyebrow: `Consultation`
- Heading: `Start with the question that kills most platforms.`
- Subheading: `Choose a free fit check or a focused audit of your cold-start problem.`
- Repeated inclusion label: `What's included`

### Discovery Call

- Badge: `YOUR FIRST STEP`
- Name: `Discovery Call`
- Description: `Tell us what you're building. We'll tell you whether it's ours, and whether it should exist.`
- Price: `Free`
- Duration: `30 min`
- Bullets:
  1. `What you're building and for whom`
  2. `Whether we're the right studio — often we're not`
  3. `Rough scope, timeline and budget range`
  4. `Straight answers, no deck`
- CTA: `Book a call`

### Cold Start Audit

- Badge: `Most popular before large projects`
- Name: `Cold Start Audit`
- Description: `Ninety minutes on the one question most teams skip: who shows up on day one, and why do they stay while the other side is still empty?`
- Price: `€199`
- Duration: `90 min`
- Bullets:
  1. `Which side you seed first, and how`
  2. `Where similar platforms died, specifically`
  3. `Trust, verification, tech stack and architecture`
  4. `Full roadmap with milestones and risks`
  5. `Cold-start risk assessment`
  6. `Recorded, plus a written PDF summary`
  7. `Credited in full toward the project`
- CTA: `Book the audit`

## 7. Metadata and structured data

Current English global metadata from `messages/en.json`:

- Title: `Ortvest — platforms for P2P, communities and logistics`
- Description: `We build marketplaces, P2P products and member networks — the kind that only work once strangers trust each other. Design, development and go-to-market from Poznań, Poland.`
- OG title: `Ortvest — the hard part was never the code`
- OG description: `We build marketplaces, P2P products and member networks — the kind that only work once strangers trust each other.`

`src/app/[locale]/layout.tsx` emits:

1. **Organization**
   - Name: `Ortvest`
   - URL: `https://www.ortvest.com`
   - Description: `Ortvest builds marketplaces, P2P products and member networks where participants need to find and trust each other.`
   - `sameAs`: empty array.
2. **WebSite**
   - Name and URL as above.
   - Declares a `SearchAction` at `https://www.ortvest.com/?q={search_term_string}`.
3. **Ortvest Services ItemList**
   - Six entries: `UI/UX Design`, `Web Design`, `App Design`, `Web Development`, `Mobile Development`, `SEO & Marketing`.
   - It does not declare `numberOfItems`.
   - It does not include an industry list.
4. **FAQPage**
   - Eight questions and answers, sourced from the active locale’s `q1`–`q8` / `a1`–`a8`.

The JSON-LD contains no platform count, project count, team count, or explicit P2P/community/logistics industry list. The Organization description does claim marketplaces, P2P products and member networks. The declared site-search action has no corresponding search UI or search results route in this codebase.

## 8. Locale parity

Count method: recursive leaf key paths; arrays count as the value of their containing JSON key rather than creating numeric key paths.

| Locale file | Leaf keys |
|---|---:|
| `messages/en.json` | 1047 |
| `messages/pl.json` | 1047 |
| `messages/ua.json` | 1047 |

- Keys present in English but missing from Polish: none.
- Keys present in English but missing from Ukrainian: none.

This is structural parity only. It does not assert that values are translated, current, or semantically equivalent.

## 9. Client-side data

| Homepage content | Source/timing | Present in initial server HTML? |
|---|---|---|
| Reviews | `Reviews` calls `fetch('/api/reviews')` in `useEffect` after hydration. | No review records. Initial output is three skeleton cards; the whole section disappears if the response is empty. |
| Blog posts | `BlogSection` calls the CMS from an async server component with 60-second revalidation. | Yes, when the CMS returns posts: the server response contains the blog markup/data passed to the client component. If the CMS returns no posts or production lacks `ORTVEST_CMS_API_URL`, the section is absent. |
| Cases | Imported synchronously from `src/modules/Cases/data.ts`. | Yes. They are not fetched at runtime. |
| Services tab selection | Reads `?tab=` using `useSearchParams`; all copy is bundled/i18n data. | The `Suspense` fallback is an empty dark section while the client boundary resolves; no network content fetch occurs. |
| Header scroll state | Browser scroll listener. | Header content is present; only styling changes after scrolling. |
| Contact | No content fetch. Submission posts to `/api/contact`. | Yes. |
| FAQ, Team, Consultation, Footer, Hero | No runtime data fetch. | Their client components are SSR-rendered with locale messages before hydration. |
| Modal text | Redux-controlled local UI state. | Modal host is present, but neither overlay is visible initially. |

No homepage case, FAQ, team, service, consultation, contact, header, or footer copy comes from the CMS.

## 10. Pages beyond the homepage

Public/page routes:

- `/[locale]` — homepage.
- `/[locale]/cases` — masonry portfolio listing with All/P2P/Community/Logistics filters and the contact section.
- `/[locale]/cases/[slug]` — generated case detail for each item in `cases[]`.
- `/[locale]/blog` — server-fetched CMS blog listing.
- `/[locale]/blog/[slug]` — server-fetched CMS article and related posts.
- `/[locale]/privacy-policy` — hardcoded English privacy policy; `noindex, nofollow`.
- `/[locale]/terms-of-use` — hardcoded English terms; `noindex, nofollow`.
- `/[locale]/leave-a-review` — review submission form; `noindex, nofollow`.
- `/[locale]/[...rest]` — catch-all that calls `notFound()`.
- Locale-specific and root `not-found` components — 404 pages.
- `/robots.txt` — allows the site, disallows `/api/`, links the sitemap.
- `/sitemap.xml` — contains only the three locale homepage URLs.
- `/icon` — generated 32×32 favicon.
- `/apple-icon` — generated 180×180 Apple icon.

API routes:

- `GET/POST /api/reviews` — list published reviews or submit an unpublished review.
- `GET /api/admin/reviews` — admin review list.
- `PATCH/DELETE /api/admin/reviews/[id]` — publish/unpublish or delete.
- `POST /api/contact` — contact submission to MongoDB plus optional external backend/websocket notification.
- `POST /api/cms-subscribe` — proxy to the CMS Stripe checkout endpoint.

`src/modules/CMSPage/index.tsx` and `src/modules/OrtvestCMS/index.tsx` contain a complete CMS marketing UI, but no route mounts either component.

## 11. Anything I didn't ask about

Literal inconsistencies and production-visible/code-visible gaps:

1. The homepage heading says `Five platforms that had to start empty.`, while the homepage displays three cards and the `/cases` listing contains ten portfolio items. Five is not derived from either list.
2. The stats bar hardcodes `5`, `1`, and `3`; the team heading embeds `3 people.` All four numbers are independent of source arrays or CMS data.
3. The Reviews section initially emits skeletons and then disappears if `/api/reviews` returns no rows. It is not absent from the initial render.
4. The blog section disappears entirely when the CMS returns no posts. In production, `src/lib/cms-api.ts` resolves to no CMS base URL if `ORTVEST_CMS_API_URL` is missing.
5. `mie` has case copy/configuration but no `CaseItem`, so there is no `/cases/mie` generated from `data.ts`.
6. `Navexa - Logo` is marked NDA and included in `cases[]`, but excluded from the listing. `Navexa` is also marked NDA, appears in the listing as non-clickable, while its detail route still exists.
7. Homepage `CaseCard` builds links as `/cases/{id}` without the locale prefix. The listing card builds `/{locale}/cases/{id}`. The homepage links therefore do not follow the app’s locale-prefixed route convention.
8. The root `<html>` language is fixed to `en`; the locale is assigned only to an inner `<div lang={locale}>`. PL/UA documents still announce English at the document root.
9. Header services-dropdown sublabels, service tags, process tags, technology names and several accessibility labels are hardcoded English and remain English in PL/UA.
10. Privacy Policy and Terms are hardcoded English under all locale routes.
11. The JSON-LD advertises a `SearchAction` using `/?q=…`, but no search UI or search-result handling exists.
12. Organization JSON-LD has `sameAs: []`, while the footer links to LinkedIn and Instagram.
13. The sitemap contains only three homepage URLs; it omits cases, case details, blog pages and articles.
14. The localized 404 links include `#process` and `#technologies`, but those standalone homepage sections are commented out. The tabbed Services section does contain process and technology tabs, but those fragment IDs are not separate rendered sections.
15. Footer address text is `Poznan, Poland`, while current English metadata and approach copy use `Poznań, Poland`.
16. ProfitCraft Auto image URLs contain `pachcaca` filenames.
17. Ski&Sail Club is categorized as `development` while its case data contains both `design` and `development` sections.
18. `cases.filterIndustries.all` says `All projects`, but the listing uses another key whose visible label is `All`.
19. `brandSectionTitle`, `emptyState`, and `beFirstButton` exist in case JSON but are not referenced by current source.
20. `servicesSection.expanding`, `comingSoon`, and `letsTalk`, plus the old `team.*.years` fields, remain in JSON but are not rendered.
21. The active contact form submits the localized budget label and localized consultation label, not their stable union keys.
22. The Privacy Policy’s stated budget categories do not match the active form’s current budget options.
23. The active form uses an inline success state; `src/modules/Modals` still mounts separate Redux success/error overlays belonging to an older flow.
24. `contact.form.email.placeholder` is `you@company.com` in all three locale files.
25. `cmsPage.pricing.subscribeNote` contains the phrase `Stripe test mode`, but the CMS page components are not routed.
26. Google Analytics ID `G-T62XD7Y6CM`, LinkedIn Insight ID `9341226`, and the CookieYes script ID are hardcoded in `src/app/layout.tsx`.
27. No static English string audited above exceeds 300 characters, so no item required a `[TRUNCATED]` marker. Runtime review and CMS post text has no repository-level maximum; blog excerpts are truncated by rendering code.
