// controllers/monsterController.js
const axios = require('axios');
const puppeteer = require('puppeteer');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const CONSTANT_WEBSITE = 'www.monster.com/salary';
const KEYWORD = 'salary';
const website1 = 'monster';

const searchMonsterSalary = async (req, res) => {
    const { jobTitle, location } = req.body;

    const query = `${jobTitle} ${location} ${website1} ${KEYWORD}`;
    const googleSearchAPI = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${process.env.API_KEY}&cx=${process.env.CX}`;

    console.log('Query:', query);
    console.log('Google Search API URL:', googleSearchAPI);

    try {
        const response = await axios.get(googleSearchAPI);
        const filteredResults = response.data.items.filter(item =>
            item.link.startsWith(`https://${CONSTANT_WEBSITE}`)
        );

        if (filteredResults.length === 0) {
            return res.status(404).send('No relevant results found');
        }

        const firstLink = filteredResults[0].link;
        console.log('First Filtered Link:', firstLink);

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(firstLink, {
            waitUntil: 'networkidle2',
        });

        const salaryData = await page.evaluate(() => {
            const lowSalary = document.querySelector('.minSalary')?.innerText.trim();
            const highSalary = document.querySelector('.maxSalary')?.innerText.trim();
            const averageSalary = document.querySelector('.avgSalary')?.innerText.trim();

            return {
                low: lowSalary,
                average: averageSalary,
                high: highSalary,
            };
        });

        // const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Format the timestamp
        // const screenshotPath = path.join(__dirname, `screenshot-${timestamp}.png`);

        await page.screenshot({ path: screenshotPath});

        await browser.close();

        if (!salaryData.low || !salaryData.average || !salaryData.high) {
            throw new Error('Salary data extraction failed');
        }

        console.log('Extracted Salary Data:', salaryData);
        res.json({ website: website1, salaryData });
    } catch (error) {
        console.error('Error:', error.message);
        if (error.message === 'Salary data extraction failed') {
            res.status(500).send('Data not extracted from the website');
        } else if (error.response && error.response.status === 403) {
            res.status(403).send('Access to the website is forbidden');
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = { searchMonsterSalary };
