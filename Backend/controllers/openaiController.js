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

    const prompt = `Write a PR article on ${formData.name} who is an ${formData.expertise} working at ${formData.company} and has ${formData.experience} years of experience in the industry. 
    ${formData.name} graduated from ${formData.education}. Notable achievements include ${formData.awards}. ${formData.name} also contributed to a significant project: ${formData.project}. 
    ${formData.name} had a significant impact on the industry, earning them awards. He has authored works, including ${formData.publications}.`;

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
      max_tokens: 800,
    });
    console.log(response.choices[0].message.content);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.loaFormCritical = async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData, 1234);
    const role = formData.typeOfLOA;
    let prompt = "";

    prompt = `Generate a Letter of Appreciation for ${formData.recipientName} from ${formData.recipientOrganization} received from ${formData.senderName}. 
    The sender's relationship with the recipient is ${formData.senderRelationship}. 
    The concerned field of work is ${formData.concernedFieldOfWork}, with a focus on ${formData.nicheDomain}. 
    The source of knowledge regarding the recipient's contributions is ${formData.sourceOfKnowledge}. 
    Previous contributions by the recipient include ${formData.previousContributions}. 
    The LOA setting is ${formData.loaSetting}, and the type of LOA is ${formData.typeOfLOA}. 
    Recipient's critical role description involves ${formData.recipientRoleDescription}. 
    Responsibilities undertaken by the recipient include ${formData.responsibilitiesUndertaken}. 
    Key skills possessed by the recipient include ${formData.keySkills}. 
    Project details the recipient has worked on include ${formData.project}. 
    Outcomes/achievements include ${formData.outcomeAchievements}. 
    The sender expresses gratitude through ${formData.tokenOfGratitude}. 
    Please generate a letter of appreciation based on the provided information.`;

    const response = await openai.chat.completions.create({
      // model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:article-writer:8zrkDK1q", // You may need to adjust the engine version
      model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:article-writer:9460S2UQ",
      messages: [
        {
          role: "system",
          content: `AI Letter of Appreciation writer for Critical Role LOA `,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 1200,
    });
    // console.log(response.choices[0].message.content, 123);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.loaFormResearch = async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData, 1234);
    const role = formData.typeOfLOA;
    let prompt = "";
    prompt = `Generate a Letter of Appreciation for ${formData.recipientName} from ${formData.recipientOrganization} received from ${formData.senderName}. 
    The sender's relationship with the recipient is ${formData.senderRelationship}. 
    The concerned field of work is ${formData.fieldOfWork}, with a focus on ${formData.nicheDomain}. 
    The source of knowledge regarding the recipient's contributions is ${formData.sourceOfKnowledge}. 
    Recognition or awards conferred to the addressee include ${formData.recognitionOrAwards}. 
    The LOA setting is ${formData.loaSetting}, and the type of LOA is ${formData.typeOfLOA}. 
    Title of the paper authored by the recipient is ${formData.titleOfPaper}. 
    The aspect addressed by the paper is ${formData.aspectAddressed}. 
    The novelty of work and significance for future work are ${formData.noveltySignificance}. 
    A notable takeaway from the paper is ${formData.takeaway}. 
    Detailed description of the paper's impact includes ${formData.paperImpact}. 
    The publication where the paper was published is ${formData.publication}. 
    Please generate a letter of appreciation based on the provided information.`;

    const response = await openai.chat.completions.create({
      // model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:article-writer:8zrkDK1q", // You may need to adjust the engine version
      model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:article-writer:9460S2UQ",
      messages: [
        {
          role: "system",
          content: `AI Letter of Appreciation writer for Research Paper publication LOA`,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 1200,
    });
    // console.log(response.choices[0].message.content, 123);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.loaFormOriginal = async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData, 1234);
    const role = formData.typeOfLOA;
    let prompt = "";

    prompt = `Generate a Letter of Appreciation for ${formData.recipientName} from ${formData.recipientOrganization} received from ${formData.senderName}. 
    The sender's relationship with the recipient is ${formData.senderRelationship}. 
    The concerned field of work is ${formData.concernedFieldOfWork}, with a focus on ${formData.nicheDomain}. 
    The source of knowledge regarding the recipient's contributions is ${formData.sourceOfKnowledge}. 
    Previous contributions by the recipient include ${formData.previousContributions}. 
    The LOA setting is ${formData.loaSetting}, and the type of LOA is ${formData.typeOfLOA}. 
    Recipient's critical role description involves ${formData.recipientRoleDescription}. 
    Responsibilities undertaken by the recipient include ${formData.responsibilitiesUndertaken}. 
    Key skills possessed by the recipient include ${formData.keySkills}. 
    Project details the recipient has worked on include ${formData.project}. 
    Outcomes/achievements include ${formData.outcomeAchievements}. 
    The sender expresses gratitude through ${formData.tokenOfGratitude}. 
    Please generate a letter of appreciation based on the provided information.`;

    const response = await openai.chat.completions.create({
      // model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:article-writer:8zrkDK1q", // You may need to adjust the engine version
      model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:article-writer:9460S2UQ",
      messages: [
        {
          role: "system",
          content: `AI Letter of Appreciation writer for Original Contribution LOA`,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 1200,
    });
    // console.log(response.choices[0].message.content, 123);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
