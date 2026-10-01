/**
 * gen-blog-index.js — Generates blog-index.json for Frosty's Heating and Air
 * 52 blog posts using deterministic cluster template
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

const SERVICES = [
  { name: 'Furnace Repair', slug: 'furnace-repair' },
  { name: 'Furnace Installation', slug: 'furnace-installation' },
  { name: 'AC Repair', slug: 'ac-repair' },
  { name: 'AC Installation', slug: 'ac-installation' },
  { name: 'Heat Pump Service', slug: 'heat-pump-service' },
  { name: 'Duct Cleaning', slug: 'duct-cleaning' },
  { name: 'HVAC Maintenance Plans', slug: 'hvac-maintenance-plans' },
  { name: 'Emergency Heating Repair', slug: 'emergency-heating-repair' },
  { name: 'Mini-Split Installation', slug: 'mini-split-installation' }
];

const CITY = "Coeur d'Alene";

// 6 cluster topics per service
const CLUSTERS = [
  (svc) => ({
    slug: `${svc.slug}-cost-coeur-d-alene`,
    title: `How Much Does ${svc.name} Cost in Coeur d'Alene? (2026 Guide)`,
    excerpt: `${svc.name} costs in Coeur d'Alene for 2026. Diagnostic fees, typical repair ranges, and what factors drive pricing in Kootenai County.`,
    tags: [svc.slug, 'cost guide'],
    imagePrompt: `Professional HVAC technician reviewing flat-rate pricing with a homeowner in Coeur d'Alene Idaho, transparent and trustworthy interaction in a residential home. No text, no logos, no signs in the image.`
  }),
  (svc) => ({
    slug: `signs-you-need-${svc.slug}`,
    title: `5 Signs You Need ${svc.name} in Coeur d'Alene`,
    excerpt: `5 signs your Coeur d'Alene home needs ${svc.name.toLowerCase()}: unusual noises, inconsistent temperatures, higher energy bills, aging equipment, and more.`,
    tags: [svc.slug, 'signs', 'north Idaho'],
    imagePrompt: `Concerned homeowner in a north Idaho craftsman home looking at their HVAC system in winter, snow visible outside. No text, no logos, no signs in the image.`
  }),
  (svc) => ({
    slug: `what-to-expect-${svc.slug}`,
    title: `What to Expect During ${svc.name} in Coeur d'Alene`,
    excerpt: `What happens when Frosty's Heating and Air handles ${svc.name.toLowerCase()} in Coeur d'Alene: technician arrival, diagnostic, flat-rate quote, and completion.`,
    tags: [svc.slug, 'how it works'],
    imagePrompt: `HVAC technician in professional uniform explaining results to a homeowner in a north Idaho home after completing service, professional trust-building interaction. No text, no logos, no signs in the image.`
  }),
  (svc) => ({
    slug: `${svc.slug}-diy-vs-professional`,
    title: `${svc.name} Yourself vs. Hiring a Professional in Coeur d'Alene`,
    excerpt: `DIY vs professional ${svc.name.toLowerCase()} in Coeur d'Alene: what homeowners can safely do themselves vs. what requires a licensed Idaho HVAC technician.`,
    tags: [svc.slug, 'DIY vs pro'],
    imagePrompt: `Split scene: professional HVAC technician with proper tools and equipment in a north Idaho home, competent professional work. No text, no logos, no signs in the image.`
  }),
  (svc) => ({
    slug: `${svc.slug}-coeur-d-alene-guide`,
    title: `${svc.name} in Coeur d'Alene: What Kootenai County Homeowners Need to Know`,
    excerpt: `${svc.name} in Coeur d'Alene: north Idaho climate factors, local housing stock, wildfire smoke season, and what makes HVAC needs unique in Kootenai County.`,
    tags: [svc.slug, 'local guide', "Coeur d'Alene"],
    imagePrompt: `Coeur d'Alene Idaho residential neighborhood in winter with Lake Coeur d'Alene visible in the distance, craftsman-style homes, Pacific Northwest character. No text, no logos, no signs in the image.`
  }),
  (svc) => ({
    slug: `hiring-hvac-mistakes-${svc.slug}`,
    title: `5 Mistakes to Avoid When Hiring for ${svc.name} in Coeur d'Alene`,
    excerpt: `5 mistakes Coeur d'Alene homeowners make when hiring an HVAC company for ${svc.name.toLowerCase()}: price-only decisions, no flat-rate guarantee, inconsistent technicians, and more.`,
    tags: [svc.slug, 'hiring tips', 'HVAC'],
    imagePrompt: `Homeowner in north Idaho thoughtfully reviewing HVAC company options, careful decision-making scene, residential home setting. No text, no logos, no signs in the image.`
  })
];

// Generate all 54 posts (9 services x 6 clusters), then trim to 52
const allPosts = [];
SERVICES.forEach(svc => {
  CLUSTERS.forEach(clusterFn => {
    allPosts.push({ ...clusterFn(svc), service: svc.slug });
  });
});

// Trim to 52 (remove last 2)
const posts52 = allPosts.slice(0, 52);

// Publishing rules: first 3 published today, rest scheduled weekly
const TODAY = '2026-06-23';
let scheduleDate = new Date('2026-06-30');

const index = {
  siteId: 'frosty-s-heating-and-air',
  posts: posts52.map((post, i) => {
    const isPublished = i < 3;
    const entry = {
      slug: post.slug,
      title: post.title,
      status: isPublished ? 'published' : 'scheduled',
      publishDate: isPublished ? TODAY : null,
      scheduledDate: isPublished ? null : scheduleDate.toISOString().split('T')[0],
      excerpt: post.excerpt,
      featuredImage: `/blog-posts/images/${post.slug}.jpg`,
      tags: post.tags,
      author: "Frosty's Heating and Air",
      createdAt: TODAY,
      updatedAt: TODAY,
      imagePrompt: post.imagePrompt
    };
    if (!isPublished) {
      // Advance schedule by 1 week
      scheduleDate = new Date(scheduleDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    }
    return entry;
  })
};

fs.mkdirSync(path.join(ROOT, 'blog-posts'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'blog-posts', 'blog-index.json'), JSON.stringify(index, null, 2), 'utf8');
console.log(`blog-index.json written with ${index.posts.length} posts.`);
console.log(`Published: ${index.posts.filter(p=>p.status==='published').length}`);
console.log(`Scheduled: ${index.posts.filter(p=>p.status==='scheduled').length}`);
