const axios = require('axios');

exports.getAggregatedSalary = async (req, res) => {
    const { jobTitle, location } = req.body;

    if (!jobTitle || !location) {
        return res.status(400).send({ error: 'jobTitle and location are required parameters' });
    }

    try {
        // Define the API calls
        // const api1 = axios.post('https://www.internal.cachelabs.io/api/salary/salary', { jobTitle, location });
        const api2 = axios.post('https://www.internal.cachelabs.io/api/indeed/get-salary-indeed', { jobRole: jobTitle, location });
        // const api3 = axios.post('https://www.internal.cachelabs.io/api/talent/search-salary-talent', { jobTitle, location });
        // const api4 = axios.post('https://www.internal.cachelabs.io/api/monster/monster-search', { jobTitle, location });
        // const api5 = axios.post('https://www.internal.cachelabs.io/api/levels/search-Levels', { jobTitle, location });


        // Initialize responses and errors
        const results = {
            // salaryCom: null,
            indeed: null,
            // talent: null,
            // monster: null,
            // levels: null,
            errors: [],
        };

        // Execute API calls
        const [ response2] = await Promise.allSettled([ api2]);

        // Process each response
        // if (response1.status === 'fulfilled') {
        //     results.salaryCom = response1.value.data;
        // } else {
        //     results.errors.push({ api: 'Salary.com', error: response1.reason.message });
        // }

        if (response2.status === 'fulfilled') {
            results.indeed = response2.value.data;
        } else {
            results.errors.push({ api: 'Indeed', error: response2.reason.message });
        }

        // if (response3.status === 'fulfilled') {
        //     results.talent = response3.value.data.salaryValues;
        // } else {
        //     results.errors.push({ api: 'Talent.com', error: response3.reason.message });
        // }

        // if (response4.status === 'fulfilled') {
        //     results.monster = response4.value.data.salaryData;  
        // } else {
        //     results.errors.push({ api: 'Monster.com', error: response4.reason.message });
        // }

        // if (response5.status === 'fulfilled') {
        //     results.levels = response5.value.data;  // Added levelsFyi processing
        // } else {
        //     results.errors.push({ api: 'Levels.fyi', error: response5.reason.message });
        // }

        // Return the results
        res.json(results);
    } catch (error) {
        console.error('Error in fetching data from APIs:', error);
        res.status(500).send({ error: 'An error occurred while fetching salary data' });
    }
};

