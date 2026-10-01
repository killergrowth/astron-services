'use strict';
// build-pages-2.js — location page, combo pages, hub pages, misc
const { writePage, fill, localBusinessSchema, serviceSchema, breadcrumbSchema, faqSchema, reviewCards, faqBlock, page, client, services, cities } = require('./shared');

function buildLocationPage(city) {
  const faqs = [
    { q: `Does Astron Services serve ${city.name}, KS?`, a: `Yes. Astron Services serves ${city.name} and the surrounding ${city.county} County area. Call ${client.phone} to schedule service.` },
    { q: `What services does Astron Services offer in ${city.name}?`, a: `Astron Services offers AC repair and replacement, furnace repair and replacement, duct repair, indoor air quality solutions, water heater repair and replacement, water service, faucet repair, and drain cleaning in ${city.name}.` },
    { q: `Does Astron Services work on commercial properties in ${city.name}?`, a: `Yes. Astron Services provides service for residential and light commercial properties in ${city.name} and throughout the Wichita metro area.` },
    { q: `How quickly can Astron Services respond in ${city.name}?`, a: `Astron Services serves ${city.name} regularly. Call ${client.phone} to schedule service or request an appointment online.` },
  ];

  const serviceLinks = services.map(s => `<a href="/${s.comboSlug}-${city.slug}/" class="link-btn">${s.name} in ${city.name}</a>`).join('\n');

  const mainContent = `
<h2>Plumbing, Heating &amp; Cooling Service in ${city.name}, Kansas</h2>
<p>Astron Services provides plumbing, heating, and cooling service for ${city.name} and the surrounding ${city.county} County area. Whether you need AC repair, furnace service, or plumbing work, our licensed technicians bring the same precision to every job.</p>
<p>As an authorized RUUD dealer, we install high-efficiency heating and cooling systems backed by professional service and honest pricing &mdash; no hidden fees, no surprises.</p>
<h3 style="margin-top:32px;">Services in ${city.name}</h3>
<div class="link-grid" style="margin-top:16px;">${serviceLinks}</div>
<h3 style="margin-top:36px;">Why ${city.name} Residents Choose Astron Services</h3>
<ul>
  <li>Locally owned and operated, based in Wichita</li>
  <li>RUUD Authorized Dealer for high-efficiency systems</li>
  <li>Honest pricing with no hidden fees</li>
  <li>Licensed and insured technicians</li>
  <li>Residential and light commercial service</li>
</ul>`;

  const pageTitle = `Plumbing, Heating & Cooling in ${city.name}, KS | Astron Services`;
  const pageDesc = `Astron Services provides plumbing, heating, and cooling service in ${city.name}, Kansas. RUUD authorized dealer, honest pricing. Call ${client.phone}.`;

  const body = `
<section class="section-dark" style="padding:80px 0;background:linear-gradient(145deg,#000 0%,#2d2d2d 100%);">
  <div class="container">
    <nav aria-label="Breadcrumb" style="font-size:0.85rem;margin-bottom:16px;color:rgba(255,255,255,0.6);">
      <a href="/" style="color:rgba(255,255,255,0.7);">Home</a> / <a href="/service-areas/" style="color:rgba(255,255,255,0.7);">Service Areas</a> / <span>${city.name}</span>
    </nav>
    <h1 style="color:#fff;">Plumbing, Heating &amp; Cooling in ${city.name}, KS</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:1.1rem;max-width:640px;margin-top:12px;">Astron Services provides reliable plumbing, heating, and cooling service for ${city.name} and the surrounding ${city.county} County area.</p>
    <div style="display:flex;gap:16px;margin-top:28px;flex-wrap:wrap;">
      <a href="${client.hcp.bookingUrl}" target="_blank" rel="noopener" class="btn btn-primary">Book Online Now</a>
      <a href="tel:${client.phoneRaw}" class="btn btn-outline-white">&#9742; ${client.phone}</a>
    </div>
  </div>
</section>
<section>
  <div class="container">
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:48px;align-items:start;">
      <div>
        ${mainContent}
      </div>
      <div>
        <div class="kg-card" style="padding:28px;position:sticky;top:90px;">
          <h4>Serving ${city.name}</h4>
          <p style="color:var(--kg-text-light);margin-bottom:20px;">${city.county} County, KS</p>
          <a href="tel:${client.phoneRaw}" class="btn btn-primary" style="width:100%;margin-bottom:12px;">&#9742; ${client.phone}</a>
          <a href="${client.hcp.bookingUrl}" target="_blank" rel="noopener" class="btn btn-outline" style="width:100%;">Book Online</a>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section-alt">
  <div class="container">
    <div class="section-title"><h2>Customer Reviews</h2></div>
    <div class="kg-grid kg-grid-3">${reviewCards()}</div>
  </div>
</section>
<section>
  <div class="container">
    <div class="section-title"><div class="section-label">FAQs</div><h2>Service in ${city.name}, KS</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>`;

  writePage(`${city.slug}/index.html`, page({
    title: pageTitle,
    metaDesc: pageDesc,
    canonical: `https://${client.domain}/${city.slug}/`,
    schema: localBusinessSchema() + '\n' + breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Service Areas', url: '/service-areas/' }, { name: city.name, url: `/${city.slug}/` }]) + '\n' + faqSchema(faqs),
    body,
  }));
  console.log(`  Built: /${city.slug}/`);
}

// ───────────────────────── SERVICE + CITY COMBO ─────────────────────────
function buildComboPage(svc, city) {
  const slug = `${svc.comboSlug}-${city.slug}`;
  const faqs = [
    { q: `Does Astron Services offer ${svc.name.toLowerCase()} in ${city.name}, KS?`, a: `Yes. Astron Services provides ${svc.name.toLowerCase()} in ${city.name} and the surrounding ${city.county} County area. Call ${client.phone} to schedule.` },
    { q: `How much does ${svc.name.toLowerCase()} cost in ${city.name}?`, a: `Astron Services provides honest, upfront pricing before any work begins. Contact us at ${client.phone} or book online for a quote specific to your situation.` },
    { q: `How quickly can you respond to a ${svc.name.toLowerCase()} call in ${city.name}?`, a: `Astron Services serves ${city.name} regularly. Call ${client.phone} to discuss your situation and schedule service.` },
  ];
  const otherServices = services.filter(s => s.slug !== svc.slug).map(s => `<li><a href="/${s.comboSlug}-${city.slug}/">${s.name} in ${city.name}</a></li>`).join('');
  const body = `
<section class="section-dark" style="padding:80px 0;background:linear-gradient(145deg,#000 0%,#2d2d2d 100%);">
  <div class="container">
    <nav aria-label="Breadcrumb" style="font-size:0.85rem;margin-bottom:16px;color:rgba(255,255,255,0.6);">
      <a href="/" style="color:rgba(255,255,255,0.7);">Home</a> / <a href="/${svc.slug}/" style="color:rgba(255,255,255,0.7);">${svc.name}</a> / <span>${city.name}</span>
    </nav>
    <h1 style="color:#fff;">${svc.title} in ${city.name}, KS</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:1.1rem;max-width:640px;margin-top:12px;">${fill(svc.description, city.name, city.county)}</p>
    <div style="display:flex;gap:16px;margin-top:28px;flex-wrap:wrap;">
      <a href="${client.hcp.bookingUrl}" target="_blank" rel="noopener" class="btn btn-primary">Book Online Now</a>
      <a href="tel:${client.phoneRaw}" class="btn btn-outline-white">&#9742; ${client.phone}</a>
    </div>
  </div>
</section>
<section>
  <div class="container">
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:48px;align-items:start;">
      <div>
        <h2>${svc.title} in ${city.name}, Kansas</h2>
        ${fill(svc.body, city.name, city.county)}
        <h3 style="margin-top:32px;">Serving ${city.name}</h3>
        <p>${city.name} is a ${city.county} County community in the Wichita metro area. As a locally owned company based in Wichita, Astron Services brings the same precision and honest pricing to every ${city.name} service call.</p>
        <h3 style="margin-top:28px;">Why Choose Astron Services for ${svc.name} in ${city.name}?</h3>
        <ul>
          <li>Locally owned and operated, based in Wichita</li>
          <li>RUUD Authorized Dealer for high-efficiency systems</li>
          <li>Honest pricing with no hidden fees</li>
          <li>Licensed and insured technicians</li>
          <li>Residential and light commercial service</li>
        </ul>
        <h3 style="margin-top:28px;">More Services in ${city.name}</h3>
        <ul>${otherServices}</ul>
      </div>
      <div>
        <div class="kg-card" style="padding:28px;position:sticky;top:90px;">
          <h4>${svc.name} in ${city.name}</h4>
          <p style="color:var(--kg-text-light);margin-bottom:20px;">Honest pricing. Licensed technicians. RUUD authorized.</p>
          <a href="tel:${client.phoneRaw}" class="btn btn-primary" style="width:100%;margin-bottom:12px;">&#9742; ${client.phone}</a>
          <a href="${client.hcp.bookingUrl}" target="_blank" rel="noopener" class="btn btn-outline" style="width:100%;">Book Online</a>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section-alt">
  <div class="container">
    <div class="section-title"><h2>Customer Reviews</h2></div>
    <div class="kg-grid kg-grid-3">${reviewCards()}</div>
  </div>
</section>
<section>
  <div class="container">
    <div class="section-title"><div class="section-label">FAQs</div><h2>${svc.name} in ${city.name}, KS</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>`;

  writePage(`${slug}/index.html`, page({
    title: `${svc.title} in ${city.name}, KS | Astron Services | ${client.phone}`,
    metaDesc: fill(svc.description, city.name, city.county).substring(0, 155),
    canonical: `https://${client.domain}/${slug}/`,
    schema: serviceSchema(svc.name, `/${slug}/`) + '\n' + breadcrumbSchema([{ name: 'Home', url: '/' }, { name: svc.name, url: `/${svc.slug}/` }, { name: city.name, url: `/${slug}/` }]) + '\n' + faqSchema(faqs),
    body,
  }));
  console.log(`  Built: /${slug}/`);
}

// ───────────────────────── SERVICE AREAS HUB ─────────────────────────
function buildServiceAreasHub() {
  const cityCards = cities.map(c => `<a href="/${c.slug}/" class="kg-card" style="padding:24px;text-align:center;text-decoration:none;"><strong style="font-size:1.1rem;color:var(--kg-primary);">${c.name}</strong><br><small style="color:var(--kg-text-light);">${c.county} County, KS</small></a>`).join('');
  const body = `
<section class="section-dark" style="padding:80px 0;background:linear-gradient(145deg,#000 0%,#2d2d2d 100%);">
  <div class="container">
    <h1 style="color:#fff;">Service Areas in the Wichita Metro</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:1.1rem;max-width:640px;margin-top:12px;">Astron Services serves Wichita and the surrounding communities.</p>
  </div>
</section>
<section>
  <div class="container">
    <div class="section-title"><h2>Communities We Serve</h2></div>
    <div class="kg-grid kg-grid-4" style="gap:20px;">${cityCards}</div>
    <p style="text-align:center;margin-top:32px;color:var(--kg-text-light);">Don't see your city? Call us at <a href="tel:${client.phoneRaw}">${client.phone}</a> &mdash; we're always happy to discuss your HVAC needs.</p>
  </div>
</section>`;

  writePage('service-areas/index.html', page({
    title: "Service Areas | Wichita Metro Plumbing, Heating & Cooling | Astron Services",
    metaDesc: "Astron Services serves Wichita, Derby, Andover, Haysville, Maize, Park City, Goddard, Bel Aire, Valley Center, and surrounding Wichita metro communities.",
    canonical: `https://${client.domain}/service-areas/`,
    schema: localBusinessSchema() + '\n' + breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Service Areas', url: '/service-areas/' }]),
    body,
  }));
  console.log('  Built: /service-areas/');
}

// ───────────────────────── PRIVACY POLICY ─────────────────────────
function buildPrivacyPolicy() {
  const body = `<section style="padding:60px 0;"><div class="container" style="max-width:800px;"><h1>Privacy Policy</h1><p><em>Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p><p>Astron Services operates astronservicesks.com. This Privacy Policy explains how we collect and use information you provide.</p><h2>Information We Collect</h2><p>We collect information you voluntarily provide via our contact and booking forms: name, email, phone, and message. We do not sell or share this information.</p><h2>Analytics</h2><p>We use analytics tools to understand how visitors use our site. This collects anonymized data only.</p><h2>Contact</h2><p>Questions? Call us at <a href="tel:${client.phoneRaw}">${client.phone}</a>.</p></div></section>`;
  writePage('privacy-policy/index.html', page({
    title: "Privacy Policy | Astron Services",
    metaDesc: "Privacy policy for astronservicesks.com — Astron Services.",
    canonical: `https://${client.domain}/privacy-policy/`,
    schema: '',
    body,
  }));
  console.log('  Built: /privacy-policy/');
}

// ───────────────────────── 404 ─────────────────────────
function build404() {
  const body = `<section style="padding:120px 0;text-align:center;"><div class="container"><h1 style="font-size:5rem;color:var(--kg-primary);margin-bottom:16px;">404</h1><h2>Page Not Found</h2><p style="margin-bottom:32px;">The page you're looking for doesn't exist.</p><div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;"><a href="/" class="btn btn-primary">Go Home</a><a href="/contact/" class="btn btn-outline">Contact Us</a></div></div></section>`;
  writePage('404.html', page({
    title: "Page Not Found | Astron Services",
    metaDesc: "Page not found — Astron Services.",
    canonical: `https://${client.domain}/404`,
    schema: '',
    body,
  }));
  console.log('  Built: 404.html');
}

module.exports = { buildLocationPage, buildComboPage, buildServiceAreasHub, buildPrivacyPolicy, build404 };
