/**
 * gen-blog-images-direct.js
 * Generates featured images for 3 published blog posts via gpt-image-2
 * Run from kg-site-builder dir (has openai + sharp installed)
 */
const fs     = require('fs');
const path   = require('path');
const KG_BUILDER = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\tools\\kg-site-builder';
const OpenAI = require(path.join(KG_BUILDER, 'node_modules', 'openai'));
const sharp  = require(path.join(KG_BUILDER, 'node_modules', 'sharp'));

require(path.join(KG_BUILDER, 'node_modules', 'dotenv')).config({ path: path.join(KG_BUILDER, '.env') });
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SITE_DIR   = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\frosty-s-heating-and-air';
const IMAGES_DIR = path.join(SITE_DIR, 'blog-posts', 'images');
const INDEX_PATH = path.join(SITE_DIR, 'blog-posts', 'blog-index.json');

fs.mkdirSync(IMAGES_DIR, { recursive: true });

const posts = [
  {
    slug:   'furnace-repair-cost-coeur-d-alene',
    prompt: "Professional HVAC technician in blue work uniform reviewing a written flat-rate quote with a homeowner in a north Idaho craftsman home, indoor residential setting, winter light through window, trust and transparency. Photorealistic. No text, no logos, no signs in the image."
  },
  {
    slug:   'signs-you-need-furnace-repair',
    prompt: "Concerned homeowner in a north Idaho craftsman-style home kneeling next to a furnace unit in a utility closet, winter snow visible through a small window, residential interior setting. Photorealistic. No text, no logos, no signs in the image."
  },
  {
    slug:   'what-to-expect-furnace-repair',
    prompt: "HVAC technician in professional blue uniform explaining furnace diagnostic results to a homeowner in a Coeur d'Alene Idaho home utility room, both looking at the furnace, professional and trustworthy interaction. Photorealistic. No text, no logos, no signs in the image."
  }
];

async function main() {
  const rawIndex = fs.readFileSync(INDEX_PATH);
  const cleanIndex = rawIndex.slice(rawIndex[0] === 0xEF && rawIndex[1] === 0xBB && rawIndex[2] === 0xBF ? 3 : 0).toString('utf8');
  const index = JSON.parse(cleanIndex);

  for (const post of posts) {
    console.log(`\nGenerating image: ${post.slug} ...`);
    try {
      const response = await client.images.generate({
        model: 'gpt-image-2',
        prompt: post.prompt,
        n: 1,
        size: '1024x1024'
      });

      const b64    = response.data[0].b64_json;
      const imgBuf = Buffer.from(b64, 'base64');
      const outPath = path.join(IMAGES_DIR, post.slug + '.jpg');
      const imgPath = 'blog-posts/images/' + post.slug + '.jpg';

      await sharp(imgBuf)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 82 })
        .toFile(outPath);

      console.log(`  Saved: ${outPath}`);

      // Update blog-index.json entry
      const idx = index.posts.findIndex(p => p.slug === post.slug);
      if (idx !== -1) {
        index.posts[idx].featuredImage = imgPath;
        index.posts[idx].imagePrompt   = post.prompt;
      }
    } catch (err) {
      console.error(`  Error for ${post.slug}:`, err.message);
    }
  }

  fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2), 'utf8');
  console.log('\nblog-index.json updated with featuredImage paths.');
}

main().catch(console.error);
