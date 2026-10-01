/**
 * gen.js — Page generator for Frosty's Heating and Air
 * Generates: 9 service pages, 6 city pages, 54 service×location pages
 */
const fs = require('fs');
const path = require('path');
const { SERVICES, CITIES } = require('./data');
const ROOT = __dirname;
let count = 0;

function write(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  count++;
}

const JS_FAQ = `<script>
document.querySelectorAll('.faq-question').forEach(btn=>{btn.addEventListener('click',function(){
  const item=this.closest('.faq-item');const open=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
  if(!open){item.classList.add('open');}this.setAttribute('aria-expanded',!open);
});});</script>`;

function faqHTML(items) {
  return items.map(f=>`<div class="faq-item">
<button class="faq-question" aria-expanded="false">${f.q}<span class="faq-icon">+</span></button>
<div class="faq-answer"><p>${f.a}</p></div>
</div>`).join('\n');
}

function faqSchema(items) {
  return JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":
    items.map(f=>({
      "@type":"Question",
      "name":f.q.replace(/&[a-z#0-9]+;/g,' ').replace(/<[^>]+>/g,'').trim(),
      "acceptedAnswer":{"@type":"Answer","text":f.a.replace(/<[^>]+>/g,'').replace(/&[a-z#0-9]+;/g,' ').replace(/\s+/g,' ').trim()}
    }))
  });
}

function breadcrumb(items) {
  const listItems = items.map((item,i)=>item.url
    ? `<li><a href="${item.url}">${item.label}</a></li>`
    : `<li>${item.label}</li>`).join('\n');
  const schemaItems = items.map((item,i)=>`{"@type":"ListItem","position":${i+1},"name":"${item.label.replace(/&[a-z]+;/g,'')}","item":"https://frostysheatingandair.com${item.url||''}"}`)
  return `<nav class="breadcrumb" aria-label="Breadcrumb">
  <div class="container"><ol class="breadcrumb-list">${listItems}</ol></div>
</nav>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[${schemaItems.join(',')}]}</script>`;
}

// ==================== SERVICE PAGE ====================
function buildServicePage(svc) {
  const title = `${svc.name} in Coeur d&rsquo;Alene, ID | Frosty&rsquo;s Heating and Air`;
  const cityLinks = CITIES.map(c=>`<li><a href="/${svc.slug}-${c.slug}/">${svc.name} in ${c.name}, ID</a></li>`).join('\n');
  const html = `
<nav class="breadcrumb" aria-label="Breadcrumb">
<div class="container"><ol class="breadcrumb-list">
<li><a href="/">Home</a></li>
<li>${svc.name}</li></ol></div></nav>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://frostysheatingandair.com/"},{"@type":"ListItem","position":2,"name":"${svc.name} Coeur d'Alene","item":"https://frostysheatingandair.com/${svc.slug}/"}]}</script>

<div class="page-hero">
<div class="container">
<h1>${svc.name} in Coeur d&rsquo;Alene, ID</h1>
<p>${svc.tagline}</p>
<div class="hero-meta">
<span>&#9989; Flat-Rate Pricing</span>
<span>&#128100; Same Technician</span>
<span>&#9889; 24/7 Emergency Heating</span>
</div>
</div></div>

<section class="section">
<div class="container grid-2">
<div class="prose">
<img src="/images/${svc.img}" alt="${svc.name} in Coeur d'Alene Idaho" style="width:100%;border-radius:var(--kg-radius);margin-bottom:28px;">
<h2>Professional ${svc.name} Across Kootenai County</h2>
${svc.intro || `<p>Frosty&rsquo;s Heating and Air provides professional ${svc.name.toLowerCase()} service across Coeur d&rsquo;Alene and Kootenai County. Family-owned, flat-rate pricing, same technician every visit. Call <a href="tel:2085550194">(208) 555-0194</a> or <a href="/contact/">request a free quote</a>.</p>`}
<p>As a family-owned business based right in Coeur d&rsquo;Alene &mdash; not a franchise dispatching from Spokane &mdash; Frosty&rsquo;s knows the specific housing stock, climate demands, and HVAC system types common in Kootenai County. We stock common parts locally to complete most jobs on the first visit. Every job comes with a flat-rate quote before any work starts, and you get the same technician who&rsquo;s been to your home before.</p>
<h2>${svc.name} Across Kootenai County</h2>
<ul>${cityLinks}</ul>
</div>
<div>
<div style="background:var(--kg-secondary);border-radius:var(--kg-radius);padding:28px;margin-bottom:24px;">
<h3 style="margin-bottom:16px;">Get a Free Quote</h3>
<p style="margin-bottom:16px;font-size:0.95rem;">Call <a href="tel:2085550194" style="font-weight:700;">(208) 555-0194</a> or submit a request and we&rsquo;ll call you back the same day.</p>
<a href="/contact/" class="btn btn-primary" style="display:block;text-align:center;">Request a Free Quote</a>
<p style="text-align:center;margin-top:12px;font-size:0.88rem;color:var(--kg-text-light);">24/7 emergency heating line available</p>
</div>
<div class="related-pages">
<h3>Related Services</h3>
<ul class="related-links">
${SERVICES.filter(s=>s.slug!==svc.slug).slice(0,6).map(s=>`<li><a href="/${s.slug}/">${s.name}</a></li>`).join('')}
</ul>
</div>
<div class="related-pages" style="margin-top:16px;">
<h3>Service Areas</h3>
<ul class="related-links">
${CITIES.map(c=>`<li><a href="/${c.slug}/">${c.name}</a></li>`).join('')}
</ul>
</div>
</div>
</div>
</section>

<section class="section-alt">
<div class="container" style="max-width:780px;">
<h2 class="text-center">Frequently Asked Questions &mdash; ${svc.name} in Coeur d&rsquo;Alene</h2>
<div class="divider divider-center"></div>
${faqHTML(svc.faqs)}
</div>
</section>
<script type="application/ld+json">${faqSchema(svc.faqs)}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Service","name":"${svc.name}","provider":{"@type":"HVACBusiness","name":"Frosty's Heating and Air","telephone":"+12085550194","address":{"@type":"PostalAddress","streetAddress":"812 W Ironwood Dr","addressLocality":"Coeur d'Alene","addressRegion":"ID","postalCode":"83814","addressCountry":"US"}},"areaServed":["Coeur d'Alene, ID","Post Falls, ID","Hayden, ID","Rathdrum, ID","Dalton Gardens, ID","Spirit Lake, ID"],"description":"${svc.meta.replace(/"/g,"'")}","url":"https://frostysheatingandair.com/${svc.slug}/"}</script>
${JS_FAQ}
`;
  write(path.join(ROOT, svc.slug, 'index.html'), html);
}

// ==================== CITY PAGE ====================
function buildCityPage(city) {
  const serviceLinks = SERVICES.map(svc=>`<li><a href="/${svc.slug}-${city.slug}/">${svc.name} in ${city.name}</a></li>`).join('\n');
  const nearbyLinks = CITIES.filter(c=>c.slug!==city.slug).slice(0,4).map(c=>`<a href="/${c.slug}/">${c.name}</a>`).join(' &middot; ');
  const cityCleaned = city.name.replace(/&[a-z]+;/g,'').replace(/'/g,'\u2019');

  const faqs = [
    {q:`What HVAC services does Frosty's offer in ${city.name}?`,a:`Frosty&rsquo;s provides furnace repair, furnace installation, AC repair, AC installation, heat pump service, duct cleaning, HVAC maintenance plans, emergency heating repair, and mini-split installation in ${city.name} and throughout Kootenai County.`},
    {q:`How much does furnace repair cost in ${city.name}, Idaho?`,a:`Furnace diagnostics in ${city.name} run $85&ndash;$150. Common repairs: igniter $150&ndash;$300, flame sensor $80&ndash;$150, control board $200&ndash;$600, heat exchanger $400&ndash;$900. Full replacements range $3,500&ndash;$8,000 depending on size and efficiency.`},
    {q:`Does Frosty's offer 24/7 emergency heating service in ${city.name}?`,a:`Yes. Frosty&rsquo;s answers emergency heating calls around the clock for ${city.name} homeowners &mdash; call (208) 555-0194 any time. January lows in Kootenai County average near 22&deg;F, and heating failures require immediate response.`},
    {q:`Is Frosty's Heating and Air local to ${city.name}?`,a:`Frosty&rsquo;s is based in Coeur d&rsquo;Alene at 812 W Ironwood Dr &mdash; a short drive from ${city.name}. We&rsquo;re a family-owned local business, not a franchise dispatching from Spokane.`},
    {q:`Are heat pump rebates available for ${city.name} homeowners?`,a:`Yes. ${city.name} homeowners served by Idaho Power or Avista Utilities may qualify for rebates on qualifying cold-climate heat pump installations. Amounts range $200&ndash;$800 depending on system efficiency and your utility provider.`},
    {q:`How do I schedule HVAC service in ${city.name}?`,a:`Call <a href="tel:2085550194">(208) 555-0194</a> or submit a request at frostysheatingandair.com. We schedule ${city.name} calls Mon&ndash;Fri 7am&ndash;6pm and Sat 8am&ndash;2pm, with 24/7 emergency heating response.`}
  ];

  const html = `
<nav class="breadcrumb" aria-label="Breadcrumb">
<div class="container"><ol class="breadcrumb-list">
<li><a href="/">Home</a></li>
<li>Service Areas</li>
<li>${city.name}</li></ol></div></nav>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://frostysheatingandair.com/"},{"@type":"ListItem","position":2,"name":"Service Areas","item":"https://frostysheatingandair.com/"},{"@type":"ListItem","position":3,"name":"${cityCleaned}","item":"https://frostysheatingandair.com/${city.slug}/"}]}</script>

<div class="page-hero">
<div class="container">
<h1>HVAC Service in ${city.name}, Idaho</h1>
<p>Frosty&rsquo;s Heating and Air serves ${city.name} homeowners with flat-rate HVAC service, same-technician visits, and 24/7 emergency heating response.</p>
<div class="hero-meta">
<span>&#9989; Flat-Rate Pricing</span><span>&#128100; Same Tech Every Visit</span><span>&#9889; 24/7 Emergency</span>
</div></div></div>

<section class="section">
<div class="container grid-2">
<div class="prose">
<img src="/images/${city.img}" alt="HVAC service in ${city.name} Idaho" style="width:100%;border-radius:var(--kg-radius);margin-bottom:28px;">
<h2>Heating and Cooling Service in ${city.name}</h2>
<p>${city.context}</p>
<p>${city.whyHVAC}</p>
<p>Frosty&rsquo;s is based in Coeur d&rsquo;Alene &mdash; a short drive from ${city.name}. Our technicians know the Kootenai County housing stock and climate. We stock common parts locally so most repairs complete on the first visit. Every job is flat-rate priced before we start, and the same technician who serves your home builds a relationship with your system over time.</p>
<h2>All HVAC Services Available in ${city.name}</h2>
<ul>${serviceLinks}</ul>
<h2>Also Serving Nearby Communities</h2>
<p>${nearbyLinks}</p>
</div>
<div>
<div style="background:var(--kg-secondary);border-radius:var(--kg-radius);padding:28px;margin-bottom:24px;">
<h3 style="margin-bottom:16px;">Schedule Service in ${city.name}</h3>
<p style="margin-bottom:16px;font-size:0.95rem;"><strong>${city.pop}</strong> population<br>${city.income}</p>
<p style="margin-bottom:16px;font-size:0.95rem;">Call <a href="tel:2085550194" style="font-weight:700;">(208) 555-0194</a></p>
<a href="/contact/" class="btn btn-primary" style="display:block;text-align:center;margin-bottom:12px;">Get a Free Quote</a>
<p style="text-align:center;font-size:0.85rem;color:var(--kg-text-light);">24/7 emergency heating line available</p>
</div>
<div class="related-pages">
<h3>Our Services</h3>
<ul class="related-links">
${SERVICES.map(s=>`<li><a href="/${s.slug}-${city.slug}/">${s.name}</a></li>`).join('')}
</ul>
</div>
</div>
</div>
</section>

<section class="section-alt">
<div class="container" style="max-width:780px;">
<h2 class="text-center">Frequently Asked Questions &mdash; HVAC in ${city.name}</h2>
<div class="divider divider-center"></div>
${faqHTML(faqs)}
</div>
</section>
<script type="application/ld+json">${faqSchema(faqs)}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"HVACBusiness","name":"Frosty's Heating and Air","telephone":"+12085550194","address":{"@type":"PostalAddress","streetAddress":"812 W Ironwood Dr","addressLocality":"Coeur d'Alene","addressRegion":"ID","postalCode":"83814","addressCountry":"US"},"areaServed":["${cityCleaned}, ID"],"url":"https://frostysheatingandair.com/${city.slug}/"}</script>
${JS_FAQ}
`;
  write(path.join(ROOT, city.slug, 'index.html'), html);
}

// ==================== SERVICE×LOCATION PAGE ====================
function buildServiceLocation(svc, city) {
  const slug = `${svc.slug}-${city.slug}`;
  const h1 = `${svc.name} in ${city.name}, ID`;
  const metaDesc = `${svc.name} in ${city.name}, Idaho from Frosty's Heating and Air. Flat-rate pricing, same technician, 24/7 emergency heating. Call (208) 555-0194.`;
  const cityCleaned = city.name.replace(/&[a-z]+;/g,'').replace(/'/g,'\u2019');

  const faqs = [
    {q:`How much does ${svc.name.toLowerCase()} cost in ${city.name}, Idaho?`,a:`Call (208) 555-0194 for current pricing in ${city.name}. Frosty&rsquo;s quotes flat-rate prices before starting any work. ${svc.name} in Kootenai County typically starts with a $85&ndash;$150 diagnostic.`},
    {q:`Does Frosty's provide 24/7 ${svc.name.toLowerCase()} service in ${city.name}?`,a:`Yes. Emergency heating service is available 24/7 for ${city.name} homeowners. Call (208) 555-0194 any time for heating emergencies.`},
    {q:`How fast can Frosty's respond to ${svc.name.toLowerCase()} in ${city.name}?`,a:`Frosty&rsquo;s is based in Coeur d&rsquo;Alene, a short drive from ${city.name}. Most scheduled appointments are available same day or next day. Emergency calls get priority dispatch.`},
    {q:`Is Frosty's Heating and Air a local company serving ${city.name}?`,a:`Yes. Frosty&rsquo;s is a family-owned business based in Coeur d&rsquo;Alene at 812 W Ironwood Dr &mdash; not a franchise. We serve all of Kootenai County including ${city.name}.`},
    {q:`What other HVAC services does Frosty's offer in ${city.name}?`,a:`In addition to ${svc.name.toLowerCase()}, Frosty&rsquo;s provides ${SERVICES.filter(s=>s.slug!==svc.slug).slice(0,4).map(s=>s.name).join(', ')}, and more across ${city.name}.`},
    {q:`Does Frosty's offer flat-rate pricing for ${svc.name.toLowerCase()} in ${city.name}?`,a:`Yes. Every job is quoted at a flat rate before we start. The price you approve is the price on the invoice &mdash; no surprises based on how long the job takes.`}
  ];

  const nearbyServicesLinks = CITIES.filter(c=>c.slug!==city.slug).slice(0,4).map(c=>`<a href="/${svc.slug}-${c.slug}/">${svc.name} in ${c.name}</a>`).join(' &middot; ');
  const otherServicesLinks = SERVICES.filter(s=>s.slug!==svc.slug).slice(0,5).map(s=>`<li><a href="/${s.slug}-${city.slug}/">${s.name} in ${city.name}</a></li>`).join('');

  const html = `
<nav class="breadcrumb" aria-label="Breadcrumb">
<div class="container"><ol class="breadcrumb-list">
<li><a href="/">Home</a></li>
<li><a href="/${svc.slug}/">${svc.name}</a></li>
<li>${city.name}</li></ol></div></nav>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://frostysheatingandair.com/"},{"@type":"ListItem","position":2,"name":"${svc.name}","item":"https://frostysheatingandair.com/${svc.slug}/"},{"@type":"ListItem","position":3,"name":"${svc.name} ${cityCleaned}","item":"https://frostysheatingandair.com/${slug}/"}]}</script>

<div class="page-hero">
<div class="container">
<h1>${h1}</h1>
<p>${svc.name} in ${city.name} from Frosty&rsquo;s Heating and Air. Flat-rate pricing quoted before we start. Same technician every visit. 24/7 emergency heating response.</p>
<div class="hero-meta">
<span>&#9989; Flat-Rate Pricing</span><span>&#128100; Same Technician</span><span>&#9889; 24/7 Emergency</span>
</div></div></div>

<section class="section">
<div class="container grid-2">
<div class="prose">
<h2>${svc.name} Service in ${city.name}, Idaho</h2>
<p>Frosty&rsquo;s Heating and Air provides ${svc.name.toLowerCase()} service to homeowners in ${city.name} and throughout Kootenai County. ${city.context}</p>
<p>${city.whyHVAC} As a family-owned HVAC company based in Coeur d&rsquo;Alene, we know the specific housing stock and climate demands of ${city.name} &mdash; and we stock common parts locally to complete most ${svc.name.toLowerCase()} jobs on the first visit.</p>
<h2>What to Expect from Frosty&rsquo;s for ${svc.name} in ${city.name}</h2>
<ul>
<li><strong>Same-day or next-day availability</strong> for most scheduled ${svc.name.toLowerCase()} calls in ${city.name}</li>
<li><strong>Flat-rate quote before any work begins</strong> &mdash; the price you approve is the price you pay</li>
<li><strong>Same technician every visit</strong> &mdash; your tech learns your system</li>
<li><strong>Local parts inventory</strong> &mdash; most jobs complete on the first visit</li>
<li><strong>24/7 emergency heating line</strong> for urgent situations in ${city.name}</li>
</ul>
<h2>Also Serving Nearby Areas for ${svc.name}</h2>
<p>${nearbyServicesLinks}</p>
<h2>Other HVAC Services in ${city.name}</h2>
<ul>${otherServicesLinks}</ul>
</div>
<div>
<div style="background:var(--kg-secondary);border-radius:var(--kg-radius);padding:28px;margin-bottom:24px;">
<h3 style="margin-bottom:16px;">${svc.name} in ${city.name}</h3>
<p style="margin-bottom:16px;font-size:0.95rem;">Call <a href="tel:2085550194" style="font-weight:700;">(208) 555-0194</a> or request a free quote online.</p>
<a href="/contact/" class="btn btn-primary" style="display:block;text-align:center;margin-bottom:12px;">Get a Free Quote</a>
<p style="text-align:center;font-size:0.85rem;color:var(--kg-text-light);">24/7 emergency heating line available</p>
</div>
<div class="related-pages">
<h3>All Services in ${city.name}</h3>
<ul class="related-links">
${SERVICES.map(s=>`<li><a href="/${s.slug}-${city.slug}/">${s.name}</a></li>`).join('')}
</ul>
</div>
<div class="related-pages" style="margin-top:16px;">
<h3>${svc.name} by Area</h3>
<ul class="related-links">
${CITIES.map(c=>`<li><a href="/${svc.slug}-${c.slug}/">${c.name}</a></li>`).join('')}
</ul>
</div>
</div>
</div>
</section>

<section class="section-alt">
<div class="container" style="max-width:780px;">
<h2 class="text-center">FAQs &mdash; ${svc.name} in ${city.name}</h2>
<div class="divider divider-center"></div>
${faqHTML(faqs)}
</div>
</section>
<script type="application/ld+json">${faqSchema(faqs)}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Service","name":"${svc.name} in ${cityCleaned}","provider":{"@type":"HVACBusiness","name":"Frosty's Heating and Air","telephone":"+12085550194","address":{"@type":"PostalAddress","streetAddress":"812 W Ironwood Dr","addressLocality":"Coeur d'Alene","addressRegion":"ID","postalCode":"83814","addressCountry":"US"}},"areaServed":["${cityCleaned}, ID"],"description":"${metaDesc.replace(/"/g,"'")}","url":"https://frostysheatingandair.com/${slug}/"}</script>
${JS_FAQ}
`;
  write(path.join(ROOT, slug, 'index.html'), html);
}

// ==================== RUN ====================
console.log('Generating service pages...');
SERVICES.forEach(svc => buildServicePage(svc));

console.log('Generating city pages...');
CITIES.forEach(city => buildCityPage(city));

console.log('Generating service×location pages...');
SERVICES.forEach(svc => CITIES.forEach(city => buildServiceLocation(svc, city)));

console.log(`Done. Generated ${count} pages.`);
