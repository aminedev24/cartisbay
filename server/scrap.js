const puppeteer = require('puppeteer');

const scrapeExchangeRate = async () => {
  let browser;
  try {
    // Launch a headless browser
    browser = await puppeteer.launch({
      headless: true, // Set to false to see the browser in action
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for some environments
    });
    const page = await browser.newPage();

    // Set a custom user agent
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    );

    // Navigate to the target website
    await page.goto('https://www.sbishinseibank.co.jp/english/gaika/exchange_rate_fx.html', {
      waitUntil: 'networkidle2', // Wait until the page is fully loaded
    });

    // Wait for the specific element to load
    await page.waitForSelector('span[data-interestrate_sre="Fxrate_N_USD_sellrate"]', {
      timeout: 5000, // Wait up to 5 seconds for the element to appear
    });

    // Extract the content of the element
    const rate = await page.$eval(
      'span[data-interestrate_sre="Fxrate_N_USD_sellrate"]',
      (el) => el.textContent.trim()
    );

    console.log('Scraped Exchange Rate:', rate);
    return rate;
  } catch (error) {
    console.error('Error scraping exchange rate:', error);
    return null;
  } finally {
    // Close the browser
    if (browser) {
      await browser.close();
    }
  }
};

// Fetch the exchange rate every minute
setInterval(async () => {
  const rate = await scrapeExchangeRate();
  if (rate) {
    // Update your application state or perform other actions
    console.log('Updated Exchange Rate:', rate);
  }
}, 60000); // Fetch every 60 seconds

// Initial fetch
scrapeExchangeRate();