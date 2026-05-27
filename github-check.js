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
  
  console.log('Opening GitHub with existing profile...');
  await page.goto('https://github.com/new', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  
  const url = page.url();
  console.log('URL:', url);
  console.log('Title:', await page.title());
  
  if (url.includes('login')) {
    console.log('Still not logged in with existing profile');
  } else {
    console.log('LOGGED IN!');
  }
  
  await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/github-check.png' });
  
  // Get text
  const text = await page.evaluate(() => document.body.innerText.substring(0, 800));
  console.log('Page text:', text.substring(0, 400));
  
  await browser.close();
  console.log('Done!');
})();
