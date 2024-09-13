const puppeteer = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');
const path = require("path")


puppeteer.use(Stealth());

exports.getWageData = async (req, res) => {
  const { code, stateValue, areaValue, radioButtonChoice } = req.body;

  try {
    const radioButtonSelector = radioButtonChoice === 1
      ? '#root > div > div > div.column > form > fieldset:nth-child(5) > div > div:nth-child(1) > label'
      : '#root > div > div.mega-container > div.column > form > fieldset:nth-child(5) > div > div:nth-child(2) > label';

  
    // const extensionPath = 'C:\\Users\\omkar\\OneDrive\\Desktop\\Git\\PR--Article-Writer\\Backend\\3.1.0_0';

    const extensionPath = '/home/ubuntu/apps/PR--Article-Writer/Backend/3.1.0_0';


    // const pdfPath = path.join(__dirname, `../../3.1.0_0/manifest.json`);
    // const extensionPath = pdfPath;

    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        headless: false, // Extensions are not supported in headless mode
        args: [
          `--disable-extensions-except=${extensionPath}`,
          `--load-extension=${extensionPath}`,
          '--no-sandbox', // Disable sandboxing (necessary in many environments)
          '--disable-setuid-sandbox',
        ],
      });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);

    await page.goto('https://flag.dol.gov/wage-data/wage-search');

    const crossSelector = '#bannerClose';
    const crossElementExists = await page.$(crossSelector) !== null;

    if (crossElementExists) {
      await page.click(crossSelector);
    }

    await page.waitForSelector('#dateSeries');
    await page.select('#dateSeries', '7/2024 - 6/2025');

    await page.waitForSelector('#All-Industries-2', { visible: true });
    await page.evaluate(() => {
      document.querySelector('#All-Industries-2').scrollIntoView();
    });
    await page.evaluate(() => {
      document.querySelector('#All-Industries-2').click();
    });

    const inputSelector = '.dynamic-search-input';
    await page.waitForSelector(inputSelector);
    await page.type(inputSelector, code);
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.keyboard.press('ArrowDown');
    await new Promise(resolve => setTimeout(resolve, 2000));

    await page.waitForSelector('#state');
    await page.select('#state', stateValue);

    await page.waitForSelector(radioButtonSelector, { visible: true });
    await page.evaluate((selector) => {
      document.querySelector(selector).scrollIntoView();
    }, radioButtonSelector);
    await page.evaluate((selector) => {
      document.querySelector(selector).click();
    }, radioButtonSelector);

    await new Promise(resolve => setTimeout(resolve, 3000));

    await page.waitForSelector('#areaSelect');
    await page.select('#areaSelect', areaValue);

    // const submitButtonSelector = '#root > div > div > div.column > form > div.bottom-form-container > div.submit-container > button.submit';
    // await page.waitForSelector(submitButtonSelector);
    // await page.click(submitButtonSelector);

    const submitButtonSelector = '#root > div > div > div.column > form > div.bottom-form-container > div.submit-container > button.submit';

// Wait for the submit button to be present in the DOM
await page.waitForSelector(submitButtonSelector);

// Scroll to the bottom of the form to trigger any potential dynamic loading or interaction
await page.evaluate(() => {
  window.scrollBy(0, window.innerHeight);
});

// Perform a dummy click on a nearby element to trigger interaction (if necessary)
// Replace 'someOtherElementSelector' with an appropriate selector if needed
// await page.click('someOtherElementSelector');

// Optionally, wait for a short period to ensure interactions have taken effect
await new Promise(resolve => setTimeout(resolve, 2000));

// Now check if the button is enabled and clickable
await page.waitForFunction(
  (selector) => {
    const button = document.querySelector(selector);
    return button && !button.disabled; // Ensure the button is not disabled
  },
  {}, // Optional options object for the waitForFunction
  submitButtonSelector
);

// Click the submit button once it is clickable
await page.click(submitButtonSelector);

    await page.waitForSelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(1) > td:nth-child(2) > span');
    const level1Hr = await page.evaluate(() => {
      return document.querySelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(1) > td:nth-child(2) > span').textContent;
    });

    await page.waitForSelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(1) > td:nth-child(3) > span');
    const level1Yr = await page.evaluate(() => {
      return document.querySelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(1) > td:nth-child(3) > span').textContent;
    });

    await page.waitForSelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(2) > td:nth-child(2) > span');
    const level2Hr = await page.evaluate(() => {
      return document.querySelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(2) > td:nth-child(2) > span').textContent;
    });

    await page.waitForSelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(2) > td:nth-child(3) > span');
    const level2Yr = await page.evaluate(() => {
      return document.querySelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(2) > td:nth-child(3) > span').textContent;
    });

    await page.waitForSelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(3) > td:nth-child(2) > span');
    const level3Hr = await page.evaluate(() => {
      return document.querySelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(3) > td:nth-child(2) > span').textContent;
    });

    await page.waitForSelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(3) > td:nth-child(3) > span');
    const level3Yr = await page.evaluate(() => {
      return document.querySelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(3) > td:nth-child(3) > span').textContent;
    });

    await page.waitForSelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(4) > td:nth-child(2) > span');
    const level4Hr = await page.evaluate(() => {
      return document.querySelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(4) > td:nth-child(2) > span').textContent;
    });

    await page.waitForSelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(4) > td:nth-child(3) > span');
    const level4Yr = await page.evaluate(() => {
      return document.querySelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(4) > td:nth-child(3) > span').textContent;
    });

    await page.waitForSelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(5) > td:nth-child(2) > span');
    const meanHr = await page.evaluate(() => {
      return document.querySelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(5) > td:nth-child(2) > span').textContent;
    });

    await page.waitForSelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(5) > td:nth-child(3) > span');
    const meanYr = await page.evaluate(() => {
      return document.querySelector('#column-2 > div > div:nth-child(2) > div.usa-table-container--scrollable > table > tbody > tr:nth-child(5) > td:nth-child(3) > span').textContent;
    });

    await browser.close();

    res.json({
      level1Hr: level1Hr,
      level1Yr: level1Yr,
      level2Hr: level2Hr,
      level2Yr: level2Yr,
      level3Hr: level3Hr,
      level3Yr: level3Yr,
      level4Hr: level4Hr,
      level4Yr: level4Yr,
      meanHr: meanHr,
      meanYr:meanYr,
    });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ 'An error occurred while processing the request.' :error });
  }
};
// #root > div > div > div.column > form > div.bottom-form-container > div.submit-container > button.submit