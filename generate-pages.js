/**
 * generate-pages.js — Frosty's Heating and Air
 * Generates all service pages, city pages, and service×location pages
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

function write(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, { encoding: 'utf8' });
}

function faq(items) {
  let html = '';
  items.forEach(item => {
    html += `    <div class="faq-item">
      <button class="faq-question" aria-expanded="false">${item.q}<span class="faq-icon">+</span></button>
      <div class="faq-answer"><p>${item.a}</p></div>
    </div>\n`;
  });
  return html;
}

function faqSchema(items) {
  return items.map(item => `{"@type":"Question","name":${JSON.stringify(item.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(item.a.replace(/<[^>]+>/g,''))}}}`).join(',');
}

function faqScript() {
  return `<script>
document.querySelectorAll('.faq-question').forEach(btn=>{
  btn.addEventListener('click',function(){
    const item=this.closest('.faq-item');
    const open=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
    if(!open)item.classList.add('open');
    this.setAttribute('aria-expanded',!open);
  });
});
</script>`;
}

const SERVICES = [
  { name:'Furnace Repair', slug:'furnace-repair', img:'service-furnace-repair.jpg',
    tagline:"Fast furnace repair in Coeur d&rsquo;Alene and Kootenai County. Flat-rate pricing. Same technician. Local parts on hand.",
    meta:"Furnace not working? Frosty's Heating and Air provides fast furnace repair across Kootenai County. Flat-rate pricing. 24/7 emergency line. Call (208) 555-0194.",
    intro:`<p>Coeur d'Alene January lows average near 22&deg;F. When a furnace stops working in that environment, it is a safety situation &mdash; not a minor inconvenience. Frosty&rsquo;s Heating and Air handles furnace repairs across Kootenai County with local parts on hand, flat-rate pricing quoted before any work begins, and the same technician dispatched to your home every visit.</p>
    <p>Most furnace problems in north Idaho homes fall into predictable categories: failed ignitors (common on systems over 10 years old), dirty flame sensors, cracked heat exchangers, control board failures, and blower motor issues. We stock common replacement parts locally so most repairs happen on the first visit &mdash; no waiting on distributors.</p>
    <p>Diagnostic service in the Coeur d'Alene area runs $85&ndash;$150. Common repairs: igniter replacement $150&ndash;$300, flame sensor cleaning $80&ndash;$150, control board $200&ndash;$600, heat exchanger $400&ndash;$900. You get the flat-rate price before we touch anything.</p>`,
    faqs:[
      {q:"How fast can Frosty's respond to a furnace emergency in Coeur d'Alene?",a:"Emergency calls get priority dispatch. Evenings and nights, we aim to arrive within 1&ndash;3 hours depending on current call volume. We carry common parts on our trucks so most emergency repairs complete the same visit."},
      {q:"How much does furnace repair cost in Coeur d'Alene, Idaho?",a:"Diagnostics run $85&ndash;$150. Common repairs: igniter $150&ndash;$300, flame sensor cleaning $80&ndash;$150, control board $200&ndash;$600, heat exchanger $400&ndash;$900. You get the flat-rate price before we start."},
      {q:"My furnace turns on but doesn't heat the house &mdash; what's wrong?",a:"This is usually a heat exchanger issue, a dirty flame sensor causing premature shutoff, or an undersized system struggling against north Idaho cold. We diagnose the specific cause before recommending any repair."},
      {q:"Do you repair all furnace brands?",a:"Yes. We service Carrier, Lennox, Trane, Rheem, Goodman, Bryant, York, and other brands common in Kootenai County homes."},
      {q:"How do I know if my furnace needs repair or replacement?",a:"If the system is under 15 years old and the repair cost is less than half a new unit, repair typically makes sense. Cracked heat exchangers usually make replacement the better financial decision."},
      {q:"Does Frosty's offer 24/7 emergency furnace repair?",a:"Yes. Call (208) 555-0194 any time. We answer emergency heating calls around the clock &mdash; evenings, weekends, and holidays."}
    ]
  },
  { name:'Furnace Installation', slug:'furnace-installation', img:'service-furnace-installation.jpg',
    tagline:"New furnace installation in Coeur d&rsquo;Alene and Kootenai County. Properly sized for north Idaho winters. Flat-rate pricing.",
    meta:"Installing a new furnace in Coeur d'Alene or Kootenai County? Frosty's handles full installations with flat-rate pricing. Call (208) 555-0194.",
    intro:`<p>Replacing a furnace in a north Idaho home requires more than picking a unit off a price sheet. Coeur d'Alene&rsquo;s climate &mdash; with January lows near 22&deg;F and heating seasons that run October through April &mdash; demands a properly sized, correctly installed system. Frosty&rsquo;s Heating and Air handles the full replacement: removal of the old unit, installation of the new one, commissioning, and a complete walkthrough before we leave.</p>
    <p>Furnace replacements in Kootenai County range $3,500&ndash;$8,000 depending on system size, efficiency rating (AFUE), and whether duct modifications are needed. High-efficiency units (95&ndash;98% AFUE) cost more upfront but reduce monthly heating bills in a climate where systems run nearly six months per year. Many homes in older CdA neighborhoods near Tubbs Hill have 25+ year-old systems that are past the point of cost-effective repair.</p>`,
    faqs:[
      {q:"How much does a new furnace cost installed in Coeur d'Alene?",a:"Furnace replacements in Kootenai County range $3,500&ndash;$8,000 depending on system size and efficiency. High-efficiency (95% AFUE) units cost more upfront but reduce heating bills significantly in north Idaho's long winters."},
      {q:"How long does a furnace installation take?",a:"Most residential furnace replacements take 4&ndash;8 hours. We remove the old unit, install the new one, connect to existing ductwork, and commission the full system. You're back to heat the same day."},
      {q:"What size furnace does my Coeur d'Alene home need?",a:"Furnace sizing depends on square footage, ceiling height, insulation quality, and window area. For a north Idaho climate with lows near 0&deg;F, we typically need larger BTU capacity than warmer climates. We run a load calculation before recommending anything."},
      {q:"Should I replace my furnace with a heat pump instead?",a:"Worth considering. Idaho Power and Avista Utilities both offer rebates on qualifying heat pump installations. For homes replacing both furnace and AC, the economics often favor a heat pump. We'll walk through the numbers for your specific situation."},
      {q:"Do I need permits for a furnace replacement in Idaho?",a:"Yes. Most furnace replacements in Idaho require a mechanical permit from Kootenai County or the City of Coeur d'Alene. We handle permit coordination as part of the installation."},
      {q:"What brands does Frosty's install?",a:"We install Carrier, Trane, Lennox, Rheem, Goodman, and other major brands. We recommend the best value for your budget and north Idaho's heating demands &mdash; not the highest-margin option."}
    ]
  },
  { name:'AC Repair', slug:'ac-repair', img:'service-ac-repair.jpg',
    tagline:"AC not working in Coeur d&rsquo;Alene? Frosty&rsquo;s repairs all central air brands. Flat-rate pricing. Fast response.",
    meta:"AC not working in Coeur d'Alene or Kootenai County? Frosty's Heating and Air repairs central AC systems fast with flat-rate pricing. Call (208) 555-0194.",
    intro:`<p>Coeur d'Alene summers hit average highs near 90&deg;F in July, and the heat can persist into August. When a central AC system fails during a north Idaho heat wave, the window to get it fixed comfortably is short. Frosty&rsquo;s Heating and Air handles AC repairs across Kootenai County with flat-rate pricing and a technician who knows your system.</p>
    <p>Common AC problems in Kootenai County homes: low refrigerant charge, failed capacitors, dirty condenser coils (especially after wildfire smoke season), compressor problems, and thermostat failures. Wildfire smoke season (August&ndash;September) is a specific issue in the Inland Northwest &mdash; particulate from regional fires clogs condenser coils faster than normal dust. Diagnostic costs run $85&ndash;$150; most repairs complete same day.</p>`,
    faqs:[
      {q:"How much does AC repair cost in Coeur d'Alene?",a:"Diagnostics run $85&ndash;$150. Common repairs: capacitor $150&ndash;$350, refrigerant recharge $200&ndash;$500, coil cleaning $150&ndash;$300, compressor replacement $800&ndash;$2,000+. Flat-rate quote before we start."},
      {q:"Why is my AC running but not cooling?",a:"Most commonly: low refrigerant charge, dirty condenser coil, or a failing compressor. In Coeur d'Alene late summer, wildfire smoke particulate clogging the condenser is also common. We diagnose the specific cause on-site."},
      {q:"My AC froze up &mdash; what do I do?",a:"Set the thermostat to Fan Only (not cooling) and let it thaw for 2&ndash;4 hours. Check and replace the air filter if dirty. Once thawed, try cooling again. If it freezes again, call us &mdash; it's typically low refrigerant or an airflow problem."},
      {q:"How quickly can you respond to a broken AC in July?",a:"We try to schedule AC repairs same day or next day. Peak July heat weeks book up fast &mdash; calling early in the day helps. We prioritize calls where the indoor temperature is unsafe."},
      {q:"How often should I have my AC serviced?",a:"Annual service before cooling season (May) is standard. In the Inland Northwest, post-wildfire-smoke-season service (October) is also valuable to clear condenser coils of particulate before winter."},
      {q:"Do you repair mini-split AC systems?",a:"Yes. We service both central AC systems and ductless mini-split systems throughout Kootenai County."}
    ]
  },
  { name:'AC Installation', slug:'ac-installation', img:'service-ac-installation.jpg',
    tagline:"New central AC installation in Coeur d&rsquo;Alene and Kootenai County. Properly sized for north Idaho summers.",
    meta:"Installing central AC in Coeur d'Alene or Kootenai County? Frosty's Heating and Air handles new installations with flat-rate pricing. Call (208) 555-0194.",
    intro:`<p>Coeur d'Alene wasn&rsquo;t always an air conditioning market, but July average highs near 90&deg;F have changed that. Many Kootenai County homes built before 2000 either have no central AC or have aging systems past end of life. Frosty&rsquo;s handles full central AC installations &mdash; properly sized for north Idaho summers and compatible with existing heating systems.</p>
    <p>Central AC installations in Kootenai County range $3,500&ndash;$7,500 depending on system size, efficiency (SEER rating), and whether existing ductwork requires modification. Homes in Post Falls and Hayden with newer construction often have ductwork ready for AC. Older Coeur d'Alene homes may need duct modifications &mdash; we assess before quoting.</p>`,
    faqs:[
      {q:"How much does a new AC unit cost installed in Coeur d'Alene?",a:"Central AC installations in Kootenai County range $3,500&ndash;$7,500 depending on system size and efficiency. Duct modification costs are additional if needed."},
      {q:"Do older Coeur d'Alene homes need duct modifications for central AC?",a:"Often yes. Homes built before the 1990s were frequently designed for heating only. We assess ductwork capacity and airflow balance before quoting the full installation."},
      {q:"Should I install a heat pump instead of central AC?",a:"If you also need a new furnace, a heat pump is worth comparing &mdash; it provides both heating and cooling and qualifies for Idaho Power and Avista rebates. If your furnace is in good shape, standalone AC is typically more cost-effective."},
      {q:"What SEER rating should I choose for north Idaho?",a:"Federal minimums in Idaho are currently 14.3 SEER2. Higher efficiency (16&ndash;20 SEER2) costs more upfront. Given Coeur d'Alene's relatively short cooling season (June&ndash;September), the payback period for premium efficiency is longer than in hotter climates."},
      {q:"How long does a central AC installation take?",a:"Standard installations take 4&ndash;8 hours. If duct modifications are needed, plan for 1&ndash;2 days."},
      {q:"Can you add AC to my home if I only have a furnace?",a:"Yes. We assess your existing ductwork, calculate the correct system size, and install the indoor coil and outdoor condenser unit."}
    ]
  },
  { name:'Heat Pump Service', slug:'heat-pump-service', img:'service-heat-pump.jpg',
    tagline:"Heat pump installation, repair &amp; service in Coeur d&rsquo;Alene. Idaho Power and Avista rebates available.",
    meta:"Heat pump installation and service in Coeur d'Alene and Kootenai County. Idaho Power and Avista rebates available. Call Frosty's at (208) 555-0194.",
    intro:`<p>Heat pump conversions are a growing part of the Coeur d'Alene HVAC market. Both Idaho Power and Avista Utilities offer rebates on qualifying cold-climate heat pump installations, and modern cold-climate heat pumps operate efficiently down to -15&deg;F &mdash; well below the average Coeur d'Alene winter low of 22&deg;F. Frosty&rsquo;s Heating and Air handles heat pump installation, repair, and maintenance across Kootenai County.</p>
    <p>A cold-climate heat pump provides both heating and cooling in a single system. Many Kootenai County homeowners who relocated from California, Washington, or Oregon are already familiar with the technology. For those new to it, we walk through how it works, what operating costs look like in our climate, and whether a full conversion or a hybrid system (heat pump plus gas backup) makes more sense for your home.</p>`,
    faqs:[
      {q:"How much does a heat pump installation cost in Coeur d'Alene?",a:"Heat pump installations range $6,000&ndash;$12,000 depending on system size. Idaho Power and Avista rebates can reduce this by $200&ndash;$800 depending on your utility and the system's efficiency rating."},
      {q:"Do heat pumps work in north Idaho winters?",a:"Modern cold-climate heat pumps work efficiently down to -15&deg;F, which covers nearly all Coeur d'Alene winter nights. January average lows near 22&deg;F are well within the efficient operating range."},
      {q:"What rebates are available for heat pump installation in Kootenai County?",a:"Idaho Power customers may qualify for $200&ndash;$800 in rebates on qualifying cold-climate heat pumps. Avista customers should ask about current program offerings when you call."},
      {q:"Should I get a heat pump or a furnace for my Coeur d'Alene home?",a:"If replacing both heating and cooling, a heat pump is worth comparing seriously. If you only need heating and your AC is in good shape, a furnace replacement is typically the simpler choice. We'll run the numbers for your situation."},
      {q:"Can I keep my gas furnace and add a heat pump?",a:"Yes &mdash; called a dual-fuel or hybrid system. The heat pump handles heating down to a set temperature (usually 25&ndash;35&deg;F) and the gas furnace takes over in extreme cold. Good for homeowners who want efficiency without cold-weather anxiety."},
      {q:"Do heat pumps also work as air conditioners?",a:"Yes. Heat pumps are reversible &mdash; they move heat out in summer and in during winter. One system replaces both furnace and central AC."}
    ]
  },
  { name:'Duct Cleaning', slug:'duct-cleaning', img:'service-duct-cleaning.jpg',
    tagline:"Professional duct cleaning in Coeur d&rsquo;Alene and Kootenai County. Wildfire smoke season makes air quality a real issue in north Idaho.",
    meta:"Duct cleaning in Coeur d'Alene and Kootenai County. Wildfire smoke season is a real air quality issue for north Idaho homeowners. Call Frosty's at (208) 555-0194.",
    intro:`<p>Duct cleaning in Coeur d'Alene is more than routine maintenance &mdash; it&rsquo;s an air quality issue. Wildfire smoke season (August&ndash;September) pushes fine particulate into residential HVAC systems across the Inland Northwest. Lake Coeur d'Alene&rsquo;s humidity also creates mold risk conditions in crawl spaces and basement duct runs. Frosty&rsquo;s Heating and Air cleans residential duct systems across Kootenai County using truck-mounted negative pressure equipment.</p>
    <p>A standard duct cleaning on a 2,000&ndash;3,000 sq ft Coeur d'Alene home (8&ndash;12 supply vents) takes 2&ndash;4 hours. We extract debris rather than just agitating it. Most homeowners report immediately noticeable improvement in air quality. Duct cleaning also improves HVAC airflow efficiency &mdash; clogged ducts make systems work harder and run longer.</p>`,
    faqs:[
      {q:"How much does duct cleaning cost in Coeur d'Alene?",a:"Residential duct cleaning in Kootenai County typically runs $300&ndash;$600 depending on home size and number of vents. Homes with wildfire smoke contamination or visible mold may require additional treatment."},
      {q:"How often should duct cleaning be done in north Idaho?",a:"Every 3&ndash;5 years is a standard baseline. In the Inland Northwest, after a heavy wildfire smoke season (August&ndash;September), more frequent cleaning makes sense. After purchasing a home with unknown service history, clean them."},
      {q:"Does duct cleaning improve air quality after wildfire smoke season?",a:"Yes. Wildfire smoke particulate that accumulates in ductwork during August&ndash;September smoke events continues to circulate through the HVAC system until it's removed. Cleaning eliminates that source of ongoing contamination."},
      {q:"How do I know if my ducts need cleaning?",a:"Visible dust or debris around supply vents, noticeable musty smell from vents, worsened allergies or respiratory symptoms, or purchase of a home with unknown duct history are the primary indicators."},
      {q:"Does duct cleaning disturb mold or make it worse?",a:"Proper duct cleaning uses negative pressure to contain and extract debris. Done correctly, it doesn't spread mold spores. If mold is found in ductwork, we'll let you know and discuss remediation options."},
      {q:"Can dirty ducts cause my HVAC system to run less efficiently?",a:"Yes. Significant duct buildup restricts airflow, forces the system to run longer to reach temperature, and increases wear on blower motors and heat exchangers. Cleaning restores designed airflow capacity."}
    ]
  },
  { name:'HVAC Maintenance Plans', slug:'hvac-maintenance-plans', img:'service-maintenance.jpg',
    tagline:"HVAC maintenance plans for Coeur d&rsquo;Alene and Kootenai County homeowners. We call you to schedule &mdash; you don&rsquo;t have to remember.",
    meta:"HVAC maintenance plans in Coeur d'Alene and Kootenai County. Frosty's calls you to schedule. Annual tune-ups catch problems before they become failures. Call (208) 555-0194.",
    intro:`<p>Frosty&rsquo;s Heating and Air maintenance plans work differently from most: we call you to schedule the annual tune-up. You don&rsquo;t need to remember to call us every fall &mdash; we track it and reach out. Annual furnace and AC tune-ups are the most cost-effective thing Kootenai County homeowners can do to extend system life and avoid emergency repair costs in the middle of a north Idaho winter.</p>
    <p>Coeur d'Alene heating systems run hard &mdash; October through April, often for 6+ hours per day during cold snaps. Systems that don't get annual service accumulate problems that compound over time: cracked heat exchangers, failing capacitors, dirty flame sensors, and degraded blower motors. A $120&ndash;$200 annual tune-up catches these early. An emergency December furnace failure costs several times more.</p>`,
    faqs:[
      {q:"What does a furnace tune-up include from Frosty's?",a:"We clean and inspect the burners, heat exchanger, blower assembly, and flame sensor. Test ignition sequence, check carbon monoxide output, measure airflow, inspect flue connections, and test safety controls. You get a written report of anything we find."},
      {q:"How much does an HVAC maintenance plan cost in Coeur d'Alene?",a:"Annual maintenance agreements at Frosty's include one furnace tune-up and one AC tune-up per year. Call (208) 555-0194 for current plan pricing &mdash; we don't change it based on your system's age or size."},
      {q:"When should I schedule my furnace tune-up in north Idaho?",a:"October is the ideal window &mdash; before heating season starts but while technicians aren't yet slammed with emergency calls. We call our maintenance plan customers in September to get fall scheduling set."},
      {q:"Do I really need annual furnace maintenance?",a:"In a climate where your furnace runs 6+ months per year, yes. Systems that run without regular service fail more often and earlier. The heat exchanger in particular &mdash; which can crack and create carbon monoxide risk &mdash; needs annual inspection."},
      {q:"What's included in an AC tune-up?",a:"We clean the condenser coils (important after wildfire smoke season), check refrigerant charge, inspect the capacitor and contactor, test the thermostat, and measure airflow and temperature differential."},
      {q:"Can I add an existing system to a Frosty's maintenance plan even if you haven't serviced it before?",a:"Yes. We start with a full diagnostic inspection to establish a baseline, then enroll you in the annual plan going forward."}
    ]
  },
  { name:'Emergency Heating Repair', slug:'emergency-heating-repair', img:'service-emergency.jpg',
    tagline:"24/7 emergency heating repair in Coeur d&rsquo;Alene and Kootenai County. We answer every call &mdash; evenings, weekends, and holidays.",
    meta:"24/7 emergency heating repair in Coeur d'Alene and Kootenai County. Frosty's Heating and Air answers every emergency call. Call (208) 555-0194 now.",
    intro:`<p>Coeur d'Alene January lows average near 22&deg;F. Temperatures can drop to 0&deg;F and below during the coldest cold snaps. For homes dependent on forced-air gas furnaces with no backup heating, a furnace failure in those conditions is a genuine emergency. Frosty&rsquo;s Heating and Air answers 24/7 emergency heating calls every night of the year, including weekends and holidays.</p>
    <p>We carry common furnace parts on our emergency trucks &mdash; ignitors, flame sensors, control boards, capacitors &mdash; so most emergency repairs complete in a single visit. We don&rsquo;t dispatch someone to look at the problem and then come back two days later. Emergency calls get an emergency response: a technician who arrives, diagnoses, quotes, and fixes it the same night when parts allow.</p>`,
    faqs:[
      {q:"How fast does Frosty's respond to a furnace emergency in Coeur d'Alene?",a:"Emergency calls get priority. On most nights, we aim to arrive within 1&ndash;3 hours. During extreme cold weather when call volume spikes, we're transparent about current ETAs when you call."},
      {q:"Is there an extra charge for emergency heating service after hours?",a:"Emergency and after-hours calls carry a service call fee. We're upfront about what it costs before dispatch. The flat-rate pricing still applies to the actual repair &mdash; what we quote is what you pay."},
      {q:"What should I do while waiting for emergency heating service?",a:"Close off rooms you don't need to heat and gather in one area. Use electric space heaters with caution (keep away from flammable materials). Check that your thermostat is calling for heat and your furnace power switch is on. Don't try to bypass safety controls."},
      {q:"My furnace won't start at 11pm on a Sunday &mdash; will you really come?",a:"Yes. That's what 24/7 means. Call (208) 555-0194. Sundays, holidays, the week between Christmas and New Year's &mdash; we answer."},
      {q:"Do you handle propane heating emergencies in Rathdrum and rural Kootenai County?",a:"Yes. Propane-heated homes are common in rural Kootenai County, particularly in Rathdrum and outer Spirit Lake areas. We service both gas and propane systems."},
      {q:"What if my furnace needs a part you don't have on the truck?",a:"We diagnose the problem and give you the repair cost upfront. If a part isn't on hand, we give you a realistic timeline and options (including safe ways to maintain heat overnight if needed)."}
    ]
  },
  { name:'Mini-Split Installation', slug:'mini-split-installation', img:'service-mini-split.jpg',
    tagline:"Ductless mini-split installation in Coeur d&rsquo;Alene and Kootenai County. Ideal for lake cabins, additions, and homes without duct runs.",
    meta:"Mini-split installation in Coeur d'Alene and Kootenai County. Ductless HVAC for cabins, additions, and homes without ductwork. Call Frosty's at (208) 555-0194.",
    intro:`<p>Ductless mini-split systems are particularly well-suited to Coeur d'Alene&rsquo;s housing market. Many Spirit Lake and Fernan Lake area homes started as seasonal lake cabins and have been converted to year-round residences &mdash; they often have no central duct system. Homes with additions, finished garages, or sunrooms that don&rsquo;t connect to existing ductwork are ideal mini-split candidates. Frosty&rsquo;s Heating and Air installs, repairs, and maintains ductless mini-split systems across Kootenai County.</p>
    <p>Mini-split installations run $3,000&ndash;$6,000 for a single-zone system (one indoor unit, one outdoor compressor). Multi-zone systems that serve multiple rooms or spaces range $5,000&ndash;$12,000. Modern mini-splits function as both heaters and air conditioners, and cold-climate models operate efficiently down to -20&deg;F.</p>`,
    faqs:[
      {q:"How much does mini-split installation cost in Coeur d'Alene?",a:"Single-zone mini-split installations run $3,000&ndash;$6,000. Multi-zone systems (one outdoor unit, multiple indoor units) range $5,000&ndash;$12,000 depending on the number of zones and system size."},
      {q:"Are mini-splits effective for heating in north Idaho winters?",a:"Modern cold-climate mini-splits operate efficiently down to -20&deg;F. They work well for Coeur d'Alene's typical winters. For primary heating in a full home, a multi-zone system or a dual system with backup may be appropriate."},
      {q:"What types of homes are best suited for mini-splits in Kootenai County?",a:"Homes without existing duct systems (lake cabins converted to year-round residences, older homes with radiators), additions or finished spaces that don't connect to existing ductwork, and homes where one room runs significantly hotter or colder than the rest."},
      {q:"How long does a mini-split installation take?",a:"A single-zone installation typically takes 4&ndash;8 hours. Multi-zone systems may take 1&ndash;2 days depending on the number of indoor units and complexity of the refrigerant line routing."},
      {q:"Do mini-splits qualify for Idaho Power or Avista rebates?",a:"Mini-split heat pumps may qualify for efficiency rebates from Idaho Power and Avista depending on the SEER2 and HSPF2 ratings of the specific equipment. Ask us when you call and we'll check current program eligibility."},
      {q:"Can I use a mini-split as the only heating source in my Coeur d'Alene home?",a:"For well-insulated modern construction, yes. For older or larger homes, a mini-split may work as a supplemental or zone-specific system rather than the sole heat source. We assess your home's insulation and layout before recommending."}
    ]
  }
];

const CITIES = [
  {
    name:"Coeur d'Alene", slug:'coeur-d-alene', img:'city-coeur-d-alene.jpg', state:'ID',
    context:`Coeur d'Alene is the Kootenai County seat and home to roughly 55,000 residents, with the broader metro reaching 175,000. The city sits on the north shore of Lake Coeur d'Alene, which influences both the climate and the humidity conditions in residential crawl spaces and basements &mdash; a specific factor in HVAC performance and air quality. The housing stock ranges from 1960s&ndash;1990s forced-air systems in older core neighborhoods like the Sherman Avenue area and Tubbs Hill adjacent streets, to newer construction along the Ramsey Road and Government Way corridors. January lows average near 22&deg;F, with temperatures occasionally dropping to 0&deg;F or below during cold snaps.`,
    neighborhoods:'Sherman Ave area, Tubbs Hill adjacent, Fernan Lake Village, Canfield area, Ramsey Road corridor, Government Way corridor',
    note:'Coeur d\'Alene is Frosty\'s home city. We\'re based at 812 W