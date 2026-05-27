const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1200 });
  await page.goto('http://localhost:8090/', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/preview.png', fullPage: true });
  console.log('Screenshot saved!');
  await browser.close();
})();
