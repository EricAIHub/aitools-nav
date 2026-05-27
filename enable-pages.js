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
  
  // Go to GitHub Pages settings
  console.log('Opening GitHub Pages settings...');
  await page.goto('https://github.com/EricAIHub/aitools-nav/settings/pages', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  
  console.log('URL:', page.url());
  await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/pages-settings.png' });
  
  // Get page text to understand the current state
  const text = await page.evaluate(() => document.body.innerText.substring(0, 2000));
  console.log('Page text:', text.substring(0, 500));
  
  // Look for "Source" section and select branch
  // Try to find and click the branch dropdown
  const branchSelected = await page.evaluate(() => {
    // Find all select elements
    const selects = document.querySelectorAll('select');
    for (const select of selects) {
      const options = Array.from(select.options);
      const hasMain = options.some(o => o.value === 'main');
      if (hasMain) {
        select.value = 'main';
        select.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
    }
    return false;
  });
  
  if (branchSelected) {
    console.log('Selected main branch');
  } else {
    console.log('Looking for branch selector...');
    // Try clicking buttons that might open a dropdown
    await page.evaluate(() => {
      const btns = document.querySelectorAll('button');
      for (const btn of btns) {
        if (btn.textContent.includes('main') || btn.textContent.includes('branch')) {
          btn.click();
          return true;
        }
      }
      return false;
    });
  }
  
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/pages-branch.png' });
  
  // Try to save/publish
  const saved = await page.evaluate(() => {
    const btns = document.querySelectorAll('button[type="submit"]');
    for (const btn of btns) {
      if (btn.textContent.includes('Save') || btn.textContent.includes('Deploy') || btn.textContent.includes('Publish')) {
        btn.click();
        return btn.textContent.trim();
      }
    }
    return false;
  });
  
  if (saved) {
    console.log('Clicked:', saved);
    await new Promise(r => setTimeout(r, 5000));
  }
  
  await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/pages-final.png' });
  console.log('Final URL:', page.url());
  
  await browser.close();
  console.log('Done!');
})();
