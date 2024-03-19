const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { Configuration, OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.API,
});
// const openai = new OpenAIApi(configuration);
// ft:gpt-3.5-turbo-0613:cache-labs-llc:article-writer:8fpwSCUY
// ft:gpt-3.5-turbo-0613:cache-labs-llc:yt-tutorial:8hHNplz0

exports.articlePrompt = async (req, res) => {
  const prompt = req.body.prompt;
  console.log(req.body, 432);
  try {
    if (typeof prompt !== "string") {
      return res.status(400).json({ error: "Invalid input prompt" });
    }
    // console.log(prompt, 124);
    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-0613:cache-labs-llc:yt-tutorial:8hHNplz0", // You may need to adjust the engine version
      messages: [
        { role: "system", content: "You are an AI article writer." },
        { role: "user", content: prompt },
      ],
      max_tokens: 800,
      temperature: 0.2,
    });
    console.log(response.choices[0]);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.articleForm = async (req, res) => {
  try {
    const formData = req.body;

    const prompt = `write a article on ${formData.Name}, who is a professional with expertise in ${formData.expertise}. Holding a ${formData.highestDegree} in ${formData.specialization} from ${formData.university}, ${formData.name} currently serves as ${formData.jobTitle} at ${formData.currentEmployer} with ${formData.experience} years of rich experience in ${formData.industry}. Known for ${formData.achievements}, ${formData.name} has made significant contributions through ${formData.impact} and successfully led ${formData.projects}. With a track record of ${formData.quantifiedWorks}, ${formData.name} has overcome challenges like ${formData.challengesOvercome}. Additionally, ${formData.name} has published ${formData.publications} and offers valuable ${formData.industryInsight}.`;
    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-0613:cache-labs-llc:yt-tutorial:8hHNplz0", // You may need to adjust the engine version
      messages: [
        { role: "system", content: "You are an AI article writer." },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 800,
    });
    console.log(response.choices[0]);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.loaPrompt = async (req, res) => {
  try {
    const prompt = req.body.prompt;

    // const prompt = `write a article on ${formData.Name}, who is a professional with expertise in ${formData.expertise}. Holding a ${formData.highestDegree} in ${formData.specialization} from ${formData.university}, ${formData.name} currently serves as ${formData.jobTitle} at ${formData.currentEmployer} with ${formData.experience} years of rich experience in ${formData.industry}. Known for ${formData.achievements}, ${formData.name} has made significant contributions through ${formData.impact} and successfully led ${formData.projects}. With a track record of ${formData.quantifiedWorks}, ${formData.name} has overcome challenges like ${formData.challengesOvercome}. Additionally, ${formData.name} has published ${formData.publications} and offers valuable ${formData.industryInsight}.`;
    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:article-writer:8zrkDK1q", // You may need to adjust the engine version
      messages: [
        {
          role: "system",
          content: "AI Letter of Appreciation Generator for Critical Role",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 300,
    });
    console.log(response.choices[0].message.content);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.loaForm = async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);
    const role = formData.typeOfLOA;
    let prompt = "";
    if (role === "Critical Role") {
      prompt =
        `Recipient's Name: ${formData.recipientName}\n` +
        `Recipient's Organization/University: ${formData.recipientOrganization}\n` +
        `Sender's Name: ${formData.senderName}\n` +
        `Sender's Organization/Institution: ${formData.senderOrganization}\n` +
        `Sender's Relationship with the Recipient: ${formData.senderRelationship}\n` +
        `Concerned Field of Work: ${formData.concernedFieldOfWork}\n` +
        `Niche Domain (if any): ${formData.nicheDomain}\n` +
        `Source of Knowledge: ${formData.sourceOfKnowledge}\n` +
        `Previous Contributions: ${formData.previousContributions}\n` +
        `Recipient's Critical Role Description: ${formData.recipientRoleDescription}\n` +
        `Responsibilities Undertaken: ${formData.responsibilitiesUndertaken}\n` +
        `Key Skills: ${formData.keySkills}\n` +
        `Project: ${formData.project}\n` +
        `Outcome/Achievements: ${formData.outcomeAchievements}\n` +
        `Token of Gratitude: ${formData.tokenOfGratitude}\n` +
        `Letter content code: ${formData.letterContentCode}`;
    } else if (role === "Research Paper") {
      prompt =
        `Recipient's Name: ${formData.recipientName}\n` +
        `Recipient's Organization/University: ${formData.recipientOrganization}\n` +
        `Sender's Name: ${formData.senderName}\n` +
        `Sender's Organization/Institution: ${formData.senderOrganization}\n` +
        `Sender's Relationship with the Recipient: ${formData.senderRelationship}\n` +
        `Concerned Field of Work: ${formData.concernedFieldOfWork}\n` +
        `Niche Domain (if any): ${formData.nicheDomain}\n` +
        `Source of Knowledge: ${formData.sourceOfKnowledge}\n` +
        `Previous Contributions: ${formData.previousContributions}\n` +
        `Recipient's Critical Role Description: ${formData.recipientRoleDescription}\n` +
        `Responsibilities Undertaken: ${formData.responsibilitiesUndertaken}\n` +
        `Key Skills: ${formData.keySkills}\n` +
        `Project: ${formData.project}\n` +
        `Outcome/Achievements: ${formData.outcomeAchievements}\n` +
        `Token of Gratitude: ${formData.tokenOfGratitude}\n` +
        `Letter content code: ${formData.letterContentCode}`;
    } else if (role === "Original Contribution") {
      prompt =
        `Recipient's Name: ${formData.recipientName}\n` +
        `Recipient's Organization/University: ${formData.recipientOrganization}\n` +
        `Sender's Name: ${formData.senderName}\n` +
        `Sender's Organization/Institution: ${formData.senderOrganization}\n` +
        `Sender's Relationship with the Recipient: ${formData.senderRelationship}\n` +
        `Concerned Field of Work: ${formData.concernedFieldOfWork}\n` +
        `Niche Domain (if any): ${formData.nicheDomain}\n` +
        `Source of Knowledge: ${formData.sourceOfKnowledge}\n` +
        `Previous Contributions: ${formData.previousContributions}\n` +
        `Recipient's recognition Or Awards: ${formData.recognitionOrAwards}\n` +
        `Title of Paper: ${formData.titleOfPaper}\n` +
        `Aspect Of Paper: ${formData.AspectOfPaper}\n` +
        `Novelty Of Work: ${formData.noveltyOfWork}\n` +
        `Significance For Future Work: ${formData.significanceForFutureWork}\n` +
        `Detailed Description: ${formData.detailedDescription}\n` +
        `Letter content code: ${formData.Publication}`;
    }
    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:article-writer:8zrkDK1q", // You may need to adjust the engine version
      // model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:article-writer:9460S2UQ",
      messages: [
        {
          role: "system",
          content: `AI Letter of Appreciation Generator for ${role}`,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 800,
    });
    // console.log(response.choices[0].message.content, 123);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
