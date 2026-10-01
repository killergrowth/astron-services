/**
 * gen-blog-images.js — Calls Builder API to generate blog featured images
 * for all 52 blog posts in Frosty's Heating and Air
 */
const https = require('https');
const fs    = require('fs');

const BUILDER_TOKEN = process.env.BUILDER_INTERNAL_TOKEN;
const SITE_ID       = 'frosty-s-heating-and-air';
const BLOG_INDEX    = require('./blog-posts/blog-index.json');

function callAPI(slug, imagePrompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ imagePrompt });
    const options = {
      hostname: 'builder.killergrowth.com',
      path: `/api/blog/${SITE_ID}/generate-image/${slug}/featured`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-token': BUILDER_TOKEN,
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ slug, status: res.statusCode, body: data.substring(0, 100) });
        } else {
          resolve({ slug, status: res.statusCode, error: data.substring(0, 200) });
        }
      });
    });
    req.on('error', e => resolve({ slug, error: e.message }));
    req.setTimeout(30000, () => { req.destroy(); resolve({ slug, error: 'timeout' }); });
    req.write(body);
    req.end();
  });
}

async function run() {
  const posts = BLOG_INDEX.posts;
  console.log(`Generating blog images for ${posts.length} posts...`);
  
  let success = 0, fail = 0;
  // Process in batches of 5 to avoid overwhelming the API
  for (let i = 0; i < posts.length; i += 5) {
    const batch = posts.slice(i, i + 5);
    const results = await Promise.all(batch.map(p => callAPI(p.slug, p.imagePrompt)));
    results.forEach(r => {
      if (r.error) {
        console.log(`FAIL: ${r.slug} — ${r.error}`);
        fail++;
      } else {
        console.log(`OK (${r.status}): ${r.slug}`);
        success++;
      }
    });
    // Brief pause between batches
    if (i + 5 < posts.length) await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log(`\nDone: ${success} success, ${fail} failed.`);
}

run().catch(console.error);
