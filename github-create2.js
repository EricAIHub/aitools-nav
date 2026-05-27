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
  await new Promise(r => setTimeout(r, 5000));
  
  // Fill repo name
  console.log('Filling repo name...');
  await page.type('#repository-name-input', 'aitools-nav', { delay: 50 });
  console.log('Typed: aitools-nav');
  await new Promise(r => setTimeout(r, 1500));
  
  // Fill description
  console.log('Filling description...');
  await page.type('#_r_d_', '发现最好的 AI 工具 - AI 工具导航站', { delay: 30 });
  console.log('Typed description');
  await new Promise(r => setTimeout(r, 1000));
  
  // Screenshot before submit
  await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/github-filled.png' });
  
  // Click "Create repository" button
  console.log('Clicking Create repository...');
  await page.evaluate(() => {
    const btns = document.querySelectorAll('button[type="submit"]');
    for (const btn of btns) {
      if (btn.textContent.includes('Create repository')) {
        btn.click();
        return true;
      }
    }
    return false;
  });
  
  console.log('Waiting for repo creation...');
  await new Promise(r => setTimeout(r, 10000));
  
  const finalUrl = page.url();
  console.log('Final URL:', finalUrl);
  await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/github-created.png' });
  
  // Check if we're on the repo page
  if (finalUrl.includes('EricAIHub/aitools-nav')) {
    console.log('SUCCESS! Repo created at:', finalUrl);
    
    // Get clone URL
    const cloneUrl = await page.evaluate(() => {
      const text = document.body.innerText;
      const match = text.match(/https:\/\/github\.com\/EricAIHub\/aitools-nav\.git/);
      return match ? match[0] : null;
    });
    console.log('Clone URL:', cloneUrl || 'https://github.com/EricAIHub/aitools-nav.git');
  } else {
    console.log('Page text preview:');
    const text = await page.evaluate(() => document.body.innerText.substring(0, 1000));
    console.log(text.substring(0, 500));
  }
  
  await browser.close();
  console.log('Done!');
})();
