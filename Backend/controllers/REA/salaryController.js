const puppeteer = require('puppeteer');

exports.getSalary = async (req, res) => {
    const { jobTitle, location } = req.body;
    
    if (!jobTitle || !location) {
        return res.status(400).json({ error: 'jobTitle and location are required parameters' });
    }

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://www.salary.com/');

        // Type the job title and location into the search fields
        await page.type('#trafficdrivertad-worth-jobtitle_input', jobTitle);
        await page.type('#trafficdrivertad-worth-location_input', location);

        // Click the search button
        await page.click('#sa_body_tool_search_btn');

        // Wait for the results page to load and display the results
        await page.waitForSelector('a.a-color.font-semibold.margin-right10');

        // Select the first result and navigate to it
        const firstResultSelector = 'a.a-color.font-semibold.margin-right10';
        const firstResultHref = await page.$eval(firstResultSelector, a => a.href);

        await page.goto(firstResultHref);

        // Wait for the page to load the necessary elements
        await page.waitForSelector('#top_salary_value');

        // Extract salary data
        const salaryData = await page.evaluate(() => {
            const getSalaryTextById = (id) => {
                const element = document.getElementById(id);
                return element ? element.textContent.trim() : 'N/A';
            };

            const website = 'Salary.com';
            const lowSalary = getSalaryTextById('_26_888');
            const highSalary = getSalaryTextById('_135_289');
            const averageSalary = getSalaryTextById('top_salary_value');

            return { website, lowSalary, highSalary, averageSalary };
        });

        await browser.close();

        // Send the extracted salary data as the response
        return res.json(salaryData);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching salary data.' });
    }
};

