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
  
  console.log('Opening GitHub new repo page...');
  await page.goto('https://github.com/new', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  
  // Fill in repo name
  console.log('Filling repo name...');
  await page.type('#repository_name', 'aitools-nav', { delay: 50 });
  console.log('Typed: aitools-nav');
  await new Promise(r => setTimeout(r, 1500));
  
  // Add description
  try {
    await page.type('#repository_description', '发现最好的 AI 工具 - AI 工具导航站', { delay: 30 });
    console.log('Typed description');
  } catch(e) { console.log('Desc skip:', e.message); }
  
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/github-filled.png' });
  
  // Click Create repository button using evaluate
  console.log('Clicking Create repository...');
  await page.evaluate(() => {
    const btns = document.querySelectorAll('button[type="submit"]');
    for (const btn of btns) {
      if (btn.textContent.includes('Create repository')) {
        btn.click();
        return true;
      }
    }
    // Fallback: click any submit button
    if (btns.length > 0) {
      btns[btns.length - 1].click();
      return true;
    }
    return false;
  });
  
  console.log('Clicked create button');
  await new Promise(r => setTimeout(r, 8000));
  
  const finalUrl = page.url();
  console.log('Final URL:', finalUrl);
  await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/github-created.png' });
  
  // Try to get clone URL
  const cloneUrl = await page.evaluate(() => {
    const inputs = document.querySelectorAll('input[type="text"]');
    for (const input of inputs) {
      if (input.value && input.value.includes('aitools-nav')) {
        return input.value;
      }
    }
    // Try to find in page text
    const text = document.body.innerText;
    const match = text.match(/https:\/\/github\.com\/EricAIHub\/aitools-nav/);
    return match ? match[0] : null;
  });
  
  if (cloneUrl) {
    console.log('Clone URL found:', cloneUrl);
  } else {
    console.log('Looking for clone URL in page...');
    const text = await page.evaluate(() => document.body.innerText.substring(0, 2000));
    console.log('Page text:', text.substring(0, 500));
  }
  
  await browser.close();
  console.log('Done!');
})();
