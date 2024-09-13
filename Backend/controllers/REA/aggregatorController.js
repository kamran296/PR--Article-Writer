const axios = require("axios");

exports.getAggregatedSalary = async (req, res) => {
  const { jobTitle, location } = req.body;

  // Check for required parameters
  if (!jobTitle || !location) {
    return res
      .status(400)
      .send({ error: "jobTitle and location are required parameters" });
  }

  // Initialize response structure
  const results = {
    salaryCom: null,
    indeed: null,
    talent: null,
    levels: null,
    errors: [],
  };

  try {
    // Define each API call with error handling in individual .catch blocks
    const api1 = axios
      .post("https://www.internal.cachelabs.io/api/salary/salary", { jobTitle, location })
      .then(response => results.salaryCom = response.data)
      .catch(error => results.errors.push({ api: "Salary.com", error: error.message || "Unknown error" }));

    const api2 = axios
      .post("https://www.internal.cachelabs.io/api/indeed/get-salary-indeed", { jobRole: jobTitle, location })
      .then(response => results.indeed = response.data)
      .catch(error => results.errors.push({ api: "Indeed", error: error.message || "Unknown error" }));

    const api3 = axios
      .post("https://www.internal.cachelabs.io/api/talent/search-salary-talent", { jobTitle, location })
      .then(response => results.talent = response.data.salaryValues)
      .catch(error => results.errors.push({ api: "Talent.com", error: error.message || "Unknown error" }));

    const api5 = axios
      .post("https://www.internal.cachelabs.io/api/levels/search-Levels", { jobTitle, location })
      .then(response => results.levels = response.data)
      .catch(error => results.errors.push({ api: "Levels.fyi", error: error.message || "Unknown error" }));

    // Wait for all API calls to finish
    await Promise.all([api1, api2, api3, api5]);

    // Return the results, including any errors that occurred in specific APIs
    res.json(results);

  } catch (error) {
    // Handle unexpected errors that are not caught in individual promises
    console.error("An error in fetching data from APIs:", error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching salary data" });
  }
};
