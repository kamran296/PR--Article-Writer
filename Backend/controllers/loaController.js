const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { Configuration, OpenAI } = require("openai");
const loaOrg = require("../model/loaOrgData");
const loaResearch = require("../model/loaPaperData");
const loaCritical = require("../model/loaCriticalData");
const openai = new OpenAI({
  apiKey: process.env.API,
});

exports.loaPrompt = async (req, res) => {
  try {
    const prompt = req.body.prompt;

    // const prompt = `write a article on ${formData.Name}, who is a professional with expertise in ${formData.expertise}. Holding a ${formData.highestDegree} in ${formData.specialization} from ${formData.university}, ${formData.name} currently serves as ${formData.jobTitle} at ${formData.currentEmployer} with ${formData.experience} years of rich experience in ${formData.industry}. Known for ${formData.achievements}, ${formData.name} has made significant contributions through ${formData.impact} and successfully led ${formData.projects}. With a track record of ${formData.quantifiedWorks}, ${formData.name} has overcome challenges like ${formData.challengesOvercome}. Additionally, ${formData.name} has published ${formData.publications} and offers valuable ${formData.industryInsight}.`;
    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:article-writer:8zrkDK1q", // You may need to adjust the engine version
      messages: [
        {
          role: "system",
          content: "AI Letter of Appreciation Generator for Critical Role LOA",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 800,
    });
    console.log(response.choices[0].message.content);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
