const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { Configuration, OpenAI } = require("openai");
const ClientChatbot = require("../model/clientChatbot");
const ModelList = require("../model/modelList");
const AllInformation = require("../model/allInformation");
const fs = require("fs");
const path = require("path");

const openai = new OpenAI({
  apiKey: process.env.API,
});

exports.clientChat = async (req, res) => {
  const prompt = req.body.chat;
  console.log(req.body, 432);
  try {
    if (typeof prompt !== "string") {
      return res.status(400).json({ error: "Invalid input prompt" });
    }

    const latestModel = await ModelList.findOne({
      name: "ClientChatbot",
    }).sort({ createdAt: -1 });
    const model = latestModel
      ? latestModel.model
      : "ft:gpt-3.5-turbo-0125:cache-labs-llc:vipsupportbot:9pA8cGEl";
    console.log(model, 123);

    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. Answer the user's questions accurately based on the provided data.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 800,
      temperature: 0.1,
    });
    console.log(response.choices[0]);
    const answer = response.choices[0].message.content;
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.addData = async (req, res) => {
  try {
    const { question, answer } = req.body;
    // console.log(question, answer);
    const chat = new ClientChatbot({
      messages: [
        { role: "system" },
        { role: "user", content: question },
        { role: "assistant", content: answer },
      ],
    });
    await chat.save();
    res.status(201).json({ message: "Data added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Model training for feedback system implementation
const download = async () => {
  const clientChatbotData = await ClientChatbot.find().lean();

  // Remove the _id field from each document

  const clientChatbotDataWithoutId = clientChatbotData.map((doc) => {
    const { _id, __v, ...rest } = doc;
    const messagesWithoutId = rest.messages.map(
      ({ _id, ...messageRest }) => messageRest
    );
    return { ...rest, messages: messagesWithoutId };
  });

  // Check if there's any data
  if (!clientChatbotDataWithoutId || clientChatbotDataWithoutId.length === 0) {
    throw new Error("No chat data found");
  }

  // Convert the data to a JSON string
  const jsonData = JSON.stringify(clientChatbotDataWithoutId, null, 2);

  const dataDir = path.join(__dirname, "../data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  const filePath = path.join(dataDir, "clientChatbotData.json");

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
  const outputFilePath = path.join(
    path.dirname(filePath),
    "clientChatbotData.jsonl"
  );

  // Write the JSONL data to a new file
  fs.writeFileSync(outputFilePath, jsonlData, "utf8");

  console.log(`JSONL file has been created successfully at ${outputFilePath}`);

  return outputFilePath; // Return the path of the saved JSONL file
};

module.exports.fineTune = async (req, res) => {
  const { currentLength } = req.body;
  try {
    const filePath = await download();
    const Path = path.join(__dirname, "../data/clientChatbotData.json");
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
          suffix: "NewClientChatbot",
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
                const newModel = new ModelList({
                  name: "ClientChatbot",
                  model: fineTunedModel,
                });
                await newModel.save();
                await AllInformation.updateOne(
                  { modelName: "clientchatbots" },
                  { previousLength: currentLength }
                );
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
