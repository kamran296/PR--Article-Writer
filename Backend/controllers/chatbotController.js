const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Chat = require("../model/chatbotData");
const { Configuration, OpenAI } = require("openai");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
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

const download = async (req, res) => {
  //  Fetch all chat data from the database, converting to plain JavaScript objects
  const chatData = await Chat.find().lean();

  // Remove the _id field from each document
  const chatDataWithoutId = chatData.map(({ _id, ...rest }) => rest);

  // Check if there's any data
  if (!chatDataWithoutId || chatDataWithoutId.length === 0) {
    return res.status(404).json({ message: "No chat data found" });
  }

  // Convert the data to a JSON string
  const jsonData = JSON.stringify(chatDataWithoutId, null, 2);

  // Ensure the data directory exists
  const dataDir = path.join(__dirname, "../data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  // Define the file path and name
  const filePath = path.join(dataDir, "chatData6.json");

  // Write the JSON data to a file
  fs.writeFileSync(filePath, jsonData, "utf-8");
};
// module.exports.downloadDatabase = async (req, res) => {
//   try {
//     setTimeout(() => {
//       download();
//     }, 6000);
//     exec("python training.py", (error, stdout, stderr) => {
//       if (error) {
//         console.error(`exec error: ${error}`);
//         return res.status(500).send(`Error: ${error.message}`);
//       }
//       if (stderr) {
//         console.error(`stderr: ${stderr}`);
//         return res.status(500).send(`Stderr: ${stderr}`);
//       }
//       console.log(`stdout: ${stdout}`);
//       res.send(`Output: ${stdout}`);
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error", error });
//   }
// };
// 
module.exports.downloadDatabase = async (req, res) => {
  try {
    setTimeout(() => {
      download();
    }, 6000);

    const fineTuneModel = async () => {
      try {
        // Upload training file
        const jsonFilePath = path.join(__dirname, "../data/chatData7.jsonl");
        const fileStream = fs.createReadStream(jsonFilePath);
        const trainingFile = await openai.files.create({
          file: fileStream,
          purpose: "fine-tune",
        });

        console.log(`Training file ID: ${trainingFile.id}`);

        // Create fine-tuning job
        const response = await openai.fineTuning.jobs.create({
          training_file: trainingFile.id,
          model: "gpt-3.5-turbo",
          suffix: "ChatBotFaq20190624",
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
              res.status(200).json(responseStatus);
            }
          } catch (error) {
            console.error("Error retrieving job status:", error.message);
          }
        };

        // Poll the job status every 60 seconds
        const polling = setInterval(() => checkJobStatus(), 60000);
        
        // const checkJobStatus = async () => {
        //   try {
        //     const responseStatus = await openai.fineTuning.jobs.retrieve(jobId);
        //     console.log(`Current job status: ${responseStatus.status}`);
        
        //     if (responseStatus.status === "succeeded") {
        //       clearInterval(polling);
        //       res.status(200).json(responseStatus);
        //     }
        //     // If status is "failed", the function does nothing and continues to check every 60 seconds
        //   } catch (error) {
        //     console.error("Error retrieving job status:", error.message);
        //   }
        // };
        
        // // Poll the job status every 60 seconds
        // const polling = setInterval(() => checkJobStatus(), 60000);
        

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
}
