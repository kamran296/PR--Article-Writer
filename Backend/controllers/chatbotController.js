const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Chat = require("../model/chatbotData");
const { Configuration, OpenAI } = require("openai");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const ChatModel = require("../model/chatbotModels");
const openai = new OpenAI({
  apiKey: process.env.API,
});

module.exports.chatbot = async (req, res) => {
  try {
    const chat = req.body.chat;
    if (chat === "") {
      return res
        .status(200)
        .json("I'm here to help you so feel free to ask me anything!!");
    }

    const latestModel = await ChatModel.findOne().sort({ createdAt: -1 });
    const model = latestModel
      ? latestModel.model
      : "ft:gpt-3.5-turbo-0125:cache-labs-llc:chatbotfaq20:9XWiosPi";
    console.log(model, 123);
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant. Answer the user's questions accurately based on the provided data.`,
        },
        { role: "user", content: chat },
      ],
      temperature: 0.1,
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

module.exports.addData = async (req, res) => {
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

module.exports.getData = async (req, res) => {
  console.log("hiefnnf");
  const chatData = await Chat.find();
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

const download = async () => {
  const chatData = await Chat.find().lean();

  // Remove the _id field from each document
  // const chatDataWithoutId = chatData.map(({ _id, ...rest }) => rest);
  const chatDataWithoutId = chatData.map((doc) => {
    const { _id, __v, ...rest } = doc;
    const messagesWithoutId = rest.messages.map(
      ({ _id, ...messageRest }) => messageRest
    );
    return { ...rest, messages: messagesWithoutId };
  });

  // Check if there's any data
  if (!chatDataWithoutId || chatDataWithoutId.length === 0) {
    throw new Error("No chat data found");
  }

  // Convert the data to a JSON string
  const jsonData = JSON.stringify(chatDataWithoutId, null, 2);

  const dataDir = path.join(__dirname, "../data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  const filePath = path.join(dataDir, "chatData.json");

  // Write JSON data to a file
  fs.writeFileSync(filePath, jsonData, "utf-8");
  console.log(filePath, "filePath");
  return filePath; // Return the path of the saved JSON file
};

const convertToJSONL = (filePath) => {
  // Read the JSON file
  const data = fs.readFileSync(filePath, "utf8");

  // Parse the JSON data
  const jsonData = JSON.parse(data);

  // Transform the data to JSONL format
  const jsonlData = jsonData
    .map((item) => {
      // Create a new object excluding the __v field
      const { __v, ...rest } = item;
      return JSON.stringify(rest);
    })
    .join("\n");

  // Get the output file path
  const outputFilePath = path.join(path.dirname(filePath), "chatData.jsonl");

  // Write the JSONL data to a new file
  fs.writeFileSync(outputFilePath, jsonlData, "utf8");

  console.log(`JSONL file has been created successfully at ${outputFilePath}`);

  return outputFilePath; // Return the path of the saved JSONL file
};

module.exports.fineTune = async (req, res) => {
  try {
    const filePath = await download();
    const Path = path.join(__dirname, "../data/chatData.json");
    const jsonlFilePath = convertToJSONL(Path);

    const fineTuneModel = async () => {
      try {
        // Upload training file
        const fileStream = fs.createReadStream(jsonlFilePath);
        const trainingFile = await openai.files.create({
          file: fileStream,
          purpose: "fine-tune",
        });

        console.log(`Training file ID: ${trainingFile.id}`);

        // Create fine-tuning job
        const response = await openai.fineTuning.jobs.create({
          training_file: trainingFile.id,
          model: "gpt-3.5-turbo",
          suffix: "chatModel",
        });

        const jobId = response.id;
        console.log(`Fine-tuning job ID: ${jobId}`);

        // Polling function to check the job status
        const checkJobStatus = async () => {
          try {
            const responseStatus = await openai.fineTuning.jobs.retrieve(jobId);
            console.log(`Current job status: ${responseStatus.status}`);

            if (
              responseStatus.status === "succeeded" ||
              responseStatus.status === "failed"
            ) {
              clearInterval(polling);
              if (responseStatus.status === "succeeded") {
                const fineTunedModel = responseStatus.fine_tuned_model;

                // Save the fine_tuned_model to the database
                const newModel = new ChatModel({
                  model: fineTunedModel,
                });
                await newModel.save();
                fs.unlinkSync(filePath);
                fs.unlinkSync(jsonlFilePath);
                return res.status(200).json(responseStatus);
              } else {
                return res.status(500).json({ message: "Fine-tuning failed" });
              }
            }
          } catch (error) {
            console.error("Error retrieving job status:", error.message);
          }
        };

        // Poll the job status every 60 seconds
        const polling = setInterval(() => checkJobStatus(), 60000);
      } catch (error) {
        console.error("Error during fine-tuning process:", error.message);
        res
          .status(500)
          .json({ error: "Internal Server Error", details: error.message });
      }
    };

    fineTuneModel();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
