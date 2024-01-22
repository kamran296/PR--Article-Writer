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
    console.log(prompt, 124);
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
// // Set the prompt for generating text
// const prompt = `Write an article about {harsh singh}'s journey in the field of {artificial intelligence}. {harsh singh} has {10} years of experience and currently works at {cache labs}. {harsh singh} is known for {google award for beast ai developer} and holds a degree in {btech in computer science from somaiya}.`;
// // Call the OpenAI API to generate text
// const article = async () => {
//   const response = await openai.chat.completions.create({
//     model: "ft:gpt-3.5-turbo-0613:cache-labs-llc:article-writer:8fpwSCUY", // You may need to adjust the engine version
//     messages: [
//       { role: "system", content: "You are an AI article writer." },
//       { role: "user", content: prompt },
//     ],
//     max_tokens: 800,
//   });
//   console.log(response.choices[0]);
// };
// article();

exports.articleForm = async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData.attribute);

    const prompt = `Write a PR article on ${formData.name} who is an ${formData.expertise} working at ${formData.company} and has ${formData.experience} years of experience in the industry. 
      ${formData.name} graduated from ${formData.education}. Notable achievements include ${formData.awards}. ${formData.name} also contributed to a significant project: ${formData.project}. 
      ${formData.name} had a significant impact on the industry, earning them awards. He has authored works, including ${formData.publications}.`;
    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-0613:cache-labs-llc:article-writer:8fpwSCUY", // You may need to adjust the engine version
      messages: [
        { role: "system", content: "You are an AI article writer." },
        { role: "user", content: prompt },
      ],
      max_tokens: 800,
    });
    console.log(response.choices[0]);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
