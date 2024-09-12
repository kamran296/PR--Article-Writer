// salaryController.js
const puppeteer = require('puppeteer');
const path = require('path');


exports.searchLevels = async (req, res) => {
  const { jobTitle, location } = req.body;

  if (!jobTitle || !location) {
    return res.status(400).send('jobTitle and location are required');
  }

  try {
    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to Google
    await page.goto('https://www.google.com');

    // Type your search query
    const searchQuery = `${jobTitle} salary in ${location} levels.fyi`;
    await page.type('textarea.gLFyf#APjFqb[name="q"]', searchQuery);

    // Press 'Enter' to submit the search
    await page.keyboard.press('Enter');

    // Wait for the results to load
    await page.waitForSelector('h3');

    // Click the first link in the search results
    const firstLink = await page.$('h3');
    if (firstLink) {
      await firstLink.click();
    } else {
      res.status(404).send('No search results found');
      await browser.close();
      return;
    }

    await page.waitForNavigation({ timeout: 60000 });

    // Step 1: Click the side-nav-toggle button
    await page.waitForSelector('button.side-nav-toggle');
    await page.click('button.side-nav-toggle');

    // Step 2: Click the Change Currency button
    await page.waitForSelector('button.button_currencyButton__3Osor.button_divider__EKGks');
    await page.click('button.button_currencyButton__3Osor.button_divider__EKGks');

    // Step 3: Select the USD currency
    await page.waitForSelector('button[data-code="USD"]');
    await page.click('button[data-code="USD"]');

    // Now, extract the 90th percentile salary data
    await page.waitForSelector('div.percentiles_ninetieth__wsuGa h6');
    let high = await page.$eval(
      'div.percentiles_ninetieth__wsuGa h6',
      element => element.textContent.trim()
    );

    // Convert the ninetiethPercentileSalary from $190k to $190,000
    if (high.includes('K')) {
      high = high.replace('K', '000');
    }

    // Extract the median salary data
    await page.waitForSelector('div.percentiles_median__ZQVGl h3');
    const medianSalary = await page.$eval(
      'div.percentiles_median__ZQVGl h3',
      element => element.textContent.trim()
    );

    // const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Format the timestamp
    // const screenshotPath = path.join(__dirname, `screenshot-${timestamp}.png`);

    // await page.screenshot({ path: screenshotPath});

    // Close the browser
    await browser.close();

    // Return the extracted data as the API response
    res.json({ high, medianSalary });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('An error occurred while scraping the data.');
  }
};
