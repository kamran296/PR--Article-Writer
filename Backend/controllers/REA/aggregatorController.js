const axios = require('axios');

exports.getAggregatedSalary = async (req, res) => {
    const { jobTitle, location } = req.body;

    if (!jobTitle || !location) {
        return res.status(400).send({ error: 'jobTitle and location are required parameters' });
    }

    try {
        // Define the API calls
        const api1 = axios.post('http://localhost:5000/api/salary/salary', { jobTitle, location });
        const api2 = axios.post('http://localhost:5000/api/indeed/get-salary-indeed', { jobRole: jobTitle, location });
        const api3 = axios.post('http://localhost:5000/api/talent/search-salary-talent', { jobTitle, location });

        // Initialize responses and errors
        const results = {
            salaryCom: null,
            indeed: null,
            talent: null,
            errors: [],
        };

        // Execute API calls
        const [response1, response2, response3] = await Promise.allSettled([api1, api2, api3]);

        // Process each response
        if (response1.status === 'fulfilled') {
            results.salaryCom = response1.value.data;
        } else {
            results.errors.push({ api: 'Salary.com', error: response1.reason.message });
        }

        if (response2.status === 'fulfilled') {
            results.indeed = response2.value.data;
        } else {
            results.errors.push({ api: 'Indeed', error: response2.reason.message });
        }

        if (response3.status === 'fulfilled') {
            results.talent = response3.value.data.salaryValues;
        } else {
            results.errors.push({ api: 'Talent.com', error: response3.reason.message });
        }

        // Return the results
        res.json(results);
    } catch (error) {
        console.error('Error in fetching data from APIs:', error);
        res.status(500).send({ error: 'An error occurred while fetching salary data' });
    }
};

