/**
 * cleanup.js — Step 10: Delete KV key + update sites.json
 */
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const CF_TOKEN    = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID  = '27cafbbee6f8e1db0d9499405d4755c1';
const KV_NS_ID    = 'b62212b004d84f258ce7536aea40f7f7';
const KV_KEY      = 'BUILD_PENDING:12353198899';
const SITES_JSON  = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\References\\sites.json';
const SITE_SLUG   = 'frosty-s-heating-and-air';

async function deleteKV() {
  return new Promise((resolve, reject) => {
    const encodedKey = encodeURIComponent(KV_KEY);
    const options = {
      hostname: 'api.cloudflare.com',
      path: `/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${KV_NS_ID}/values/${encodedKey}`,
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${CF_TOKEN}` }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const parsed = JSON.parse(data);
        if (parsed.success) {
          console.log('KV key deleted:', KV_KEY);
        } else {
          console.log('KV delete response:', JSON.stringify(parsed).substring(0,200));
        }
        resolve(parsed);
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function updateSitesJson() {
  const raw = fs.readFileSync(SITES_JSON, 'utf8');
  const sites = JSON.parse(raw);
  const idx = sites.findIndex(s => s.slug === SITE_SLUG);
  if (idx !== -1) {
    sites[idx].status = 'internal-review';
    sites[idx].stagingUrl = 'https://staging.frosty-s-heating-and-air.pages.dev';
    sites[idx].updatedAt = new Date().toISOString();
    fs.writeFileSync(SITES_JSON, JSON.stringify(sites, null, 2), 'utf8');
    console.log('sites.json updated:', SITE_SLUG, '-> internal-review');
  } else {
    console.log('Site not found in sites.json:', SITE_SLUG);
  }
}

async function run() {
  await deleteKV();
  updateSitesJson();
  console.log('\nCleanup complete.');
}

run().catch(console.error);
