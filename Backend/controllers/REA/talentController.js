const puppeteer = require('puppeteer');

exports.getSalaryTalent = async (req, res) => {
    const { jobTitle, location } = req.body;

    console.log('Received jobTitle:', jobTitle);
    console.log('Received jobLocation:', location);

    if (!jobTitle || !location) {
        return res.status(400).json({ error: 'Job title and location are required' });
    }

    let browser;
    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://www.talent.com/salary');

        await page.type('#salary-job', jobTitle);
        await page.type('#salary-location', location);

        await page.click('#submit-salary-search');

        await page.waitForSelector('.l-card__stats--lowLabel');

        const salaryValues = await page.evaluate(() => {
            const getValue = (parentSelector) => {
                const parentElement = document.querySelector(parentSelector);
                const element = parentElement?.querySelector('.c-card--stats-graph-text.timeBased');
                return element ? element.getAttribute('peryear') : null;
            };

            const lowValue = getValue('.l-card__stats--lowLabel');
            const medianValue = getValue('.l-card__stats--midLabel');
            const highValue = getValue('.l-card__stats--highLabel');

            return {
                low: lowValue,
                mid: medianValue,
                high: highValue,
            };
        });

        res.json({ salaryValues });
        console.log({ salaryValues });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};
