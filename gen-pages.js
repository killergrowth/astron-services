/**
 * gen-pages.js — Generates all service, city, and service×location pages
 * Frosty's Heating and Air — KillerGrowth 2026-06-23
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

function write(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
}

function faqHTML(items) {
  return items.map(f => `<div class="faq-item">
<button class="faq-question" aria-expanded="false">${f.q}<span class="faq-icon">+</span></button>
<div class="faq-answer"><p>${f.a}</p></div>
</div>`).join('\n');
}

function faqSchema(items) {
  return JSON.stringify({ "@context":"https://schema.org","@type":"FAQPage","mainEntity":
    items.map(f=>({
      "@type":"Question","name":f.q.replace(/&[a-z]+;/g,' ').replace(/<[^>]+>/g,''),
      "acceptedAnswer":{"@type":"Answer","text":f.a.replace(/<[^>]+>/g,'').replace(/&[a-z]+;/g,' ')}
    }))
  });
}

const JS_FAQ = `<script>
document.querySelectorAll('.faq-question').forEach(btn=>{
  btn.addEventListener('click',function(){
    const item=this.closest('.faq-item');const open=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
    if(!open){item.classList.add('open');}this.setAttribute('aria-expanded',!open);
  });
});
</script>`;

// ===================== SERVICE DATA =====================
const SERVICES = [
  { name:'Furnace Repair', slug:'furnace-repair', img:'service-furnace-repair.jpg',
    shortDesc:'Fast furnace diagnostics and repair. Most jobs completed same visit with parts from our local inventory.',
    meta:"Furnace not working? Frosty's Heating and Air provides fast furnace repair across Kootenai County with flat-rate pricing and 24/7 emergency response. Call (208) 555-0194.",
    intro:`<p>Coeur d'Alene January lows average near 22&deg;F, and temperatures can drop to 0&deg;F during hard cold snaps. When a furnace stops working in those conditions, it is a safety situation. Frosty&rsquo;s Heating and Air handles furnace repairs across Kootenai County with local parts on hand, flat-rate pricing quoted before any work begins, and the same technician dispatched to your home every visit.</p>
<p>Most north Idaho furnace failures involve predictable components: failed ignitors (common on systems over 10 years old), dirty flame sensors, cracked heat exchangers, control board failures, and blower motor issues. Diagnostic service runs $85&ndash;$150. Common repairs: igniter $150&ndash;$300, flame sensor cleaning $80&ndash;$150, control board $200&ndash;$600, heat exchanger $400&ndash;$900. You see the flat-rate price before we touch anything.</p>`,
    faqs:[
      {q:"How fast does Frosty's respond to emergency furnace calls in Coeur d'Alene?",a:"Emergency calls get priority dispatch. Most nights we arrive within 1&ndash;3 hours. We carry common parts on our trucks so most emergency repairs complete the same visit."},
      {q:"How much does furnace repair cost in Coeur d'Alene, Idaho?",a:"Diagnostics run $85&ndash;$150. Common repairs: igniter $150&ndash;$300, flame sensor $80&ndash;$150, control board $200&ndash;$600, heat exchanger $400&ndash;$900. Flat-rate quote before we start."},
      {q:"My furnace turns on but doesn't heat &mdash; what's wrong?",a:"Typically a heat exchanger issue, a dirty flame sensor causing premature shutoff, or a system struggling against extreme cold. We diagnose the specific cause before recommending any repair."},
      {q:"How do I know if my furnace needs repair or replacement?",a:"If the system is under 15 years old and repair cost is under half the cost of a new unit, repair usually makes sense. Cracked heat exchangers typically make replacement the better financial decision."},
      {q:"Does Frosty's repair all furnace brands?",a:"Yes. We service Carrier, Lennox, Trane, Rheem, Goodman, Bryant, York, and other brands common in Kootenai County homes."},
      {q:"Does Frosty's offer 24/7 emergency furnace repair?",a:"Yes. Call (208) 555-0194 any time. We answer emergency heating calls around the clock &mdash; evenings, weekends, and holidays."}
    ]
  },
  { name:'Furnace Installation', slug:'furnace-installation', img:'service-furnace-installation.jpg',
    shortDesc:'Full furnace replacement from removal through commissioning. Properly sized for north Idaho winters.',
    meta:"Installing a new furnace in Coeur d'Alene or Kootenai County? Frosty's handles full installations with flat-rate pricing. Ranges $3,500-$8,000. Call (208) 555-0194.",
    intro:`<p>Replacing a furnace in north Idaho requires more than picking a unit off a price sheet. Coeur d'Alene&rsquo;s climate &mdash; January lows near 22&deg;F, heating seasons running October through April &mdash; demands a properly sized, correctly installed system. Frosty&rsquo;s handles the full replacement: removal of the old unit, installation of the new one, commissioning, and a complete walkthrough before we leave.</p>
<p>Furnace replacements in Kootenai County range $3,500&ndash;$8,000 depending on system size, efficiency (AFUE), and whether duct modifications are needed. High-efficiency units (95&ndash;98% AFUE) cost more upfront but reduce monthly bills significantly in a climate where heating systems run six months per year. Many older CdA homes near Tubbs Hill have 25+ year-old systems past the point of cost-effective repair.</p>`,
    faqs:[
      {q:"How much does a new furnace cost installed in Coeur d'Alene?",a:"Furnace replacements in Kootenai County range $3,500&ndash;$8,000 depending on system size and efficiency. High-efficiency (95% AFUE) units cost more upfront but deliver lower monthly heating bills in north Idaho's long winters."},
      {q:"How long does a furnace installation take?",a:"Most residential replacements take 4&ndash;8 hours. We remove the old unit, install the new one, connect to existing ductwork, and commission the system. You're back to heat the same day."},
      {q:"What size furnace does my Coeur d'Alene home need?",a:"Sizing depends on square footage, ceiling height, insulation, and window area. For north Idaho with lows near 0&deg;F, we need larger BTU capacity than warmer climates. We run a load calculation before recommending anything."},
      {q:"Should I replace my furnace with a heat pump instead?",a:"Worth considering. Idaho Power and Avista Utilities both offer rebates on qualifying heat pump installations. If replacing both furnace and AC, heat pump economics often make sense. We'll run the numbers for your home."},
      {q:"Do I need permits for a furnace replacement in Idaho?",a:"Yes. Most furnace replacements require a mechanical permit from Kootenai County or the City of Coeur d'Alene. We handle permit coordination as part of the installation."},
      {q:"What brands does Frosty's install?",a:"We install Carrier, Trane, Lennox, Rheem, Goodman, and other major brands. We recommend the best value for your budget and heating needs &mdash; not the highest-margin option."}
    ]
  },
  { name:'AC Repair', slug:'ac-repair', img:'service-ac-repair.jpg',
    shortDesc:'Central AC repair in Coeur d\'Alene and Kootenai County. Wildfire smoke season clogs condenser coils &mdash; we know what to look for.',
    meta:"AC not working in Coeur d'Alene or Kootenai County? Frosty's Heating and Air repairs all central AC brands with flat-rate pricing. Call (208) 555-0194.",
    intro:`<p>Coeur d'Alene July average highs run near 90&deg;F, and when a central AC system fails during a north Idaho heat wave, the window to get it fixed comfortably is short. Frosty&rsquo;s Heating and Air repairs central AC systems across Kootenai County with flat-rate pricing and a technician who knows your system.</p>
<p>Common AC problems in Kootenai County homes: low refrigerant charge, failed capacitors, dirty condenser coils from wildfire smoke season, compressor problems, and thermostat failures. Wildfire smoke season (August&ndash;September) is specific to the Inland Northwest &mdash; fine particulate clogs condenser coils faster than normal dust load. Diagnostic costs run $85&ndash;$150; most repairs complete same day.</p>`,
    faqs:[
      {q:"How much does AC repair cost in Coeur d'Alene?",a:"Diagnostics run $85&ndash;$150. Common repairs: capacitor $150&ndash;$350, refrigerant recharge $200&ndash;$500, coil cleaning $150&ndash;$300, compressor replacement $800&ndash;$2,000+. Flat-rate quote before we start."},
      {q:"Why is my AC running but not cooling my Coeur d'Alene home?",a:"Most commonly: low refrigerant, dirty condenser coil, or a failing compressor. In late summer, wildfire smoke particulate clogging the condenser is also common. We diagnose on-site."},
      {q:"My AC froze up &mdash; what do I do?",a:"Set thermostat to Fan Only (not cooling) and let it thaw 2&ndash;4 hours. Check and replace the air filter if dirty. Once thawed, try cooling again. If it freezes again, call us &mdash; it's typically low refrigerant or an airflow problem."},
      {q:"How quickly can Frosty's respond to broken AC in summer?",a:"We try to schedule same day or next day. Peak July heat weeks book fast &mdash; calling early in the day helps. We prioritize calls where indoor temperature is unsafe."},
      {q:"How often should I have my AC serviced in north Idaho?",a:"Annual service before cooling season (May) is standard. Post-wildfire-smoke-season service (October) is also valuable to clear condenser coils before winter."},
      {q:"Do you repair mini-split AC systems?",a:"Yes. We service both central AC and ductless mini-split systems throughout Kootenai County."}
    ]
  },
  { name:'AC Installation', slug:'ac-installation', img:'service-ac-installation.jpg',
    shortDesc:'New central AC installation in Coeur d\'Alene and Kootenai County. Sized for north Idaho summers.',
    meta:"Installing central AC in Coeur d'Alene or Kootenai County? Frosty's handles new installations with flat-rate pricing. Ranges $3,500-$7,500. Call (208) 555-0194.",
    intro:`<p>Coeur d'Alene wasn&rsquo;t always an air conditioning market, but July average highs near 90&deg;F have changed the calculus. Many Kootenai County homes built before 2000 have no central AC or have aging systems approaching end of life. Frosty&rsquo;s handles full central AC installations &mdash; properly sized for north Idaho summers and compatible with existing heating systems.</p>
<p>Central AC installations in Kootenai County range $3,500&ndash;$7,500 depending on system size, efficiency (SEER rating), and whether existing ductwork requires modification. Post Falls and Hayden new construction often has ductwork ready for AC. Older Coeur d'Alene homes may need duct modifications &mdash; we assess before quoting.</p>`,
    faqs:[
      {q:"How much does new central AC cost installed in Coeur d'Alene?",a:"Central AC installations range $3,500&ndash;$7,500 in Kootenai County depending on size and efficiency. Duct modification costs are additional if needed."},
      {q:"Do older Coeur d'Alene homes need duct modifications for central AC?",a:"Often yes. Homes built before the 1990s were frequently designed for heating only. We assess ductwork capacity and airflow balance before quoting the full installation."},
      {q:"Should I install a heat pump instead of traditional AC?",a:"If you also need a new furnace, a heat pump is worth comparing seriously &mdash; Idaho Power and Avista both offer rebates. If your furnace is in good shape, standalone AC is typically more cost-effective."},
      {q:"What SEER rating should I choose for north Idaho?",a:"Federal minimums in Idaho are 14.3 SEER2. Higher efficiency (16&ndash;20 SEER2) costs more upfront. Given Coeur d'Alene's shorter cooling season (June&ndash;September) versus hotter climates, the payback period is longer."},
      {q:"How long does a central AC installation take?",a:"Standard installations take 4&ndash;8 hours. If duct modifications are needed, plan for 1&ndash;2 days."},
      {q:"Can Frosty's add AC to my home if I only have a furnace?",a:"Yes. We assess existing ductwork, calculate the correct system size, and install both the indoor coil and outdoor condenser unit."}
    ]
  },
  { name:'Heat Pump Service', slug:'heat-pump-service', img:'service-heat-pump.jpg',
    shortDesc:'Heat pump installation, repair, and service. Idaho Power and Avista rebates available for Kootenai County homeowners.',
    meta:"Heat pump installation and service in Coeur d'Alene and Kootenai County. Idaho Power and Avista rebates available. Flat-rate pricing. Call (208) 555-0194.",
    intro:`<p>Heat pump conversions are a growing part of the Coeur d'Alene HVAC market. Both Idaho Power and Avista Utilities offer rebates on qualifying cold-climate heat pump installations, and modern cold-climate models operate efficiently down to -15&deg;F &mdash; well below Coeur d'Alene&rsquo;s average January low of 22&deg;F. Frosty&rsquo;s Heating and Air handles heat pump installation, repair, and maintenance across Kootenai County.</p>
<p>Many Kootenai County homeowners who relocated from California, Washington, or Oregon are already familiar with heat pumps. For those new to the technology, we walk through how it works, what operating costs look like in our climate, and whether a full conversion or a hybrid system (heat pump plus gas backup) makes more financial sense for your home.</p>`,
    faqs:[
      {q:"How much does heat pump installation cost in Coeur d'Alene?",a:"Heat pump installations range $6,000&ndash;$12,000 depending on system size. Idaho Power and Avista rebates can reduce this by $200&ndash;$800 depending on your utility and the system's efficiency rating."},
      {q:"Do heat pumps work in north Idaho winters?",a:"Modern cold-climate heat pumps work efficiently down to -15&deg;F, covering nearly all Coeur d'Alene winter nights. January average lows near 22&deg;F are well within the efficient operating range."},
      {q:"What rebates are available for heat pump installation in Kootenai County?",a:"Idaho Power customers may qualify for $200&ndash;$800 on qualifying cold-climate heat pumps. Avista customers should ask about current program offerings. Rebate amounts change periodically."},
      {q:"Should I get a heat pump or furnace for my Coeur d'Alene home?",a:"If replacing both heating and cooling, a heat pump comparison makes sense. If you only need heating and AC is fine, a furnace replacement is typically simpler. We'll run the numbers for your home."},
      {q:"Can I keep my gas furnace and add a heat pump?",a:"Yes &mdash; called a dual-fuel or hybrid system. The heat pump handles heating above a set temperature (usually 25&ndash;35&deg;F) and the gas furnace takes over in extreme cold."},
      {q:"Do heat pumps also work as air conditioners?",a:"Yes. Heat pumps are reversible &mdash; they move heat out in summer and in during winter. One system replaces both furnace and central AC."}
    ]
  },
  { name:'Duct Cleaning', slug:'duct-cleaning', img:'service-duct-cleaning.jpg',
    shortDesc:'Professional duct cleaning using truck-mounted negative pressure equipment. Wildfire smoke season and Lake CdA humidity make this a north Idaho priority.',
    meta:"Duct cleaning in Coeur d'Alene and Kootenai County. Wildfire smoke season and lake humidity are real air quality issues. Call Frosty's at (208) 555-0194.",
    intro:`<p>Duct cleaning in Coeur d'Alene is more than routine maintenance &mdash; it&rsquo;s an air quality issue. Wildfire smoke season (August&ndash;September) pushes fine particulate into residential HVAC systems across the Inland Northwest. Lake Coeur d'Alene&rsquo;s humidity also creates mold risk conditions in crawl spaces and basement duct runs. Frosty&rsquo;s cleans residential duct systems across Kootenai County using truck-mounted negative pressure equipment that extracts debris rather than agitating it into the living space.</p>
<p>A standard duct cleaning on a 2,000&ndash;3,000 sq ft Coeur d'Alene home (8&ndash;12 supply vents) takes 2&ndash;4 hours. Typical cost: $300&ndash;$600 depending on home size. Most homeowners report immediately noticeable improvement in air quality after cleaning.</p>`,
    faqs:[
      {q:"How much does duct cleaning cost in Coeur d'Alene?",a:"Residential duct cleaning in Kootenai County typically runs $300&ndash;$600 depending on home size and vent count. Wildfire smoke contamination or visible mold may require additional treatment."},
      {q:"How often should duct cleaning be done in north Idaho?",a:"Every 3&ndash;5 years is a standard baseline. After a heavy wildfire smoke season, more frequent cleaning makes sense. After purchasing a home with unknown service history, clean them."},
      {q:"Does duct cleaning improve air quality after wildfire smoke season?",a:"Yes. Wildfire smoke particulate that accumulates in ductwork during August&ndash;September events continues circulating until removed. Cleaning eliminates that source of ongoing contamination."},
      {q:"How do I know if my ducts need cleaning?",a:"Visible dust or debris around supply vents, musty smell from vents, worsened allergies or respiratory symptoms, or purchase of a home with unknown duct history are the primary indicators."},
      {q:"Does duct cleaning spread mold or make it worse?",a:"Proper duct cleaning uses negative pressure to contain and extract debris. Done correctly, it doesn't spread mold spores. If mold is found, we'll let you know and discuss remediation options."},
      {q:"Can dirty ducts reduce HVAC efficiency?",a:"Yes. Significant duct buildup restricts airflow, forces the system to run longer to reach temperature, and increases wear on blower motors and heat exchangers."}
    ]
  },
  { name:'HVAC Maintenance Plans', slug:'hvac-maintenance-plans', img:'service-maintenance.jpg',
    shortDesc:"Annual HVAC tune-ups for Kootenai County homeowners. We call you to schedule &mdash; you don't have to remember.",
    meta:"HVAC maintenance plans in Coeur d'Alene and Kootenai County. Frosty's calls you to schedule annual tune-ups. Catch problems before failures. Call (208) 555-0194.",
    intro:`<p>Frosty&rsquo;s maintenance plans work differently: we call you to schedule the annual tune-up. You don&rsquo;t need to remember to call us every fall &mdash; we track it and reach out. Annual furnace and AC tune-ups are the most cost-effective thing Kootenai County homeowners can do to extend system life and avoid emergency repair bills in the middle of a north Idaho winter.</p>
<p>Coeur d'Alene heating systems run hard &mdash; October through April, often 6+ hours per day during cold snaps. Systems without annual service accumulate problems: cracked heat exchangers, failing capacitors, dirty flame sensors, degraded blower motors. A $120&ndash;$200 annual tune-up catches these early. An emergency December furnace failure costs several times more.</p>`,
    faqs:[
      {q:"What does a furnace tune-up include from Frosty's?",a:"We clean and inspect burners, heat exchanger, blower assembly, and flame sensor. Test ignition sequence, check CO output, measure airflow, inspect flue connections, and test safety controls. You get a written report of anything we find."},
      {q:"How much does an HVAC maintenance plan cost in Coeur d'Alene?",a:"Annual maintenance agreements include one furnace tune-up and one AC tune-up per year. Call (208) 555-0194 for current plan pricing."},
      {q:"When should I schedule my furnace tune-up in north Idaho?",a:"October is ideal &mdash; before heating season starts but before technicians are slammed with emergency calls. We call maintenance plan customers in September to set fall scheduling."},
      {q:"Do I really need annual furnace maintenance?",a:"In a climate where your furnace runs 6+ months per year, yes. Systems without regular service fail more often and earlier. The heat exchanger &mdash; which can crack and create CO risk &mdash; needs annual inspection."},
      {q:"What's included in an AC tune-up?",a:"We clean condenser coils (important after wildfire smoke season), check refrigerant charge, inspect capacitor and contactor, test thermostat, and measure airflow and temperature differential."},
      {q:"Can I add an existing system to a Frosty's maintenance plan even if you haven't serviced it before?",a:"Yes. We start with a full diagnostic inspection to establish a baseline, then enroll you in the annual plan going forward."}
    ]
  },
  { name:'Emergency Heating Repair', slug:'emergency-heating-repair', img:'service-emergency.jpg',
    shortDesc:'24/7 emergency furnace repair across Kootenai County. We answer every call &mdash; evenings, weekends, holidays.',
    meta:"24/7 emergency heating repair in Coeur d'Alene and Kootenai County. Frosty's Heating and Air answers every emergency call any hour. Call (208) 555-0194 now.",
    intro:`<p>Coeur d'Alene January lows average 22&deg;F with occasional drops to 0&deg;F and below. For homes dependent on forced-air gas furnaces with no backup heating, a furnace failure in those conditions is a genuine emergency. Frosty&rsquo;s Heating and Air answers 24/7 emergency heating calls every night of the year &mdash; including weekends and holidays.</p>
<p>We carry common furnace parts on our emergency trucks: ignitors, flame sensors, control boards, capacitors. Most emergency repairs complete in a single visit. We don&rsquo;t send someone to look and then come back two days later. You get a technician who arrives, diagnoses, quotes a flat rate, and fixes it the same night when parts allow.</p>`,
    faqs:[
      {q:"How fast does Frosty's respond to a furnace emergency in Coeur d'Alene?",a:"Emergency calls get priority. Most nights we aim to arrive within 1&ndash;3 hours. During extreme cold when call volume spikes, we're transparent about current ETAs when you call."},
      {q:"Is there an extra charge for emergency heating service after hours?",a:"Emergency calls carry a service call fee. We're upfront about this before dispatch. The flat-rate pricing still applies to the actual repair &mdash; what we quote is what you pay."},
      {q:"What should I do while waiting for emergency heating service?",a:"Close off unused rooms and gather in one area. Use electric space heaters with caution. Check the thermostat is set above room temperature and the furnace power switch is on. Don't try to bypass safety controls."},
      {q:"My furnace won't start at 11pm on a Sunday &mdash; will Frosty's really come?",a:"Yes. That's what 24/7 means. Call (208) 555-0194. Sundays, holidays, any night."},
      {q:"Do you handle propane heating emergencies in Rathdrum and rural Kootenai County?",a:"Yes. Propane-heated homes are common in rural Kootenai County. We service both gas and propane systems."},
      {q:"What if my furnace needs a part you don't have on the truck?",a:"We diagnose and give you the repair cost upfront. If a part isn't on hand, we give a realistic timeline and options for maintaining safe heat overnight if needed."}
    ]
  },
  { name:'Mini-Split Installation', slug:'mini-split-installation', img:'service-mini-split.jpg',
    shortDesc:"Ductless mini-split installation in Coeur d'Alene and Kootenai County. Ideal for lake cabins, additions, and homes without duct runs.",
    meta:"Mini-split installation in Coeur d'Alene and Kootenai County. Ductless HVAC for cabins, additions, homes without ductwork. Call Frosty's at (208) 555-0194.",
    intro:`<p>Ductless mini-split systems are particularly well-suited to Coeur d'Alene&rsquo;s housing market. Many Spirit Lake and Fernan Lake Village homes started as seasonal cabins and have been converted to year-round residences &mdash; often without central duct systems. Homes with additions, finished garages, or sunrooms not connected to existing ductwork are ideal mini-split candidates. Frosty&rsquo;s installs, repairs, and maintains ductless mini-split systems across Kootenai County.</p>
<p>Mini-split installations run $3,000&ndash;$6,000 for a single-zone system. Multi-zone systems (one outdoor unit serving multiple indoor units) range $5,000&ndash;$12,000. Modern cold-climate mini-splits function as both heaters and air conditioners and operate efficiently down to -20&deg;F.</p>`,
    faqs:[
      {q:"How much does mini-split installation cost in Coeur d'Alene?",a:"Single-zone installations run $3,000&ndash;$6,000. Multi-zone systems range $5,000&ndash;$12,000 depending on the number of indoor units and system size."},
      {q:"Are mini-splits effective for heating in north Idaho winters?",a:"Modern cold-climate mini-splits operate efficiently down to -20&deg;F. They work well for Coeur d'Alene's typical winters. For primary heating of a full home, a multi-zone system may be appropriate."},
      {q:"What types of homes are best for mini-splits in Kootenai County?",a:"Homes without existing duct systems (lake cabins converted to year-round residences), additions or finished spaces not connected to ductwork, and homes where one room consistently runs too hot or cold."},
      {q:"How long does a mini-split installation take?",a:"A single-zone installation typically takes 4&ndash;8 hours. Multi-zone systems may take 1&ndash;2 days depending on the number of indoor units and refrigerant line routing."},
      {q:"Do mini-splits qualify for Idaho Power or Avista rebates?",a:"Mini-split heat pumps may qualify for rebates from Idaho Power and Avista depending on SEER2 and HSPF2 ratings. Ask us when you call and we'll check current program eligibility."},
      {q:"Can a mini-split be my home's only heating source in Coeur d'Alene?",a:"For well-insulated modern construction, yes. For older or larger homes, a mini-split may work better as a supplemental or zone-specific system. We assess your home's insulation and layout before recommending."}
    ]
  }
];

// ===================== CITY DATA =====================
const CITIES = [
  { name:"Coeur d'Alene", slug:'coeur-d-alene', img:'city-coeur-d-alene.jpg', state:'ID',
    context:`Coeur d'Alene is the Kootenai County seat with roughly 55,000 city residents and 175,000 in the broader metro. The city sits on the north shore of Lake Coeur d'Alene, which influences both humidity conditions in residential crawl spaces and the area&rsquo;s character as a lakefront community. The housing stock ranges from 1960s&ndash;1990s forced-air gas systems in older core neighborhoods like the Sherman Avenue corridor and Tubbs Hill adjacent streets, to newer construction along the Ramsey Road and Government Way corridors. January lows average near 22&deg;F with occasional drops to 0&deg;F during extreme cold events. Average annual snowfall exceeds 45 inches.`,
    neighborhoods:"Sherman Ave area, Tubbs Hill adjacent, Fernan Lake Village, Canfield area, Ramsey Road corridor, Government Way corridor",
    note:"Frosty's home city. We're based at 812 W Ironwood Dr. Response times to most CdA addresses are among our fastest."
  },
  { name:'Post Falls', slug:'post-falls', img:'city-post-falls.jpg', state:'ID',
    context:`Post Falls is Kootenai County's fastest-growing city, with roughly 43,000 residents and a significant concentration of new construction along the Mullan Ave and Seltice Way corridors. Heavy two-income family demographics create strong demand for reliable, appointment-keeping service. Many homes are in the 1&ndash;3 year post-builder warranty window &mdash; prime time to establish a service relationship before the first major system issue. Lower elevation than CdA proper means slightly milder winters, but still harsh enough that heating reliability matters.`,
    neighborhoods:"The Meadows, Riverview, Copper Valley, Fall Creek, Riverbend, Seltice Way corridor",
    note:"High-growth market. Post Falls new construction means many systems transitioning out of builder warranty and needing first professional service."
  },
  { name:'Hayden', slug:'hayden', img:'city-hayden.jpg', state:'ID',
    context:`Hayden is an upscale north-side suburb adjacent to Coeur d'Alene with roughly 16,000 residents and median household income around $72,000