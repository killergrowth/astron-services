const fs = require('fs');
const path = require('path');

const mediaDir = 'C:\\Users\\KillerGrowth\\.openclaw\\media\\tool-image-generation';
const destDir = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\frosty-s-heating-and-air\\images';

const map = {
  'hero---531206b6-03f6-4e77-91a0-f0320a01b1ae.jpg': 'hero.jpg',
  'service-furnace-repair---422446ea-efff-4440-b552-ec5b2dcbbeb7.jpg': 'service-furnace-repair.jpg',
  'service-furnace-installation---0fc193f2-d6d5-4e37-bf47-13afdbb85c7e.jpg': 'service-furnace-installation.jpg',
  'service-ac-repair---9b2cd8d4-b702-458a-8f5d-a775918d4b50.jpg': 'service-ac-repair.jpg',
  'service-ac-installation---8d781a04-2987-4040-be2b-43b37888f5ee.jpg': 'service-ac-installation.jpg',
  'service-heat-pump---91b1983f-abba-4b9d-8310-ed7f605d83c7.jpg': 'service-heat-pump.jpg',
  'service-duct-cleaning---5b4626dc-9fa4-4888-b0ad-d7c53acf107f.jpg': 'service-duct-cleaning.jpg',
  'service-maintenance---54b402d1-d4fd-4e36-8213-57336783889b.jpg': 'service-maintenance.jpg',
  'service-emergency---e3f6922c-8691-4f14-9723-f438e32364a1.jpg': 'service-emergency.jpg',
  'service-mini-split---b1899faa-8d31-43a7-9e73-f8619c676599.jpg': 'service-mini-split.jpg',
  'city-coeur-d-alene---ace245d1-7d8a-4630-8dbf-a6cf0735ae51.jpg': 'city-coeur-d-alene.jpg',
  'city-post-falls---895993e1-cefb-4dd2-b3ab-9d2accbb99b0.jpg': 'city-post-falls.jpg',
  'city-hayden---04b124be-c5e3-4c04-b0f0-9759d301cc44.jpg': 'city-hayden.jpg',
  'city-rathdrum---be48c936-e876-4721-8e21-1808a9c7a816.jpg': 'city-rathdrum.jpg',
  'city-dalton-gardens---82b57128-df5a-4741-9a44-6345a1e82f20.jpg': 'city-dalton-gardens.jpg',
  'city-spirit-lake---f5efde59-c4dc-4252-81da-54ec8ac670b2.jpg': 'city-spirit-lake.jpg',
  'about-team---35853508-3139-43db-b6b3-be2128b87c2e.jpg': 'about-team.jpg',
  'about-service---892d9f56-afb8-4b5b-be56-a797f5805734.jpg': 'about-service.jpg',
  'home-trust---68e62fb6-318d-4740-a9a0-0b7e0dca9e47.jpg': 'home-trust.jpg',
  'home-pricing---52acea29-fee6-44c8-b267-891eb49e41f7.jpg': 'home-pricing.jpg',
};

Object.entries(map).forEach(([src, dst]) => {
  const srcPath = path.join(mediaDir, src);
  const dstPath = path.join(destDir, dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    console.log('Copied:', dst);
  } else {
    console.warn('MISSING:', src);
  }
});
console.log('Done.');
