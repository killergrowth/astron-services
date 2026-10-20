const https = require('https');
https.get('https://ultravation.com/', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const matches = [...data.matchAll(/https:\/\/ultravation\.com\/wp-content\/uploads\/[^"'\s]+\.(?:png|jpg|jpeg|svg)/gi)];
    const unique = [...new Set(matches.map(m => m[0]))];
    unique.forEach(u => console.log(u));
  });
});
