const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  
  // Go to GitHub new repo page
  console.log('Opening GitHub...');
  await page.goto('https://github.com/new', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  
  const url = page.url();
  const title = await page.title();
  console.log('URL:', url);
  console.log('Title:', title);
  
  // Check if we're on login page or new repo page
  if (url.includes('login')) {
    console.log('NOT LOGGED IN - need to login first');
    await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/github-login.png' });
  } else {
    console.log('LOGGED IN! Creating repo...');
    await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/github-newrepo.png' });
    
    // Fill in repo name
    const nameInput = await page.$('#repository_name');
    if (nameInput) {
      await nameInput.type('aitools-nav');
      console.log('Typed repo name');
      await new Promise(r => setTimeout(r, 1000));
      
      // Try to find and click create button
      const createBtn = await page.$('button[type="submit"]');
      if (createBtn) {
        await createBtn.click();
        console.log('Clicked create button');
        await new Promise(r => setTimeout(r, 5000));
        await page.screenshot({ path: 'C:/Users/eric/.openclaw/workspace/aitools-nav/github-created.png' });
        console.log('Final URL:', page.url());
      }
    }
  }
  
  // Get the page text for debugging
  const text = await page.evaluate(() => document.body.innerText.substring(0, 1000));
  console.log('Page text:', text.substring(0, 500));
  
  await browser.close();
  console.log('Done!');
})();
