const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { Configuration, OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.API,
});

exports.bioWriterForm = async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);
    let prompt = "";

    // prompt = `Generate a bio for ${formData.name}, whose professional experience includes ${formData.professionalExperience}, highlighting their ${formData.careerHighlight}. Mention their expertise in ${formData.skills} and commitment to ${formData.commitments}. Additionally, note their proficiency in ${formData.proficiency}. Also, mention any ${formData.recognitionOrAwards} and any judging opportunities received ${formData.judgingOpportunity}. Include their appearances in press or media ${formData.pressOrMedia}, as well as their vision ${formData.vision} for the future.`;
    // prompt = `Generate a bio for ${formData.name} whose professional experience includes ${formData.professionalExperience}, highlighting their ${formData.careerHighlight}. Mention their expertise in ${formData.skills} and commitment to ${formData.commitments}. Also, note any ${formData.recognitionOrAwards} received and their ${formData.vision} for the future`;
    prompt = `Generate a professional bio for ${formData.bioName} with ${formData.professionalExperience} in ${formData.skills}. Describe their ${formData.background} and ${formData.careerHighlight} from their career. Discuss their ${formData.commitments} to their field and areas of ${formData.proficiency}, ${formData.academicExcellence}, and ${formData.judgingOpportunity} they've pursued. Highlight any ${formData.recognitionOrAwards} they've received and articulate their ${formData.vision} for the future.`;
    const response = await openai.chat.completions.create({
      // model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:article-writer:8zrkDK1q", // You may need to adjust the engine version
      // model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:bio-writer:9A9R9krl",
      model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:bio-writer:9DGBBLCC",
      messages: [
        {
          role: "system",
          content: `AI professional biography writer`,
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

exports.bioWriterPrompt = async (req, res) => {
  try {
    const formData = req.body;

    let prompt = formData.prompt;

    const response = await openai.chat.completions.create({
      // model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:article-writer:8zrkDK1q", // You may need to adjust the engine version
      // model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:bio-writer:9A9R9krl",
      model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:bio-writer:9DGBBLCC",
      messages: [
        {
          role: "system",
          content: `AI professional BIO writer`,
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
