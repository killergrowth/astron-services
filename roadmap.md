# Astron Services — SEO/GEO Audit & Launch Roadmap
**Date:** 2026-10-21 | **Target go-live:** 2026-10-23 | **Track:** B (WordPress migration — existing live site at astronservicesks.com must be redirected, not just replaced)

---

## ⚠️ Critical Context — Read First

`astronservicesks.com` is **not a blank domain**. It is currently a live, indexed WordPress site (12 URLs: 9 pages + 3 blog posts, Rank Math SEO, actively crawlable). The new PKG002 build (staging: `astron-services.pages.dev`) is excellent and ready, but launching it requires a **controlled migration with redirects**, not a simple DNS point. Skipping the redirect map risks losing whatever ranking/backlink equity the old site has and creates duplicate-content/404 confusion for Google.

**2 days is tight for Track B, but doable** if the redirect map and DNS access happen today (10/21) and tomorrow (10/22).

---

# PART 1 — SEO & GEO Audit

## 1. Current Live Site (astronservicesks.com) — What's There Now

Discovered via live sitemap_index.xml (Rank Math):

**Pages (9):**
| URL | Notes |
|---|---|
| `/` | Homepage |
| `/about-hvac-experts-in-wichita-ks/` | About |
| `/plumbing-service/` | Service page |
| `/hvac-contact-wichita/` | Contact |
| `/request-service/` | Lead form |
| `/hvac-services-in-wichita-astron-services/` | Services hub |
| `/hvac-repair-installation-wichita/` | Service page |
| `/indoor-air-quality-solutions-in-wichita/` | Service page |
| `/hvac-reviews-in-wichita/` | Reviews |

**Blog posts (3):**
| URL |
|---|
| `/home-services-tips-in-wichita/` |
| `/thinking-about-getting-new-sink-faucets/` |
| `/why-astron-services-was-started/` |

**robots.txt:** standard WP (`Disallow: /wp-admin/`), sitemap declared, no blanket block — this site is actively crawlable and very likely has GSC history/impressions on these 12 URLs.

**Action required:** Assume these 12 URLs have some indexation/backlink equity until proven otherwise (needs GSC access on the live property — see Gaps below). Every one of them needs a 301 to its best-match equivalent on the new site, or a deliberate 410 if genuinely no equivalent exists. This is the single most important pre-launch gap right now.

---

## 2. New Build (astron-services.pages.dev) — Technical SEO

Pulled from `technical-seo/baseline-audit-2026-10-05.json` (9/10 checks passed) + spot-checked `dist/` HTML directly on 2026-10-21. Still accurate:

| Check | Status |
|---|---|
| URL structure | ✅ Pass |
| Canonical tags | ✅ Pass — self-referencing, correct production domain (`astronservicesks.com`) baked in on every page already |
| H1/keyword alignment | ✅ Pass |
| Schema markup | ✅ Pass — `HVACBusiness` + `FAQPage` + `Article` on homepage; `Service` + `FAQPage` + `BreadcrumbList` on all location-service pages; `HVACBusiness` + `BreadcrumbList` on `/services/` hub |
| Alt text | ✅ Pass — 0 missing |
| Tel links | ✅ Pass — `tel:3169250125` correct |
| OG/Twitter tags | ✅ Pass — full 4-tag set on all pages |
| NAP consistency | ✅ Pass — 5025 E. Kellogg, Wichita KS / (316) 925-0125 consistent across schema, header, footer |
| Robots/noindex | ✅ Correct for pre-launch — `<meta name="robots" content="noindex, nofollow">` site-wide, confirmed live on homepage + spot-checked location page |
| Duplicate titles | ✅ Fixed 2026-10-05 (was homepage/`/wichita/` dupe) — reverified 0 duplicates across 96 pages |
| Broken internal links | ✅ Fixed 2026-10-05 (added `/services/` hub) — 0 broken links site-wide (excl. `/blog/`, expected until first post) |
| Orphan pages | ✅ Pass — every page has ≥1 inbound internal link |

**Site structure:** 8 services × 9 cities (Wichita, Andover, Bel Aire, Derby, Goddard, Haysville, Maize, Mulvane, Park City, Valley Center) = 72 location-service pages + 8 service pillars + 9 city hubs + homepage/about/contact/service-areas/services-hub/privacy = **96 total pages**. Reviews embedded homepage (5.0 rating, 11 reviews visible).

### Not yet run (flagged in 10/5 baseline, still open):
- **Schema validation** — Google Rich Results Test pass not done
- **PageSpeed Insights baseline** — no mobile/desktop score on record
- **Core Web Vitals lab data** — no baseline
- **GSC sitemap submission** — blocked until domain is live (expected)

---

## 3. GEO (AI Visibility) Assessment

No formal KillerGEO score has been run. Qualitative read based on live staging content:

**Strengths for AI answer engines (ChatGPT, Perplexity, Google AIO):**
- Strong FAQ schema on every service-location page — directly answers "does X do Y in Z" pattern queries AI engines favor
- Clear NAP + service area entities (Sedgwick County, 9 named cities) — good for local entity grounding
- RUUD authorized dealer + Ultravation authorized dealer — credential signals AI engines use for trust/E-E-A-T
- Specific differentiators stated directly (locally owned, licensed/insured, honest pricing) — quotable by AI summarizers

**Gaps:**
- **No author/expertise bios** — HVACBusiness schema has no named technician/owner entity (Brian is named in reviews but not structured as a Person/founder anywhere)
- **Thin "why us" content** vs. competitors — current site has only 4 bullet differentiators; AI engines reward depth (certifications detail, years in business, specific brands/model lines serviced)
- **No case studies / before-after content** — nothing demonstrating outcomes, which AIO/Perplexity increasingly cite
- **Blog is empty on new build** — `/blog/` has no posts yet; old WP site has 3 posts that should be ported or rewritten, not lost
- **No FAQ hub page** — FAQs exist per-service-page but there's no consolidated `/faq/` page for broad informational queries

---

## 4. Launch-Readiness Gaps (Blockers for Oct 23)

| # | Gap | Severity | Owner |
|---|---|---|---|
| 1 | No redirect map for 12 live WP URLs → new site | **Blocker** | Tyler N / assigned junior |
| 2 | GSC access/data on current `astronservicesks.com` property not confirmed — need to know actual impressions/clicks per URL before finalizing redirect priority | **Blocker** | Tyler N (needs Brian's GSC access or GBP-linked verification) |
| 3 | `noindex,nofollow` still live site-wide — must flip to index on launch day only | Launch-day step, not a blocker | Tyler N approval required |
| 4 | DNS/domain not yet pointed at CF Pages (sites.json shows `domain: ""`) | **Blocker** | Tyler N (registrar access needed) |
| 5 | PageSpeed Insights / CWV baseline not run | Should-fix, not launch blocker | Phil Jr |
| 6 | Schema Rich Results validation not run | Should-fix, not launch blocker | Phil Jr |
| 7 | 3 existing blog posts on old site have no equivalent on new build | Content gap | Tyler B / content |
| 8 | No GA4/GSC property set up for the new domain yet | **Blocker** (must be pre-launch per SOP) | Tyler N |

---

## 5. What's Already Solid — No Action Needed

- Core technical SEO (schema, canonicals, NAP, alt text, OG tags) — launch-ready as-is
- Site architecture / URL structure — clean, matches SOP canonical format
- Internal linking — no orphans, no broken links
- Mobile-responsive build (standard KG build system, verified pattern)

---

# PART 2 — Launch Roadmap to Oct 23

## Day 1 — Today (10/21)

**Owner: Tyler N (unless delegated)**

- [ ] **Get GSC access on current `astronservicesks.com` property** (or verify via GBP-linked domain). Need: which of the 12 live URLs actually have impressions/clicks. This determines redirect priority — don't guess.
- [ ] **Confirm domain registrar access.** sites.json shows `domain: ""` — need to know: is `astronservicesks.com` on Cloudflare already, or elsewhere? Who has login? This has to be resolved today or Oct 23 is not realistic.
- [x] **Redirect map CONFIRMED by Tyler B (2026-10-21).** All 12 URLs locked, including the 3 previously-ambiguous rows (plumbing/HVAC repair → `/services/` hub, reviews → `/`):

| Old URL | → New URL | Status |
|---|---|---|
| `/` | `/` | ✅ |
| `/about-hvac-experts-in-wichita-ks/` | `/about/` | ✅ |
| `/plumbing-service/` | `/services/` | ✅ confirmed |
| `/hvac-contact-wichita/` | `/contact/` | ✅ |
| `/request-service/` | `/contact/` | ✅ |
| `/hvac-services-in-wichita-astron-services/` | `/services/` | ✅ |
| `/hvac-repair-installation-wichita/` | `/services/` | ✅ confirmed |
| `/indoor-air-quality-solutions-in-wichita/` | `/indoor-air-quality/` | ✅ |
| `/hvac-reviews-in-wichita/` | `/` | ✅ confirmed |
| `/home-services-tips-in-wichita/` (blog) | `/blog/` | ✅ |
| `/thinking-about-getting-new-sink-faucets/` (blog) | `/blog/` | ✅ |
| `/why-astron-services-was-started/` (blog) | `/about/` | ✅ |

- [x] **Redirect map implemented and deployed.** Built as `lib/build-redirects.js`, wired into `build.js` (runs automatically every build — generates `dist/_redirects`). Deployed to staging 2026-10-21, verified working: `/hvac-contact-wichita/` → 301 → `/contact/` → 200; unmapped URLs correctly 404. Will ship to production on next prod deploy automatically — no manual step needed on launch day.
- [ ] **Set up GA4 + GSC property for the new domain** now (property creation doesn't require the site to be live yet — can be pre-verified via DNS TXT record).
- [ ] **robots.txt gap found during staging verification (2026-10-21):** live staging `robots.txt` is NOT the KillerGrowth standard template (SOP-WEB-BUILD) — it's showing a generic AI "content signals" policy file instead, with no explicit crawler allow rules or sitemap reference. Needs fixing before launch — swap in standard robots.txt template + pages.dev crawler block (`_worker.js`/`_routes.json`) per SOP.
- [ ] **GSC access on current `astronservicesks.com` property** (or verify via GBP-linked domain). Need: which of the 12 live URLs actually have impressions/clicks — informs priority if anything looks off post-launch.
- [ ] **Confirm domain registrar access.** sites.json shows `domain: ""` — need to know: is `astronservicesks.com` on Cloudflare already, or elsewhere? Who has login? This has to be resolved today or Oct 23 is not realistic.

## Day 2 — Tomorrow (10/22)

**Owner: Tyler N / assigned junior**

- [ ] Implement the final redirect map as Cloudflare Pages `_redirects` or Worker middleware (match pattern used on G2BC v2 — `functions/_middleware.js`, not static `_redirects`, since this is a Functions-bundled project)
- [ ] Point domain `astronservicesks.com` at the new Cloudflare Pages project (`astron-services`) — **do not delete/touch the old WP hosting until redirects are verified working**
- [ ] Test all 12 redirects manually (old URL → correct new URL, single hop, 301 status)
- [ ] Run PageSpeed Insights (mobile + desktop) on staging — log baseline
- [ ] Run Google Rich Results Test on homepage + 1 service-location page — confirm schema validates clean
- [ ] Port or rewrite the 3 existing blog posts onto the new build (even minimal versions — don't just drop URLs with content/backlink history)
- [ ] Decide: redirect blog posts straight to `/blog/` hub on day 1 if full ports can't be done in time, upgrade later — do not let this block the Oct 23 date

## Launch Day — 10/23

- [ ] Flip DNS / confirm custom domain active on Cloudflare Pages
- [ ] Confirm `https://astronservicesks.com` resolves cleanly within 30 min of flip
- [ ] **Flip `noindex,nofollow` → remove it site-wide** (currently `<meta name="robots" content="noindex, nofollow">` on every page — this is the one step that actually makes the site indexable, must happen same day, not before)
- [ ] Verify `robots.txt` on live domain is the new build's version, not stale
- [ ] Submit sitemap.xml in GSC for the new property
- [ ] Manually request indexing (GSC URL Inspection) on: homepage, `/services/`, top 3 service pillars (AC repair, furnace repair, water heater), `/wichita/`
- [ ] Test all 12 redirects again on the now-live domain (not just staging)
- [ ] Confirm no old WP admin URLs (`/wp-admin/`, `/wp-login.php`) resolve on the new live domain
- [ ] Verify CF preview domain (`astron-services.pages.dev`) is NOT indexable (should still show noindex or be blocked — only the custom domain goes live/indexed)

## First 2 Weeks Post-Launch

- [ ] Daily GSC Coverage check (days 1-3 especially) — watch for unexpected "Excluded" pages or the 12 old URLs showing as still-indexed duplicates
- [ ] Confirm Googlebot discovering new site (GSC Crawl Stats)
- [ ] Monitor Core Web Vitals
- [ ] Begin KillerSEO scoring pass on the 72 location-service pages (location pages should stay noindex individually until Score 85+ per SOP — **note:** homepage/service-pillars/city-hubs/blog are fine to index day one; only the hyper-local location-service combo pages follow the gradual flip rule)
- [ ] Write a short GEO content pass: add owner/technician bio (Person schema), expand "why us" content, add a consolidated FAQ hub page — closes the GEO gaps flagged in the audit without blocking launch

---

## Open Questions to Resolve With Corrie/Brian Today

1. Who currently manages the `astronservicesks.com` domain registrar/DNS — is it already on Cloudflare?
2. Does Brian (client) have GSC access on the current site, or do we need to request it be added?
3. For the 3 "Needs review" redirect rows above — confirm best-match targets.
4. Is the old WordPress hosting staying active post-launch (as a fallback) or being canceled immediately? (Recommend: keep it running read-only for 2 weeks post-cutover as a safety net, cancel after.)

---

*Built against `SOPs/SOP-SITE-LAUNCH-INDEXING.md` Track B checklist + `SOPs/SOP-TECHNICAL-SEO-ONGOING.md`.*
