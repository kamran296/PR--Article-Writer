const JobData = require('../../model/JobData'); // Import the JobData model

// Controller function to get salary by job title
const getSalaryByJobTitle = async (req, res) => {
  const jobTitle = req.body.jobTitle; // Get job title from request body

  if (!jobTitle) {
    return res.status(400).json({ error: 'Job title is required' });
  }

  try {
    // First, look for a job title that specifically matches "Tier 3"
    const regexTier3 = new RegExp(`^${jobTitle}.*Tier 3$`, 'i'); // Regex for jobTitle ending with 'Tier 3'
    let jobData = await JobData.findOne({ jobTitle: { $regex: regexTier3 } });

    if (!jobData) {
      // If no match for "Tier 3", search for job title without Tier specification
      const regex = new RegExp(`^${jobTitle}`, 'i'); // 'i' for case-insensitive
      jobData = await JobData.findOne({ jobTitle: { $regex: regex } });
    }

    if (jobData) {
      // Return basePayMax and basePayMin as response
      return res.json({
        basePayMax: jobData.basePayMax,
        basePayMin: jobData.basePayMin,
      });
    } else {
      return res.status(404).json({ error: 'Job title not found' });
    }

  } catch (err) {
    console.error('Error querying data:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getSalaryByJobTitle };
