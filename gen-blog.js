/**
 * gen-blog.js — Generates 52 blog post .md files and blog-index.json
 * for Frosty's Heating and Air
 * PKG002 Deterministic Blog Cluster Template
 */
const fs   = require('fs');
const path = require('path');
const ROOT = __dirname;
const BLOG = path.join(ROOT, 'blog-posts');

function write(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
}

// 52 blog posts: 9 services x 6 cluster topics, trim to 52
// Cluster: cost, signs, how-it-works, diy-vs-pro, local-angle, common-mistakes

const posts = [
// === FURNACE REPAIR ===
{
  slug: 'furnace-repair-cost-coeur-d-alene',
  title: 'Furnace Repair Cost in Coeur d\'Alene: What to Expect in 2026',
  tags: ['furnace repair','cost guide','Coeur d\'Alene'],
  imagePrompt: 'An HVAC technician in work uniform replacing a furnace igniter component in a north Idaho home utility room, focused work, residential setting. No text, no logos, no signs in the image.',
  excerpt: 'Furnace repair in Coeur d\'Alene runs $85-$150 for diagnostics. Common parts: igniter $150-$300, control board $200-$600. Full replacements $3,500-$8,000.',
  body: `# Furnace Repair Cost in Coeur d'Alene: What to Expect in 2026

Furnace repair in Coeur d'Alene typically starts with a diagnostic service call of $85 to $150. What you pay after that depends on what's actually wrong with your system.

Most furnace failures in Kootenai County fall into a predictable set of problems. Here's what each one costs to fix.

## Common Furnace Repair Costs in Coeur d'Alene

**Igniter replacement: $150–$300**
The igniter is one of the most common furnace failures, especially on systems over 10 years old. It's a relatively simple fix when done by a technician with the right part on hand.

**Flame sensor cleaning or replacement: $80–$200**
A dirty flame sensor causes the furnace to light briefly then shut off. Cleaning takes 20 minutes. Replacement costs slightly more.

**Control board replacement: $200–$600**
The circuit board that controls your furnace's functions. More expensive to replace, but typically a longer-term fix than most other repairs.

**Heat exchanger replacement: $400–$900**
A cracked heat exchanger is a safety issue — it can allow carbon monoxide into your home's air. At this repair cost, it's often worth comparing against full furnace replacement, particularly if the system is over 15 years old.

**Blower motor: $300–$700**
The motor that moves heated air through your ductwork. Failure means heat isn't distributed even if the furnace is firing.

**Full furnace replacement: $3,500–$8,000**
If your system is aging or the repair cost approaches this range, replacement is typically the better long-term financial decision.

## What Drives Furnace Repair Costs Up in North Idaho

Coeur d'Alene's climate is harder on HVAC equipment than most people realize. January average lows sit near 22°F, and furnaces run from October through April — sometimes six or more hours per day during cold snaps. That's a lot of run time. Systems that don't get annual maintenance accumulate wear faster.

The housing stock in older CdA neighborhoods — the Sherman Avenue area, Tubbs Hill adjacent streets, the Canfield area — includes a lot of furnaces installed in the 1990s and early 2000s. Many of those systems are now 20+ years old and approaching the point where the next major repair is a replacement conversation.

## How Flat-Rate Pricing Works

Frosty's Heating and Air quotes flat-rate prices before starting any work. You see the number, you approve it, and that's what's on the invoice. No tracking how long the job takes and billing you accordingly.

## When to Repair vs. Replace

**Repair makes sense when:**
- The system is under 15 years old
- The repair cost is under 40% of a new unit
- The heat exchanger is intact

**Replacement makes more sense when:**
- The heat exchanger is cracked
- The system is over 18–20 years old
- Multiple components are failing in the same season
- The repair cost exceeds half the cost of a new system

## Frequently Asked Questions

**Is emergency furnace repair more expensive in Coeur d'Alene?**
After-hours emergency calls carry a service call fee that's higher than a scheduled appointment. The flat-rate repair price still applies to the actual work. We're upfront about the emergency fee before dispatching.

**Does the brand of furnace affect repair cost?**
Parts costs vary by brand and age of system. Older or uncommon brands may have harder-to-source parts. Most major brands — Carrier, Trane, Lennox, Goodman, Rheem — have readily available parts in the Kootenai County market.

**Can I get a furnace repair estimate before a technician comes out?**
We can give you a rough range based on your description of the problem, but we can't quote a flat rate without diagnosing the specific issue. Most furnace problems require hands-on diagnosis.

**How long does furnace repair take?**
Most repairs complete in 1–3 hours. Heat exchanger repairs or blower motor replacements can take longer. Emergency calls aim to resolve in a single visit.

**Is it worth fixing a furnace that's 20 years old?**
It depends on the repair. A $150 igniter replacement on a 20-year-old furnace that's otherwise working fine may be worth it. A $900 heat exchanger replacement on a 20-year-old system almost never is.

Call [Frosty's Heating and Air](/) at [(208) 555-0194](tel:2085550194) for furnace repair anywhere in Kootenai County. See also: [Furnace Repair in Coeur d'Alene](/furnace-repair-coeur-d-alene/) | [Furnace Repair in Post Falls](/furnace-repair-post-falls/) | [Furnace Installation in Coeur d'Alene](/furnace-installation/).
`
},
{
  slug: 'signs-you-need-furnace-repair',
  title: '7 Signs Your Furnace Needs Repair Before the Coeur d\'Alene Winter',
  tags: ['furnace repair','signs','north Idaho'],
  imagePrompt: 'A homeowner in a north Idaho home looking concerned at a furnace vent that is blowing cold air, winter scene visible through window, residential setting. No text, no logos, no signs in the image.',
  excerpt: '7 signs your furnace needs service before Coeur d\'Alene winter: unusual noises, uneven heat, high bills, short-cycling, age over 15 years, yellow pilot flame, and frequent repairs.',
  body: `# 7 Signs Your Furnace Needs Repair Before the Coeur d'Alene Winter

Coeur d'Alene's heating season runs from October through April. January average lows hit 22°F, and temperatures can drop to 0°F or below during hard cold snaps. The worst time to discover your furnace has a problem is 10pm on a Thursday in January.

Here are seven signs your furnace is telling you it needs attention — ideally before the snow flies.

## 1. Strange Noises You Haven't Heard Before

Banging, rattling, squealing, or grinding are not normal furnace sounds. A bang at startup often means delayed ignition — gas is building up before lighting. Rattling can indicate a loose component or a cracked heat exchanger. Squealing usually points to a blower motor bearing. Any of these should be diagnosed before the heating season peaks.

## 2. Uneven Heat Across Your Home

If some rooms are comfortable while others stay cold, the problem could be airflow (ductwork or blower), a zoning issue, or the furnace itself struggling to keep up with the home's heating load. In Coeur d'Alene's older core neighborhoods — the Canfield area, Sherman Avenue corridor — homes built in the 1970s and 80s sometimes have undersized original furnaces that were never upgraded.

## 3. Energy Bills Spiking Without Explanation

A furnace that's losing efficiency runs longer to reach the same temperature. That longer run time shows up on your gas bill. If your bill went up significantly without a corresponding temperature drop or rate change, your furnace may be working harder than it should.

## 4. Short-Cycling

Short-cycling means the furnace turns on, runs briefly, shuts off, then turns on again shortly after. This is usually caused by an overheating limit switch, a dirty flame sensor, or a clogged air filter. Left unchecked, short-cycling increases wear on the system and often leads to a full breakdown.

## 5. The System Is 15–20 Years Old

The average furnace lifespan in a climate like Coeur d'Alene's — where systems run hard for six months — is 15–20 years. If your furnace is in that range, it's not a question of if it will fail, but when. Getting ahead of it with a diagnostic inspection before winter is cheaper than an emergency replacement in December.

## 6. A Yellow or Orange Pilot Flame

Your furnace's flame should burn blue. A yellow or orange flame indicates incomplete combustion, which can produce carbon monoxide. This is a safety issue that requires immediate attention. If you see a yellow flame, call a technician and make sure your CO detectors are functional.

## 7. You've Called for Repairs Multiple Times in the Past Two Years

Frequent repairs are a sign a system is failing. Two or more repair calls in a 24-month window usually means you're at the point where continued repair costs are approaching replacement economics. A technician can help you run the numbers.

## What to Do Now

October is the best time to get a furnace inspection in Kootenai County — before the season starts and before technicians are handling emergency calls. Frosty's Heating and Air offers annual maintenance plan customers a fall inspection call, and we also take inspection appointments for homeowners who want to check their system before winter.

Call [(208) 555-0194](tel:2085550194) to schedule. For emergency heating service any time, that same number is answered 24/7.

**Related:** [Furnace Repair in Coeur d'Alene](/furnace-repair-coeur-d-alene/) | [HVAC Maintenance Plans](/hvac-maintenance-plans/) | [Emergency Heating Repair](/emergency-heating-repair/)
`
},
{
  slug: 'what-to-expect-during-furnace-repair',
  title: 'What to Expect During Furnace Repair: A Coeur d\'Alene Homeowner\'s Guide',
  tags: ['furnace repair','how it works','Coeur d\'Alene'],
  imagePrompt: 'HVAC technician in professional uniform explaining furnace diagnostic findings to a homeowner in a north Idaho home, both looking at the furnace unit, trust-building professional interaction. No text, no logos, no signs in the image.',
  excerpt: 'What happens during furnace repair in Coeur d\'Alene: technician arrives, runs diagnostic, quotes flat rate, repairs the specific issue. Most jobs complete same visit with local parts.',
  body: `# What to Expect During Furnace Repair: A Coeur d'Alene Homeowner's Guide

If you've never had a furnace repaired in Coeur d'Alene before, or if you've had bad experiences with other HVAC companies, here's exactly what happens when you call Frosty's Heating and Air.

## Step 1: You Call or Submit a Request

For emergency calls, call [(208) 555-0194](tel:2085550194) directly. For non-emergency service, you can also submit a request online. We confirm your address, your availability, and the general nature of the problem.

Emergency calls get priority dispatch. Most Coeur d'Alene and Kootenai County addresses are within a short drive of our base on W Ironwood Dr.

## Step 2: Your Technician Arrives

If you've called before, we route your call to the same technician who's been to your home. That person already knows your system, your home's layout, and your preferences. If it's a first visit, you get one of our regular technicians who will be your point of contact going forward.

The technician arrives in a clean uniform, introduces themselves, and asks a few questions: when did it stop working, any unusual noises or smells before it failed, what temperature is the home currently at.

## Step 3: Diagnosis

We don't start replacing parts until we know what's wrong. The diagnostic process typically takes 15–45 minutes depending on complexity:

- Check thermostat signal and settings
- Inspect ignition sequence
- Test flame sensor and burners
- Check heat exchanger for cracks (critical safety check)
- Inspect controls and circuit board
- Test blower motor and airflow
- Check flue and combustion air

For older north Idaho homes with 1990s-era systems — common in the Canfield area, Sherman Avenue neighborhoods, and Dalton Gardens — we pay extra attention to heat exchanger integrity since cracking is more likely in aging equipment.

## Step 4: Flat-Rate Quote

Before any work starts, we give you a flat-rate quote for the repair. This is the number you approve before we proceed. It doesn't change based on how long the job takes.

If multiple issues are found, we explain each one separately with individual costs. You decide what gets done today.

## Step 5: Repair

Most furnace repairs in Kootenai County complete in 1–3 hours. Common repairs (igniter, flame sensor, capacitor, control board) are typically done in one visit because we stock common parts locally. We don't leave and come back two days later for standard components.

If a part needs to be ordered, we're transparent about the timeline and discuss temporary options for maintaining heat if needed.

## Step 6: Testing and Walkthrough

After the repair, we run the system through a complete test cycle — ignition, combustion, heat output, blower operation, thermostat response. Before we leave, we walk you through what was wrong, what was done, and what to watch for going forward.

## What Doesn't Happen

- We don't recommend repairs you don't need
- We don't use time-based billing where you're penalized for a complex diagnosis
- We don't send a different technician each time

## Frequently Asked Questions

**Do I need to be home for furnace repair?**
Yes. Someone over 18 needs to be present to approve the flat-rate quote before we proceed.

**How do I prepare for a furnace repair appointment?**
Clear a path to the furnace. Have any recent repair history you know of ready to share. Set the thermostat to call for heat so we can observe the startup sequence.

**What if my furnace needs a part you don't have?**
We tell you immediately, give you a realistic timeline, and discuss options. We never leave you without a plan.

See also: [Furnace Repair in Coeur d'Alene](/furnace-repair-coeur-d-alene/) | [Furnace Repair in Hayden](/furnace-repair-hayden/) | [Emergency Heating Repair](/emergency-heating-repair/)
`
}
];

// Build the remaining 49 posts programmatically
const svcNames = [
  { name:'Furnace Repair', slug:'furnace-repair', done: 3 },
  { name:'Furnace Installation', slug:'furnace-installation', done: 0 },
  { name:'AC Repair', slug:'ac-repair', done: 0 },
  { name:'AC Installation', slug:'ac-installation', done: 0 },
  { name:'Heat Pump Service', slug:'heat-pump-service', done: 0 },
  { name:'Duct Cleaning', slug:'duct-cleaning', done: 0 },
  { name:'HVAC Maintenance Plans', slug:'hvac-maintenance-plans', done: 0 },
  { name:'Emergency Heating Repair', slug:'emergency-heating-repair', done: 0 },
  { name:'Mini-Split Installation', slug:'mini-split-installation', done: 0 }
];

const clusterTemplates = [
  (svc) => ({
    slug: `${svc.slug}-cost-guide`,
    title: `How Much Does ${svc.name} Cost in Coeur d'Alene? (2026 Guide)`,
    tags: [svc.slug, 'cost guide', "Coeur d'Alene"],
    imagePrompt: `A professional HVAC technician reviewing pricing with a homeowner in Coeur d'Alene Idaho, indoor residential setting, transparent and trustworthy interaction. No text, no logos, no signs in the image.`,
    excerpt: `${svc.name} costs in Coeur d'Alene, Idaho for 2026. Includes diagnostic fees, typical repair ranges, and what factors affect pricing in Kootenai County.`,
    body: `# How Much Does ${svc.name} Cost in Coeur d'Alene? (2026 Guide)

${svc.name} costs in Coeur d'Alene and Kootenai County depend on the specific scope of work, the system's age and condition, and whether the job requires parts that are locally stocked or need to be ordered.

Frosty's Heating and Air provides flat-rate pricing for all ${svc.name.toLowerCase()} work — you see the quoted price before any work starts.

## What Drives ${svc.name} Costs in North Idaho

Coeur d'Alene's climate creates specific cost factors. January average lows near 22°F and heating seasons that run October through April mean HVAC systems run hard. Systems in north Idaho age faster than in milder climates, and parts demand during peak heating season affects availability.

The housing stock also matters. Homes in older CdA neighborhoods — the Canfield corridor, Sherman Avenue area, Dalton Gardens — often have systems from the 1990s and early 2000s. Parts for these systems vary in cost and availability.

## How to Get an Accurate ${svc.name} Quote in Coeur d'Alene

Call [(208) 555-0194](tel:2085550194) or [request a free quote online](/contact/). Frosty's flat-rate pricing means no surprises on the invoice.

## Frequently Asked Questions

**Does Frosty's charge extra for emergency ${svc.name.toLowerCase()} calls?**
Emergency after-hours calls carry a service call fee that we disclose before dispatching. The flat-rate quote for the actual work still applies.

**Are ${svc.name.toLowerCase()} costs higher in winter in Coeur d'Alene?**
Emergency call fees apply for after-hours calls regardless of season. Standard scheduled work is priced the same year-round.

**What payment methods does Frosty's accept?**
Call (208) 555-0194 for current payment options.

See also: [${svc.name} in Coeur d'Alene](/${svc.slug}-coeur-d-alene/) | [${svc.name}](/${svc.slug}/) | [Contact Frosty's](/contact/)
`
  }),
  (svc) => ({
    slug: `signs-you-need-${svc.slug}`,
    title: `5 Signs You Need ${svc.name} in Coeur d'Alene`,
    tags: [svc.slug, 'signs', "Coeur d'Alene"],
    imagePrompt: `Homeowner in north Idaho looking at HVAC system with concern, residential home setting, winter visible through window. No text, no logos, no signs in the image.`,
    excerpt: `5 signs your home in Coeur d'Alene or Kootenai County needs ${svc.name.toLowerCase()}: unusual noises, inconsistent temperatures, higher energy bills, and more.`,
    body: `# 5 Signs You Need ${svc.name} in Coeur d'Alene

North Idaho's climate is demanding. Coeur d'Alene winters average January lows near 22°F, and summers push July highs near 90°F. HVAC systems work hard year-round. Knowing when ${svc.name.toLowerCase()} is needed — before a full failure — is worth real money.

## 1. Unusual Noises

Banging, rattling, grinding, or squealing from your HVAC system are not normal sounds. Any of these warrant a diagnostic call before peak season.

## 2. Inconsistent Temperatures

If some rooms are comfortable while others aren't, the system may need attention. This is particularly common in older Coeur d'Alene homes in the Sherman Avenue area and Canfield corridor with aging systems.

## 3. Higher Energy Bills

A system that's losing efficiency runs longer to reach the same temperature. If your bills went up without a corresponding change in weather or rates, have the system checked.

## 4. The System Is Older Than 15 Years

In a climate where HVAC systems run October through April (and often June through September for cooling), systems age faster. A system approaching 15–20 years should be proactively assessed.

## 5. Frequent Service Calls

Two or more repair calls in 24 months often signal a system that's reaching end of life. Continued repair investment may be approaching replacement economics.

## What to Do

Call Frosty's Heating and Air at [(208) 555-0194](tel:2085550194) to schedule a diagnostic. October is the best time for a fall inspection before heating season.

See also: [${svc.name}](/${svc.slug}/) | [HVAC Maintenance Plans](/hvac-maintenance-plans/) | [${svc.name} in Coeur d'Alene](/${svc.slug}-coeur-d-alene/)
`
  }),
  (svc) => ({
    slug: `what-to-expect-${svc.slug}`,
    title: `What to Expect During ${svc.name} in Coeur d'Alene`,
    tags: [svc.slug, 'how it works', "Coeur d'Alene"],
    imagePrompt: `HVAC technician in professional uniform working on residential HVAC equipment in a north Idaho home, competent and focused, clean residential setting. No text, no logos, no signs in the image.`,
    excerpt: `What happens during ${svc.name.toLowerCase()} in Coeur d'Alene: technician arrival, diagnosis, flat-rate quote, work completion, and system walkthrough.`,
    body: `# What to Expect During ${svc.name} in Coeur d'Alene

If you haven't had professional ${svc.name.toLowerCase()} service before, or if you've had bad experiences with other HVAC companies, here's what the process looks like when you call Frosty's Heating and Air.

## The Process

**Step 1: You call or submit a request.** For emergencies, call [(208) 555-0194](tel:2085550194) directly. For scheduled service, submit a request online or call during business hours.

**Step 2: Technician arrives.** If you've called before, we route to the same technician who knows your system. First visit, you get one of our regular techs who will be your consistent contact going forward.

**Step 3: Assessment.** We diagnose before we recommend. You'll know exactly what's happening with your system before any work begins.

**Step 4: Flat-rate quote.** Before any work starts, you see the quoted price and approve it. That's what's on the invoice — no surprises.

**Step 5: Completion and walkthrough.** After the work, we test the system and walk you through what was done. You know what happened and what to watch for.

## What Doesn't Happen

- No recommending work you don't need
- No sending a different technician each time you call
- No billing you by the hour

Call [(208) 555-0194](tel:2085550194) or see our [${svc.name} page](/${svc.slug}/).

See also: [${svc.name} in Post Falls](/${svc.slug}-post-falls/) | [${svc.name} in Hayden](/${svc.slug}-hayden/) | [Emergency Heating Repair](/emergency-heating-repair/)
`
  }),
  (svc) => ({
    slug: `${svc.slug}-diy-vs-professional`,
    title: `${svc.name} Yourself vs. Hiring a Professional in Coeur d'Alene`,
    tags: [svc.slug, 'DIY vs pro', 'Kootenai County'],
    imagePrompt: `Side-by-side comparison feeling: professional HVAC technician in uniform with proper tools working on a residential system in north Idaho. No text, no logos, no signs in the image.`,
    excerpt: `DIY vs professional ${svc.name.toLowerCase()} in Coeur d'Alene: what homeowners can safely do themselves, what requires a licensed technician, and why north Idaho's climate raises the stakes.`,
    body: `# ${svc.name} Yourself vs. Hiring a Professional in Coeur d'Alene

With Coeur d'Alene January lows near 22°F and genuine heating emergencies possible during cold snaps, the DIY vs. professional question for ${svc.name.toLowerCase()} carries real consequences.

## What Homeowners Can Do Themselves

- **Change air filters.** A $15 filter swap every 1–3 months is the single best maintenance task a homeowner can do. Clogged filters cause most of the efficiency problems we diagnose.
- **Check thermostat settings.** Sounds obvious, but it's frequently the issue on first-call diagnostics.
- **Check the power switch.** The furnace power switch looks like a light switch near the unit. It gets bumped off accidentally more often than you'd think.
- **Check circuit breakers.** A tripped breaker kills the furnace or AC.
- **Clear debris from outdoor condenser.** Keeping the area around the outdoor unit clear improves airflow and efficiency.

## What Requires a Licensed Technician

- Refrigerant work (requires EPA 608 certification — illegal to purchase or handle refrigerants without it)
- Gas line connections and repairs
- Heat exchanger inspection and replacement
- Electrical repairs beyond resetting a breaker
- Any work involving combustion systems
- Permit-required installations

In Idaho, HVAC work on pressurized refrigerant systems requires a licensed contractor. For gas furnace work, professional installation is required for permit compliance.

## Why Coeur d'Alene Specifically

A DIY repair attempt on a furnace in a climate where January lows average 22°F has less margin for error than in a milder market. A system that fails partially due to an incorrect repair can fail completely during a cold snap when parts are harder to source quickly.

Frosty's Heating and Air provides flat-rate pricing with no surprise bills — which takes away one of the main reasons homeowners attempt DIY on heating systems.

Call [(208) 555-0194](tel:2085550194) or see our [${svc.name} page](/${svc.slug}/).

See also: [Furnace Repair](/furnace-repair/) | [HVAC Maintenance Plans](/hvac-maintenance-plans/) | [Emergency Heating Repair](/emergency-heating-repair/)
`
  }),
  (svc) => ({
    slug: `${svc.slug}-coeur-d-alene-homeowners`,
    title: `${svc.name} in Coeur d'Alene: What Local Homeowners Need to Know`,
    tags: [svc.slug, 'local guide', "Coeur d'Alene"],
    imagePrompt: `Coeur d'Alene Idaho residential neighborhood in winter, craftsman-style homes with snow, peaceful residential street, Pacific Northwest character. No text, no logos, no signs in the image.`,
    excerpt: `${svc.name} in Coeur d'Alene: specific local factors including climate, housing stock, and what Kootenai County homeowners need to know about north Idaho HVAC systems.`,
    body: `# ${svc.name} in Coeur d'Alene: What Local Homeowners Need to Know

${svc.name} in Coeur d'Alene has specific characteristics that differ from other markets. Here's what Kootenai County homeowners need to know.

## The North Idaho Climate Factor

Coeur d'Alene winters are genuinely harsh. January average lows near 22°F, annual snowfall averaging 45+ inches, and heating seasons running October through April. This climate means HVAC systems run harder and longer than in most US markets.

The silver lining: Coeur d'Alene's shoulder seasons (spring and fall) are mild. This creates a natural window in October and May for HVAC service before peak demand periods.

## The Coeur d'Alene Housing Stock

The city's housing ranges from 1960s-era homes in the Sherman Avenue and Tubbs Hill adjacent neighborhoods to new construction along the Ramsey Road and Government Way corridors. Each era has its own system characteristics.

Older homes (pre-1990) often have original forced-air gas furnaces that were sized for the standards of that era — which means some are undersized by today's expectations for a well-heated north Idaho home.

## Wildfire Smoke Season

August and September bring regional wildfire smoke to the Inland Northwest. This pushes fine particulate into HVAC systems and condenser coils. It's a specific local factor that affects both air quality and system performance.

## Lake Humidity

Lake Coeur d'Alene's proximity creates humidity conditions in crawl spaces and basements that are specific to this market. This affects ductwork corrosion rates and mold risk conditions in duct systems — relevant context for duct cleaning decisions.

## Getting Help

Frosty's Heating and Air is based in Coeur d'Alene at 812 W Ironwood Dr. Call [(208) 555-0194](tel:2085550194) for ${svc.name.toLowerCase()} anywhere in Kootenai County.

See also: [${svc.name}](/${svc.slug}/) | [${svc.name} in Coeur d'Alene](/${svc.slug}-coeur-d-alene/) | [About Frosty's](/about/)
`
  }),
  (svc) => ({
    slug: `mistakes-hiring-hvac-${svc.slug}`,
    title: `5 Mistakes to Avoid When Hiring an HVAC Company for ${svc.name} in Coeur d'Alene`,
    tags: [svc.slug, 'hiring tips', 'HVAC'],
    imagePrompt: `Homeowner in north Idaho carefully reviewing HVAC company information on a phone or paper, thoughtful decision-making scene, residential home setting. No text, no logos, no signs in the image.`,
    excerpt: `5 mistakes Coeur d'Alene homeowners make when hiring for ${svc.name.toLowerCase()}: choosing by price alone, skipping flat-rate verification, and not asking about technician consistency.`,
    body: `# 5 Mistakes to Avoid When Hiring an HVAC Company for ${svc.name} in Coeur d'Alene

Choosing the right HVAC company for ${svc.name.toLowerCase()} in Coeur d'Alene isn't just about the immediate job. The company you choose establishes your long-term heating and cooling relationship. Here are five mistakes that Kootenai County homeowners commonly make.

## Mistake 1: Choosing Based on Price Alone

The lowest bid isn't always the best value. Time-based billing with a low hourly rate can easily exceed a higher flat-rate quote if the job takes longer than expected. Ask specifically: is the quote flat-rate or hourly?

## Mistake 2: Not Verifying Local Parts Availability

In north Idaho, a company that sources parts from regional distributors may leave you waiting 2–3 days for a simple repair part during a heating emergency. Ask whether common parts are kept in local inventory.

## Mistake 3: Accepting the First Available Tech Instead of a Consistent One

Some companies send whoever is available. This means starting from scratch on your home's system history every service call. A consistent technician who knows your system is worth specifically asking for.

## Mistake 4: Not Getting a Written Price Before Work Starts

Verbal estimates and time-based billing are two different things. Make sure you're getting a written flat-rate quote that covers the entire job — parts and labor — before anyone touches your system.

## Mistake 5: Hiring a Company Based Outside Kootenai County

Some Spokane-area HVAC companies market aggressively in Coeur d'Alene, but response times and local knowledge differ from a locally based team. During a January heating emergency, local matters.

## What to Ask When Calling

- Is your pricing flat-rate or hourly?
- Do you stock common parts locally?
-