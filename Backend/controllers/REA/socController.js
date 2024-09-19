const AreaModel = require('../../model/AreaData');
const ALCData = require('../../model/socData'); // Import the ALCData model

// Function to break the input into keywords
function buildKeywordsFromAreaValue(areaValue) {
    // Remove special characters and split into keywords
    const keywords = areaValue.split(/[\s-]+/).map(keyword => keyword.trim()).filter(Boolean);
    return keywords;
}

// Controller function to handle the /getAreaCodeAndSalary route
module.exports.getAreaCodeAndSalary = async (req, res) => {
    const { stateValue, areaValue, socCode } = req.body;

    // Validate input
    if (!stateValue || !areaValue || !socCode) {
        return res.status(400).json({ error: 'State value, Area value, and SocCode are required' });
    }

    try {
        // Split the areaValue into keywords
        const keywords = buildKeywordsFromAreaValue(areaValue);

        // Build a case-insensitive regex for each keyword
        const regexArray = keywords.map(keyword => ({
            Area: { $regex: new RegExp(keyword, 'i') }
        }));

        // Query the MongoDB collection with a case-insensitive match on the stateValue
        const areaResult = await AreaModel.findOne({
            State: { $regex: new RegExp(`^${stateValue}$`, 'i') }, // Case-insensitive match for stateValue
            $and: regexArray // Perform a fuzzy match with AND condition on area
        });

        if (!areaResult) {
            return res.status(404).json({ error: 'No match found for the provided state and area' });
        }

        // Extract the AreaCode from the result
        const areaCode = areaResult.AreaCode;

        // Now query the ALCData model with the areaCode and socCode
        const salaryResult = await ALCData.findOne({
            Area: areaCode, // Match with the AreaCode
            SocCode: socCode // Match with the provided SocCode
        });

        if (!salaryResult) {
            return res.status(404).json({ error: 'No matching salary data found for the provided AreaCode and SocCode' });
        }

        // Return the Level4 and Average salary if found
        return res.status(200).json({
            areaCode: areaCode,
            socCode: socCode,
            level1Salary: salaryResult.Level1,
            level2Salary: salaryResult.Level2,
            level3Salary: salaryResult.Level3,
            level4Salary: salaryResult.Level4,
            averageSalary: salaryResult.Average
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};
