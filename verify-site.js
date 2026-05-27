const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  
  console.log('Opening live site...');
  await page.goto('https://ericaihub.github.io/aitools-nav/', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  
  console.log('URL:', page.url());
  console.log('Title:', await page.title());
  
  await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/live-screenshot.png', fullPage: true });
  
  // Get page text
  const text = await page.evaluate(() => document.body.innerText.substring(0, 1000));
  console.log('Page content:', text.substring(0, 500));
  
  await browser.close();
  console.log('Done!');
})();
