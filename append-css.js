const fs = require('fs');
const file = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\frosty-s-heating-and-air\\_partials\\style.css';
const extra = `
.blog-body blockquote { border-left: 4px solid var(--kg-primary); background: var(--kg-secondary); padding: 16px 20px; margin: 24px 0; color: var(--kg-text-light); border-radius: 0 6px 6px 0; }
.text-primary { color: var(--kg-primary) !important; }
.text-muted { color: var(--kg-text-light); }
.mt-32 { margin-top: 32px; }
.section-label { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--kg-primary); font-weight: 700; margin-bottom: 8px; display: block; }
.section-title { margin-bottom: 16px; }
.section-subtitle { color: var(--kg-text-light); font-size: 1.05rem; max-width: 600px; margin: 0 auto; }
.divider { width: 60px; height: 4px; background: var(--kg-primary); border-radius: 2px; margin: 16px 0 32px; }
.divider-center { margin: 16px auto 32px; }
.related-pages { background: var(--kg-secondary); border-radius: var(--kg-radius); padding: 28px; margin: 40px 0; }
.related-pages h3 { margin-bottom: 16px; font-size: 1.05rem; }
.related-links { display: flex; flex-wrap: wrap; gap: 10px; list-style: none; }
.related-links a { background: var(--kg-white); border: 1px solid var(--kg-border); border-radius: 20px; padding: 6px 16px; font-size: 0.88rem; color: var(--kg-primary); font-weight: 500; }
.related-links a:hover { background: var(--kg-primary); color: #fff; }
.prose h2 { color: var(--kg-primary); margin: 32px 0 14px; }
.prose h3 { color: var(--kg-text); margin: 24px 0 10px; }
.prose p { margin-bottom: 18px; line-height: 1.8; }
.prose ul, .prose ol { margin: 0 0 18px 24px; }
.prose li { margin-bottom: 8px; }
.prose .highlight-box { background: var(--kg-secondary); border-left: 4px solid var(--kg-primary); padding: 20px 24px; border-radius: 0 var(--kg-radius) var(--kg-radius) 0; margin: 24px 0; }
.emergency-bar { background: #c62828; color: #fff; padding: 12px 20px; text-align: center; font-size: 0.95rem; font-weight: 600; }
.emergency-bar a { color: #fff; text-decoration: underline; }
`;
const existing = fs.readFileSync(file, 'utf8');
fs.writeFileSync(file, existing + extra, 'utf8');
console.log('CSS finalized:', fs.statSync(file).size, 'bytes');
