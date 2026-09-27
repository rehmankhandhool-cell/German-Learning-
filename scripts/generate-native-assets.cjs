const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// German Teacher Brand Colors
const BRAND_NAVY = '#0A1128';
const BRAND_BORDER = '#1E293B';
const BRAND_GOLD_START = '#FBBF24';
const BRAND_GOLD_END = '#F59E0B';
const BRAND_RED_START = '#EF4444';
const BRAND_RED_END = '#DC2626';
const BRAND_NAVY_GRAD_START = '#1E293B';
const BRAND_NAVY_GRAD_END = '#0F172A';

// Official Emblem SVG Definition (Exact geometry from public/logo.svg)
function getEmblemSvg(size = 96) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="${size}" height="${size}" fill="none">
  <defs>
    <linearGradient id="gtGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BRAND_GOLD_START}" />
      <stop offset="100%" stop-color="${BRAND_GOLD_END}" />
    </linearGradient>
    <linearGradient id="gtRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BRAND_RED_START}" />
      <stop offset="100%" stop-color="${BRAND_RED_END}" />
    </linearGradient>
    <linearGradient id="gtNavy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BRAND_NAVY_GRAD_START}" />
      <stop offset="100%" stop-color="${BRAND_NAVY_GRAD_END}" />
    </linearGradient>
    <filter id="gtShadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.35" />
    </filter>
  </defs>

  <g filter="url(#gtShadow)">
    <!-- Base Shield / Rounded Emblem -->
    <rect x="2" y="2" width="92" height="92" rx="22" fill="${BRAND_NAVY}" stroke="${BRAND_BORDER}" stroke-width="1.5" />
    
    <!-- German Tricolor Ribbon Accent on Shield Top -->
    <path d="M 12 18 Q 48 24 84 18" stroke="#1E293B" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.4" />

    <!-- Open Knowledge Book / Academic Cap Geometry -->
    <path d="M 48 22 L 78 36 L 48 50 L 18 36 Z" fill="url(#gtNavy)" stroke="#334155" stroke-width="1.5" />
    
    <!-- Graduation Cap Band in German Red -->
    <path d="M 28 41 L 28 54 C 28 66 68 66 68 54 L 68 41" fill="none" stroke="url(#gtRed)" stroke-width="4" stroke-linecap="round" />
    
    <!-- German Flag Tricolor Bookmark / Tassel Ribbon -->
    <path d="M 52 48 L 68 56 L 66 76 L 58 72 L 50 76 Z" fill="#0F172A" />
    <path d="M 54 53 L 64 58 L 63 71 L 58 68.5 L 53 71 Z" fill="url(#gtRed)" />
    <path d="M 56 57 L 61 59.5 L 60.5 67 L 58 65.5 L 55.5 67 Z" fill="url(#gtGold)" />

    <!-- Radiant Gold Star / Tassel Accent -->
    <circle cx="78" cy="36" r="4.5" fill="url(#gtGold)" />
    <path d="M 78 40 L 76 60" stroke="url(#gtGold)" stroke-width="2.5" stroke-linecap="round" />
    
    <!-- Subtle Speech Bubble Wing (Represents Conversation & Teaching) -->
    <path d="M 22 66 C 22 75 32 80 44 80 C 47 80 50 79.5 53 78.8 L 60 83 L 58 76 C 63 73.5 66 69.8 66 66" 
          fill="none" stroke="url(#gtGold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" />
  </g>
</svg>
`;
}

// Official Full Brand Lockup (German Teacher + Emblem for Dark Navy Splash Screen)
function getFullSplashLogoSvg(width = 1200, height = 288) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 120" width="${width}" height="${height}" fill="none">
  <defs>
    <linearGradient id="gtGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BRAND_GOLD_START}" />
      <stop offset="100%" stop-color="${BRAND_GOLD_END}" />
    </linearGradient>
    <linearGradient id="gtRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BRAND_RED_START}" />
      <stop offset="100%" stop-color="${BRAND_RED_END}" />
    </linearGradient>
    <linearGradient id="gtNavy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BRAND_NAVY_GRAD_START}" />
      <stop offset="100%" stop-color="${BRAND_NAVY_GRAD_END}" />
    </linearGradient>
    <filter id="gtShadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.4" />
    </filter>
  </defs>

  <!-- Brand Mark (Icon Container) -->
  <g transform="translate(15, 12)" filter="url(#gtShadow)">
    <rect x="0" y="0" width="96" height="96" rx="22" fill="${BRAND_NAVY}" stroke="${BRAND_BORDER}" stroke-width="1.5" />
    <path d="M 12 18 Q 48 24 84 18" stroke="#1E293B" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.4" />
    <path d="M 48 22 L 78 36 L 48 50 L 18 36 Z" fill="url(#gtNavy)" stroke="#334155" stroke-width="1.5" />
    <path d="M 28 41 L 28 54 C 28 66 68 66 68 54 L 68 41" fill="none" stroke="url(#gtRed)" stroke-width="4" stroke-linecap="round" />
    <path d="M 52 48 L 68 56 L 66 76 L 58 72 L 50 76 Z" fill="#0F172A" />
    <path d="M 54 53 L 64 58 L 63 71 L 58 68.5 L 53 71 Z" fill="url(#gtRed)" />
    <path d="M 56 57 L 61 59.5 L 60.5 67 L 58 65.5 L 55.5 67 Z" fill="url(#gtGold)" />
    <circle cx="78" cy="36" r="4.5" fill="url(#gtGold)" />
    <path d="M 78 40 L 76 60" stroke="url(#gtGold)" stroke-width="2.5" stroke-linecap="round" />
    <path d="M 22 66 C 22 75 32 80 44 80 C 47 80 50 79.5 53 78.8 L 60 83 L 58 76 C 63 73.5 66 69.8 66 66" 
          fill="none" stroke="url(#gtGold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" />
  </g>

  <!-- Typography: GERMAN TEACHER (Exact styling matching BrandLogo inverted) -->
  <text x="130" y="58" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="38" fill="#FFFFFF" letter-spacing="-0.5">
    German
  </text>
  <text x="282" y="58" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="38" fill="${BRAND_RED_END}" letter-spacing="-0.5">
    Teacher
  </text>
  <circle cx="442" cy="48" r="5" fill="${BRAND_GOLD_END}" />

  <!-- Subtitle Tagline Badge -->
  <g transform="translate(132, 72)">
    <rect x="0" y="0" width="138" height="20" rx="6" fill="#FFFFFF" fill-opacity="0.12" />
    <text x="8" y="14" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="10.5" fill="#E2E8F0" letter-spacing="1.2">
      DEUTSCH LERNEN
    </text>
    <rect x="144" y="2" width="6" height="16" rx="2" fill="#0F172A" />
    <rect x="152" y="2" width="6" height="16" rx="2" fill="${BRAND_RED_END}" />
    <rect x="160" y="2" width="6" height="16" rx="2" fill="${BRAND_GOLD_END}" />
    <text x="174" y="14" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="11" fill="#94A3B8">
      A1 → B2
    </text>
  </g>
</svg>
`;
}

async function generateAllAssets() {
  const assetsDir = path.resolve('assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  console.log('Generating high-resolution Capacitor source assets from official German Teacher logo...');

  // 1. icon-background.png (1024x1024) - Clean solid dark navy
  console.log('1. Creating assets/icon-background.png (1024x1024)...');
  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 10, g: 17, b: 40, alpha: 1 } // #0A1128
    }
  })
    .png()
    .toFile(path.join(assetsDir, 'icon-background.png'));

  // 2. icon-foreground.png (1024x1024) - Transparent background, official emblem sized within Android safe-zone (640x640)
  console.log('2. Creating assets/icon-foreground.png (1024x1024)...');
  const emblemBuffer = await sharp(Buffer.from(getEmblemSvg(640)))
    .resize(640, 640)
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      {
        input: emblemBuffer,
        top: Math.round((1024 - 640) / 2),
        left: Math.round((1024 - 640) / 2)
      }
    ])
    .png()
    .toFile(path.join(assetsDir, 'icon-foreground.png'));

  // 3. icon-only.png (1024x1024) - Clean dark navy background with centered official emblem (720x720) for iOS & standalone icons
  console.log('3. Creating assets/icon-only.png (1024x1024)...');
  const emblemIosBuffer = await sharp(Buffer.from(getEmblemSvg(720)))
    .resize(720, 720)
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 10, g: 17, b: 40, alpha: 1 }
    }
  })
    .composite([
      {
        input: emblemIosBuffer,
        top: Math.round((1024 - 720) / 2),
        left: Math.round((1024 - 720) / 2)
      }
    ])
    .png()
    .toFile(path.join(assetsDir, 'icon-only.png'));

  // Also create logo.png as alias
  await fs.promises.copyFile(
    path.join(assetsDir, 'icon-only.png'),
    path.join(assetsDir, 'logo.png')
  );

  // 4. splash.png (2732x2732) - Clean dark navy background with centered official German Teacher logo
  console.log('4. Creating assets/splash.png (2732x2732)...');
  const splashLogoWidth = 1400;
  const splashLogoHeight = Math.round(splashLogoWidth * (120 / 500)); // 336px

  const splashLogoBuffer = await sharp(Buffer.from(getFullSplashLogoSvg(splashLogoWidth, splashLogoHeight)))
    .resize(splashLogoWidth, splashLogoHeight)
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 2732,
      height: 2732,
      channels: 4,
      background: { r: 10, g: 17, b: 40, alpha: 1 } // #0A1128
    }
  })
    .composite([
      {
        input: splashLogoBuffer,
        top: Math.round((2732 - splashLogoHeight) / 2),
        left: Math.round((2732 - splashLogoWidth) / 2)
      }
    ])
    .png()
    .toFile(path.join(assetsDir, 'splash.png'));

  // 5. splash-dark.png (2732x2732) - Identical branded dark navy splash
  console.log('5. Creating assets/splash-dark.png (2732x2732)...');
  await fs.promises.copyFile(
    path.join(assetsDir, 'splash.png'),
    path.join(assetsDir, 'splash-dark.png')
  );

  console.log('All source assets successfully generated in assets/:');
  console.log(fs.readdirSync(assetsDir));

  // 6. Direct generation of Android Adaptive Icon Foregrounds and Legacy Icons
  // Standard Android adaptive icon density specifications:
  // mdpi: 108x108 (safe zone 72x72) -> emblem 68x68
  // hdpi: 162x162 (safe zone 108x108) -> emblem 102x102
  // xhdpi: 216x216 (safe zone 144x144) -> emblem 136x136
  // xxhdpi: 324x324 (safe zone 216x216) -> emblem 204x204
  // xxxhdpi: 432x432 (safe zone 288x288) -> emblem 272x272
  const androidDensities = [
    { name: 'mdpi', canvasSize: 108, emblemSize: 68, legacySize: 48, legacyEmblem: 36 },
    { name: 'hdpi', canvasSize: 162, emblemSize: 102, legacySize: 72, legacyEmblem: 54 },
    { name: 'xhdpi', canvasSize: 216, emblemSize: 136, legacySize: 96, legacyEmblem: 72 },
    { name: 'xxhdpi', canvasSize: 324, emblemSize: 204, legacySize: 144, legacyEmblem: 108 },
    { name: 'xxxhdpi', canvasSize: 432, emblemSize: 272, legacySize: 192, legacyEmblem: 144 },
  ];

  console.log('6. Generating Android adaptive foregrounds and legacy launcher icons...');
  for (const d of androidDensities) {
    const resDir = path.resolve(`android/app/src/main/res/mipmap-${d.name}`);
    if (!fs.existsSync(resDir)) {
      fs.mkdirSync(resDir, { recursive: true });
    }

    // Adaptive icon foreground (transparent canvas, emblem centered in safe zone)
    const fgEmblem = await sharp(Buffer.from(getEmblemSvg(d.emblemSize)))
      .resize(d.emblemSize, d.emblemSize)
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: d.canvasSize,
        height: d.canvasSize,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite([
        {
          input: fgEmblem,
          top: Math.round((d.canvasSize - d.emblemSize) / 2),
          left: Math.round((d.canvasSize - d.emblemSize) / 2)
        }
      ])
      .png()
      .toFile(path.join(resDir, 'ic_launcher_foreground.png'));

    // Adaptive icon background (fallback PNG if referenced)
    await sharp({
      create: {
        width: d.canvasSize,
        height: d.canvasSize,
        channels: 4,
        background: { r: 10, g: 17, b: 40, alpha: 1 }
      }
    })
      .png()
      .toFile(path.join(resDir, 'ic_launcher_background.png'));

    // Legacy square launcher icon
    const legacyEmblem = await sharp(Buffer.from(getEmblemSvg(d.legacyEmblem)))
      .resize(d.legacyEmblem, d.legacyEmblem)
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: d.legacySize,
        height: d.legacySize,
        channels: 4,
        background: { r: 10, g: 17, b: 40, alpha: 1 }
      }
    })
      .composite([
        {
          input: legacyEmblem,
          top: Math.round((d.legacySize - d.legacyEmblem) / 2),
          left: Math.round((d.legacySize - d.legacyEmblem) / 2)
        }
      ])
      .png()
      .toFile(path.join(resDir, 'ic_launcher.png'));

    // Legacy round launcher icon
    const circleMaskSvg = `
      <svg width="${d.legacySize}" height="${d.legacySize}">
        <circle cx="${d.legacySize / 2}" cy="${d.legacySize / 2}" r="${d.legacySize / 2}" fill="#ffffff" />
      </svg>
    `;
    const circleMaskBuffer = await sharp(Buffer.from(circleMaskSvg)).png().toBuffer();

    const squareIconBuffer = await sharp(path.join(resDir, 'ic_launcher.png')).toBuffer();
    await sharp(squareIconBuffer)
      .composite([
        {
          input: circleMaskBuffer,
          blend: 'dest-in'
        }
      ])
      .png()
      .toFile(path.join(resDir, 'ic_launcher_round.png'));
  }

  // 7. Update Android adaptive icon XML definitions
  console.log('7. Configuring Android XML adaptive icon definitions...');
  const anyDpiDir = path.resolve('android/app/src/main/res/mipmap-anydpi-v26');
  const valuesDir = path.resolve('android/app/src/main/res/values');

  fs.writeFileSync(
    path.join(valuesDir, 'ic_launcher_background.xml'),
    `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">${BRAND_NAVY}</color>\n</resources>\n`
  );

  const adaptiveIconXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background" />
    <foreground android:drawable="@mipmap/ic_launcher_foreground" />
</adaptive-icon>
`;

  fs.writeFileSync(path.join(anyDpiDir, 'ic_launcher.xml'), adaptiveIconXml);
  fs.writeFileSync(path.join(anyDpiDir, 'ic_launcher_round.xml'), adaptiveIconXml);

  // Remove obsolete default template drawables if present
  const obsoleteFg = path.resolve('android/app/src/main/res/drawable-v24/ic_launcher_foreground.xml');
  if (fs.existsSync(obsoleteFg)) {
    fs.unlinkSync(obsoleteFg);
  }
  const obsoleteBg = path.resolve('android/app/src/main/res/drawable/ic_launcher_background.xml');
  if (fs.existsSync(obsoleteBg)) {
    fs.unlinkSync(obsoleteBg);
  }

  // 8. Update iOS AppIcon (1024x1024, RGB no alpha)
  console.log('8. Ensuring iOS AppIcon-512@2x.png (1024x1024)...');
  const iosIconDir = path.resolve('ios/App/App/Assets.xcassets/AppIcon.appiconset');
  await sharp(path.join(assetsDir, 'icon-only.png'))
    .resize(1024, 1024)
    .removeAlpha()
    .png()
    .toFile(path.join(iosIconDir, 'AppIcon-512@2x.png'));

  console.log('Native icon and splash assets configuration completed successfully!');
}

generateAllAssets().catch(err => {
  console.error('Asset generation failed:', err);
  process.exit(1);
});
