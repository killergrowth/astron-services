'use strict';
const { writePage, fill, localBusinessSchema, serviceSchema, breadcrumbSchema, faqSchema, articleSchema, buildDate, reviewCards, faqBlock, page, client, services, cities, differentiators } = require('./shared');

const ICON_SVG = {
  snowflake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 2v20M4.5 6l15 12M19.5 6l-15 12M2 12h20M7 4l5 3 5-3M7 20l5-3 5 3M4 9l3 5-3 5M20 9l-3 5 3 5"/></svg>',
  flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c1 4-3 5-3 9a3 3 0 0 0 6 0c0-2-1-3-1-5 2 1 3 4 3 6a5 5 0 0 1-10 0c0-5 3-6 5-10z"/></svg>',
  duct: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="12" height="8" rx="1"/><path d="M15 10h4a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-4M7 8V5a1 1 0 0 1 1-1h4M9 16v3a1 1 0 0 0 1 1h3"/></svg>',
  air: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 8h11a2.5 2.5 0 1 0-2.5-2.5M3 12h15a2.5 2.5 0 1 1-2.5 2.5M3 16h9a2.5 2.5 0 1 0-2.5-2.5"/></svg>',
  waterheater: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="3" width="10" height="18" rx="3"/><path d="M10 8h4M10 12h4M10 16h4"/></svg>',
  waterservice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/></svg>',
  faucet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 10V6a2 2 0 0 1 2-2h3M5 10h11a3 3 0 0 1 3 3v1M15 14v3a2 2 0 0 1-2 2h-1"/><circle cx="12" cy="19" r="1"/></svg>',
  drain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 9l8 6M16 9l-8 6M12 7v10"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2 2.5-2.5z"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11l8-7 8 7M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3.1 1.4-6.3-4.8-4.3 6.4-.6z"/></svg>',
  dollar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 7.5a4 4 0 0 0-4-2.5h-1a3.5 3.5 0 0 0 0 7h1a3.5 3.5 0 0 1 0 7h-1a4 4 0 0 1-4-2.5"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>',
};
const SERVICE_ICONS = { 'ac-repair-replacement': ICON_SVG.snowflake, 'furnace-repair-replacement': ICON_SVG.flame, 'duct-repair': ICON_SVG.duct, 'indoor-air-quality': ICON_SVG.air, 'water-heater-repair-replacement': ICON_SVG.waterheater, 'water-service': ICON_SVG.waterservice, 'faucet-repair': ICON_SVG.faucet, 'drain-cleaning': ICON_SVG.drain };
const DIFF_ICONS = [ICON_SVG.home, ICON_SVG.star, ICON_SVG.dollar, ICON_SVG.shield];

function diffCards() {
  return differentiators.map((d, i) => `<div class="kg-card" style="padding:28px 24px;"><div class="kg-card-icon" style="width:52px;height:52px;background:var(--kg-primary-tint);color:var(--kg-primary);">${DIFF_ICONS[i % DIFF_ICONS.length]}</div><h3 style="font-size:1.05rem;">${d.title}</h3><p style="color:var(--kg-text-light);">${d.body}</p></div>`).join('');
}

// ───────────────────────── HOME ─────────────────────────
function buildHome() {
  const faqs = [
    { q: "What areas does Astron Services serve?", a: "Astron Services serves Wichita and the surrounding Wichita metro area, including Derby, Andover, Haysville, Maize, Park City, Goddard, Bel Aire, and Valley Center, Kansas." },
    { q: "What services does Astron Services offer?", a: "Astron Services provides AC repair and replacement, furnace repair and replacement, duct repair, indoor air quality solutions, water heater repair and replacement, water service, faucet repair, and drain cleaning. We do not currently offer main sewer line cleaning." },
    { q: "Do you serve both residential and commercial properties?", a: "Yes. Astron Services provides plumbing, heating, and cooling service for residential and light commercial customers throughout the Wichita metro area." },
    { q: "Is Astron Services an authorized dealer?", a: "Yes. Astron Services is an authorized RUUD dealer, installing high-efficiency heating and cooling systems backed by manufacturer warranties." },
    { q: "How do I book a service appointment?", a: "Call us at (316) 925-0125 or book online through our scheduling portal. We're available Monday through Friday 8am to 4pm, with after-hours and weekend appointments available." },
  ];

  const serviceCards = services.map(s => `<a href="/${s.slug}/" class="kg-card" style="text-decoration:none;"><div style="padding:24px;"><h3>${s.title}</h3><p style="color:var(--kg-text-light);">${fill(s.description, 'the Wichita metro area', 'Sedgwick')}</p><span style="color:var(--kg-primary);font-weight:700;">Learn More &rarr;</span></div></a>`).join('');

  const body = `
<section class="section-dark" style="padding:100px 0 80px;background:linear-gradient(180deg,rgba(0,0,0,0.78) 0%,rgba(0,0,0,0.68) 100%),url('/images/hero-furnace.png') center/cover no-repeat;display:flex;align-items:center;">
  <div class="container">
    <div style="max-width:680px;">
      <div class="section-label" style="color:#fff;">Plumbing &bull; Heating &bull; Cooling &bull; Wichita Metro</div>
      <h1 style="color:#fff;margin-bottom:14px;">Precision Comfort.</h1>
      <p style="color:var(--kg-accent);font-weight:700;font-size:1.2rem;margin-bottom:20px;">Powered by Precision, Backed by the Stars.</p>
      <p style="color:rgba(255,255,255,0.88);font-size:1.18rem;max-width:560px;margin-bottom:36px;">Astron Services provides plumbing, heating, and cooling service throughout Wichita and the surrounding metro area &mdash; residential and light commercial.</p>
      <div style="display:flex;flex-wrap:wrap;gap:16px;">
        <a href="${client.hcp.bookingUrl}" target="_blank" rel="noopener" class="btn btn-primary">Book Online Now</a>
        <a href="tel:${client.phoneRaw}" class="btn btn-outline-white">&#9742; ${client.phone}</a>
      </div>
      <div style="display:flex;gap:32px;margin-top:40px;flex-wrap:wrap;">
        <div style="color:rgba(255,255,255,0.8);font-size:0.9rem;"><strong style="color:var(--kg-accent);font-size:1.5rem;display:block;">8</strong>Services Offered</div>
        <div style="color:rgba(255,255,255,0.8);font-size:0.9rem;"><strong style="color:var(--kg-accent);font-size:1.5rem;display:block;">9</strong>Cities Served</div>
        <div style="color:rgba(255,255,255,0.8);font-size:0.9rem;"><strong style="color:var(--kg-accent);font-size:1.5rem;display:block;">5.0</strong>Google Rating</div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-title">
      <div class="section-label">Our Services</div>
      <h2>What We Do For You</h2>
      <p>Plumbing, heating, and cooling service for residential and light commercial properties throughout the Wichita metro area.</p>
    </div>
    <div class="kg-grid kg-grid-4">${serviceCards}</div>
  </div>
</section>

<section class="section-alt">
  <div class="container">
    <div style="text-align:center;margin-bottom:32px;">
      <div class="section-label">Why Astron Services</div>
      <h2>Precision Comfort, Every Visit</h2>
    </div>
    <div class="kg-grid kg-grid-4">${diffCards()}</div>
  </div>
</section>

<section class="section-dark" style="padding:80px 0;background:linear-gradient(145deg,var(--kg-bg-dark) 0%,var(--kg-secondary) 100%);">
  <div class="container">
    <div class="section-title"><div class="section-label" style="color:var(--kg-accent);">Customer Reviews</div><h2 style="color:#fff;">Our Customers Trust Us</h2></div>
    <div class="kg-grid kg-grid-3">${reviewCards()}</div>
  </div>
</section>

<section class="section-alt">
  <div class="container">
    <div class="section-title">
      <div class="section-label">Where We Serve</div>
      <h2>Wichita Metro Service Area</h2>
      <p>Astron Services serves communities throughout the Wichita metro area. If you live nearby and don't see your city listed, contact us &mdash; we're always happy to discuss your HVAC needs.</p>
    </div>
    <div class="kg-grid kg-grid-4" style="gap:16px;">
      ${cities.map(c => `<a href="/${c.slug}/" class="kg-card" style="padding:20px;text-align:center;text-decoration:none;"><strong style="color:var(--kg-primary);">${c.name}</strong><br><small style="color:var(--kg-text-light);">${c.county} County</small></a>`).join('')}
    </div>
    <div style="text-align:center;margin-top:32px;"><a href="/service-areas/" class="btn btn-outline">All Service Areas</a></div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-title"><div class="section-label">FAQs</div><h2>Common Questions About Our Services</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>`;

  writePage('index.html', page({
    title: "Plumbing, Heating & Cooling in Wichita, KS | Astron Services",
    metaDesc: "Astron Services provides plumbing, heating, and cooling service throughout Wichita and the surrounding metro area. RUUD authorized dealer. Call (316) 925-0125.",
    canonical: `https://${client.domain}/`,
    schema: localBusinessSchema() + '\n' + faqSchema(faqs) + '\n' + articleSchema({ title: "Plumbing, Heating & Cooling in Wichita, KS | Astron Services", description: "Astron Services provides plumbing, heating, and cooling service throughout Wichita and the surrounding metro area.", url: `https://${client.domain}/`, datePublished: '2026-10-01' }),
    body,
  }));
  console.log('  Built: / (home)');
}

// ───────────────────────── ABOUT ─────────────────────────
function buildAbout() {
  const faqs = [
    { q: "Who owns Astron Services?", a: "Astron Services is a locally owned and operated business based in Wichita, Kansas, led by Brian Stupasky." },
    { q: "Is Astron Services licensed and insured?", a: "Yes. Astron Services' technicians are licensed and insured, and the company is an authorized RUUD dealer for high-efficiency heating and cooling systems." },
    { q: "What areas does Astron Services serve?", a: "Astron Services serves Wichita and the surrounding metro area, including Derby, Andover, Haysville, Maize, Park City, Goddard, Bel Aire, and Valley Center." },
  ];
  const body = `
<section class="section-dark" style="padding:80px 0;background:linear-gradient(145deg,var(--kg-bg-dark) 0%,var(--kg-secondary) 100%);">
  <div class="container">
    <h1 style="color:#fff;">About Astron Services</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:1.1rem;max-width:600px;margin-top:12px;">Locally owned. Precision-focused. Backed by the stars.</p>
  </div>
</section>
<section>
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;">
      <div>
        <h2>Precision Comfort</h2>
        <p>Astron Services is a trusted plumbing, heating, and cooling company providing expert installation, repair, and maintenance for residential and light commercial customers throughout the Wichita metro area.</p>
        <p>Our licensed technicians specialize in air conditioning repair, furnace installation, duct repair, indoor air quality solutions, and plumbing services designed to keep your home or business comfortable all year long.</p>
        <p>As an authorized RUUD dealer, we install high-efficiency heating and cooling systems backed by professional service, accurate diagnostics, and honest pricing. Every project is completed with our core promise: Powered by Precision, Backed by the Stars.</p>
        <h3 style="margin-top:32px;">Our Commitment</h3>
        <ul>
          <li>Locally owned and operated</li>
          <li>Honest pricing and no hidden fees</li>
          <li>Licensed and insured technicians</li>
          <li>RUUD Authorized Dealer for high-efficiency systems</li>
          <li>Dedicated to precision work and long-term comfort</li>
        </ul>
      </div>
      <div>
        <div class="kg-card" style="padding:28px;">
          <h4>Service Area</h4>
          <p style="margin-top:12px;color:var(--kg-text-light);">Wichita and the surrounding metro area, including Derby, Andover, Haysville, Maize, Park City, Goddard, Bel Aire, and Valley Center.</p>
          <p style="margin-top:16px;color:var(--kg-text-light);font-size:0.9rem;">Don't see your city? Give us a call &mdash; we're happy to discuss your HVAC needs.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section-alt">
  <div class="container">
    <div class="section-title"><h2>What Our Customers Say</h2></div>
    <div class="kg-grid kg-grid-3">${reviewCards()}</div>
  </div>
</section>
<section>
  <div class="container">
    <div class="section-title"><div class="section-label">FAQs</div><h2>About Our Company</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>`;

  writePage('about/index.html', page({
    title: "About Astron Services | Wichita, KS Plumbing, Heating & Cooling",
    metaDesc: "Astron Services is a locally owned plumbing, heating, and cooling company serving Wichita and the surrounding metro area. RUUD authorized dealer.",
    canonical: `https://${client.domain}/about/`,
    schema: localBusinessSchema() + '\n' + breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'About', url: '/about/' }]) + '\n' + faqSchema(faqs),
    body,
  }));
  console.log('  Built: /about/');
}

// ───────────────────────── CONTACT ─────────────────────────
function buildContact() {
  const body = `
<section class="section-dark" style="padding:80px 0;background:linear-gradient(145deg,var(--kg-bg-dark) 0%,var(--kg-secondary) 100%);">
  <div class="container">
    <h1 style="color:#fff;">Contact Astron Services</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:1.1rem;max-width:600px;margin-top:12px;">Book online, request a quote, or call us directly at <a href="tel:${client.phoneRaw}" style="color:var(--kg-accent);font-weight:700;">${client.phone}</a>.</p>
  </div>
</section>
<section>
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;">
      <!-- HouseCallPro Lead Form -->
      <div>
        <div style="background:#fff;border-radius:10px;box-shadow:0 8px 40px rgba(0,0,0,0.18);padding:36px 32px;">
          <h2 style="font-size:20px;font-weight:800;color:#1a1a1a;margin-bottom:6px;">Request Service</h2>
          <p style="font-size:13px;color:#7E7C76;margin-bottom:24px;">Fill out the form below and we'll be in touch quickly.</p>
          <iframe src="${client.hcp.leadFormUrl}" title="Astron Services Request Form" style="width:100%;min-height:620px;border:0;" loading="lazy"></iframe>
        </div>
      </div>
      <!-- Contact Info Sidebar -->
      <div>
        <div class="kg-card" style="padding:28px;margin-bottom:24px;">
          <h3 style="margin-bottom:16px;">Contact Info</h3>
          <p><strong>&#128222; Phone:</strong><br><a href="tel:${client.phoneRaw}" style="font-size:1.3rem;font-weight:700;color:var(--kg-primary);">${client.phone}</a></p>
          <p style="margin-top:16px;"><strong>&#9993; Email:</strong><br><a href="mailto:${client.email}">${client.email}</a></p>
          <p style="margin-top:16px;"><strong>&#128205; Address:</strong><br><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(client.address)}" target="_blank" rel="noopener">${client.address}</a></p>
          <p style="margin-top:16px;"><strong>Service Area:</strong><br>Wichita metro area, Kansas</p>
          <p style="margin-top:16px;"><strong>Certifications:</strong><br>${client.certifications}</p>
        </div>
        <div class="kg-card" style="padding:28px;margin-bottom:24px;">
          <h4>Business Hours</h4>
          <p style="margin-top:12px;">${client.hours}</p>
        </div>
        <div class="kg-card" style="padding:28px;">
          <h4>Book Online</h4>
          <p style="color:var(--kg-text-light);margin-bottom:16px;">Prefer to book your appointment directly? Use our online scheduler.</p>
          <a href="${client.hcp.bookingUrl}" target="_blank" rel="noopener" class="btn btn-primary" style="width:100%;margin-bottom:10px;">Book an Appointment</a>
          <a href="${client.hcp.portalUrl}" target="_blank" rel="noopener" class="btn btn-outline" style="width:100%;">Customer Portal Login</a>
        </div>
      </div>
    </div>
  </div>
</section>`;

  writePage('contact/index.html', page({
    title: `Contact Astron Services | Free Quote | ${client.phone}`,
    metaDesc: `Contact Astron Services for plumbing, heating, and cooling service in Wichita, KS. Call ${client.phone} or book online.`,
    canonical: `https://${client.domain}/contact/`,
    schema: localBusinessSchema() + '\n' + breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact/' }]),
    body,
  }));
  console.log('  Built: /contact/');
}

// ───────────────────────── SERVICE HUB PAGE ─────────────────────────
function buildServicePage(svc) {
  const faqs = [
    { q: `How much does ${svc.name.toLowerCase()} cost in the Wichita area?`, a: `Astron Services provides honest, upfront pricing for ${svc.name.toLowerCase()} in the Wichita metro area. Call ${client.phone} for a clear quote before any work begins.` },
    { q: `Do you offer ${svc.name.toLowerCase()} for commercial properties?`, a: `Yes. Astron Services provides ${svc.name.toLowerCase()} for both residential and light commercial customers throughout the Wichita metro area.` },
    { q: `How quickly can Astron Services respond for ${svc.name.toLowerCase()}?`, a: `Astron Services responds quickly to service calls throughout the Wichita metro area. Call ${client.phone} to discuss your situation and schedule service.` },
    { q: `Is Astron Services licensed for ${svc.name.toLowerCase()}?`, a: `Yes. Astron Services' technicians are licensed and insured, and the company is an authorized RUUD dealer for high-efficiency heating and cooling equipment.` },
  ];

  const mainContent = `<h2>${svc.title} in the Wichita Metro Area</h2>
${fill(svc.body, 'the Wichita metro area', 'Sedgwick')}
<h3 style="margin-top:36px;">Why Choose Astron Services?</h3>
<ul>
  <li><strong>Locally owned and operated</strong> &mdash; based right here in Wichita</li>
  <li><strong>RUUD Authorized Dealer</strong> &mdash; high-efficiency systems with manufacturer warranties</li>
  <li><strong>Honest pricing</strong> &mdash; no hidden fees, clear quotes before work begins</li>
  <li><strong>Licensed and insured</strong> &mdash; every technician held to a professional standard</li>
  <li><strong>Residential and light commercial</strong> &mdash; we serve homes and small businesses</li>
</ul>`;

  const body = `
<section class="section-dark" style="padding:80px 0;background:linear-gradient(145deg,var(--kg-bg-dark) 0%,var(--kg-secondary) 100%);">
  <div class="container">
    <nav aria-label="Breadcrumb" style="font-size:0.85rem;margin-bottom:16px;color:rgba(255,255,255,0.6);"><a href="/" style="color:rgba(255,255,255,0.7);">Home</a> / <span>${svc.name}</span></nav>
    <h1 style="color:#fff;">${svc.title} in the Wichita Metro Area</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:1.1rem;max-width:600px;margin-top:12px;">${fill(svc.description, 'the Wichita metro area', 'Sedgwick')}</p>
    <div style="display:flex;gap:16px;margin-top:28px;flex-wrap:wrap;"><a href="${client.hcp.bookingUrl}" target="_blank" rel="noopener" class="btn btn-primary">Book Online Now</a><a href="tel:${client.phoneRaw}" class="btn btn-outline-white">&#9742; ${client.phone}</a></div>
  </div>
</section>
<section>
  <div class="container">
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:48px;align-items:start;">
      <div class="service-content">
        ${mainContent}
      </div>
      <div>
        <div class="kg-card" style="padding:28px;position:sticky;top:90px;">
          <h4>Book This Service</h4>
          <p style="color:var(--kg-text-light);margin-bottom:20px;">Call us or book online.</p>
          <a href="tel:${client.phoneRaw}" class="btn btn-primary" style="width:100%;margin-bottom:12px;">&#9742; ${client.phone}</a>
          <a href="${client.hcp.bookingUrl}" target="_blank" rel="noopener" class="btn btn-outline" style="width:100%;">Book Online</a>
          <div style="margin-top:20px;padding-top:20px;border-top:1px solid var(--kg-border);"><p style="font-size:0.88rem;color:var(--kg-text-light);">${client.certifications} &bull; Locally Owned</p></div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section-alt">
  <div class="container">
    <div class="section-title"><h2>What Our Customers Say</h2></div>
    <div class="kg-grid kg-grid-3">${reviewCards()}</div>
  </div>
</section>
<section>
  <div class="container">
    <div class="section-title"><div class="section-label">Service Areas</div><h2>Where Does Astron Provide ${svc.title}?</h2></div>
    <div class="kg-grid kg-grid-4" style="gap:16px;">
      ${cities.map(c => `<a href="/${svc.comboSlug}-${c.slug}/" class="kg-card" style="padding:20px;text-align:center;text-decoration:none;"><strong style="color:var(--kg-primary);">${c.name}</strong><br><small style="color:var(--kg-text-light);">${svc.name}</small></a>`).join('')}
    </div>
  </div>
</section>
<section class="section-alt">
  <div class="container">
    <div class="section-title"><div class="section-label">FAQs</div><h2>Common Questions About ${svc.name}</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>`;

  writePage(`${svc.slug}/index.html`, page({
    title: `${svc.title} in Wichita, KS | Astron Services`,
    metaDesc: fill(svc.description, 'the Wichita metro area').substring(0, 155),
    canonical: `https://${client.domain}/${svc.slug}/`,
    schema: localBusinessSchema() + '\n' + serviceSchema(svc.name, `/${svc.slug}/`) + '\n' + breadcrumbSchema([{ name: 'Home', url: '/' }, { name: svc.name, url: `/${svc.slug}/` }]) + '\n' + faqSchema(faqs),
    body,
  }));
  console.log(`  Built: /${svc.slug}/`);
}

module.exports = { buildHome, buildAbout, buildContact, buildServicePage };
