const { chromium } = require('playwright');
const path = require('path');

async function generateOGImage() {
  console.log('Generating OG image from hero section...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2  // Higher quality
  });
  const page = await context.newPage();

  // Navigate to the live site
  await page.goto('https://heyhido.com', { waitUntil: 'networkidle' });

  // Wait for animations to complete
  await page.waitForTimeout(1000);

  // Take screenshot of the viewport (hero section)
  await page.screenshot({
    path: path.join(__dirname, '../public/images/og-image.png'),
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });

  console.log('✓ OG image saved to public/images/og-image.png');

  await browser.close();
}

generateOGImage().catch(console.error);
