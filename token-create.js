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
  
  console.log('Opening token creation page...');
  await page.goto('https://github.com/settings/tokens/new', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  
  // Fill token note
  console.log('Filling token note...');
  await page.type('#oauth_access_description', 'aitools-nav-deploy', { delay: 30 });
  await new Promise(r => setTimeout(r, 500));
  
  // Check "repo" scope (first checkbox)
  console.log('Selecting repo scope...');
  await page.evaluate(() => {
    const checkboxes = document.querySelectorAll('input[name="oauth_access[scopes][]"]');
    if (checkboxes.length > 0) {
      checkboxes[0].click(); // repo scope
    }
  });
  await new Promise(r => setTimeout(r, 500));
  
  await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/token-filled.png' });
  
  // Click "Generate token"
  console.log('Generating token...');
  await page.evaluate(() => {
    const btns = document.querySelectorAll('button[type="submit"]');
    for (const btn of btns) {
      if (btn.textContent.includes('Generate token')) {
        btn.click();
        return true;
      }
    }
    return false;
  });
  
  await new Promise(r => setTimeout(r, 5000));
  
  const finalUrl = page.url();
  console.log('Final URL:', finalUrl);
  await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/token-created.png' });
  
  // Get the token from the page
  const token = await page.evaluate(() => {
    // Look for the token in the page
    const text = document.body.innerText;
    const match = text.match(/ghp_[A-Za-z0-9]{36}/);
    if (match) return match[0];
    
    // Try to find it in an input field
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    for (const input of inputs) {
      if (input.value && input.value.startsWith('ghp_')) {
        return input.value;
      }
    }
    
    // Try to find in code elements
    const codes = document.querySelectorAll('code');
    for (const code of codes) {
      if (code.textContent.startsWith('ghp_')) {
        return code.textContent;
      }
    }
    
    return null;
  });
  
  if (token) {
    console.log('TOKEN FOUND:', token);
  } else {
    console.log('Token not found in page. Getting page text...');
    const text = await page.evaluate(() => document.body.innerText.substring(0, 2000));
    console.log('Page text:', text.substring(0, 800));
  }
  
  await browser.close();
  console.log('Done!');
})();
