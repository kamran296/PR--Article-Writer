const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Chat = require("../model/chatbotData");
const { Configuration, OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.API,
});

exports.chatbot = async (req, res) => {
  try {
    const chat = req.body.chat;
    if (chat === "") {
      return res
        .status(200)
        .json("I'm here to help you so feel free to ask me anything!!");
    }
    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:chatbotfaq20:9XWiosPi",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant. Answer the user's questions accurately based on the provided data.`,
        },
        { role: "user", content: chat },
      ],
      temperature: 0.4,
      max_tokens: 200,
    });
    console.log(response.choices[0].message.content, 123);
    console.log(response);
    const answer = response.choices[0].message.content;
    res.status(200).json(answer);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.addData = async (req, res) => {
  try {
    const { question, answer } = req.body;
    console.log(question, answer);
    const newChat = new Chat({
      messages: [
        { role: "system" },
        { role: "user", content: question },
        { role: "assistant", content: answer },
      ],
    });
    await newChat.save();
    res.status(201).json({ message: "Data added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getData = async (req, res) => {
  console.log("hiefnnf");
  // const chatData = await Chat.find();
  try {
    // Fetch all chat data from the database
    console.log(chatData, 21);
    // Check if there's any data
    if (!chatData || chatData.length === 0) {
      return res.status(404).json({ message: "No chat data found" });
    }
    // If data is found, send it in the response
    res.status(200).json(chatData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
