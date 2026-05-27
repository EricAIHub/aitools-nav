const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    userDataDir: 'C:\\Users\\eric\\AppData\\Local\\Microsoft\\Edge\\User Data',
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled', '--profile-directory=Default']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  
  // Go to token settings
  console.log('Opening token settings...');
  await page.goto('https://github.com/settings/tokens/new', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  
  console.log('URL:', page.url());
  console.log('Title:', await page.title());
  
  // Check what's on the page
  const text = await page.evaluate(() => document.body.innerText.substring(0, 1500));
  console.log('Page text:', text.substring(0, 500));
  
  await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/token-page.png' });
  
  // Get all inputs
  const inputs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input, textarea, select')).map(el => ({
      tag: el.tagName,
      type: el.type,
      id: el.id,
      name: el.name,
      placeholder: el.placeholder
    }));
  });
  console.log('Inputs:', JSON.stringify(inputs, null, 2));
  
  await browser.close();
  console.log('Done!');
})();
