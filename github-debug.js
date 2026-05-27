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
  
  await page.goto('https://github.com/new', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 5000));
  
  console.log('URL:', page.url());
  console.log('Title:', await page.title());
  
  // Get all input elements
  const inputs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input, textarea')).map(el => ({
      tag: el.tagName,
      type: el.type,
      id: el.id,
      name: el.name,
      placeholder: el.placeholder,
      value: el.value
    }));
  });
  console.log('Inputs:', JSON.stringify(inputs, null, 2));
  
  // Get all buttons
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map(el => ({
      text: el.textContent.trim().substring(0, 50),
      type: el.type,
      disabled: el.disabled
    }));
  });
  console.log('Buttons:', JSON.stringify(buttons, null, 2));
  
  await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/github-debug.png', fullPage: true });
  
  await browser.close();
  console.log('Done!');
})();
