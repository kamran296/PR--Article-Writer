const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { Configuration, OpenAI } = require("openai");
const path = require("path");
const fs = require("fs");
const ModelList = require("../model/modelList");
const loaCritical = require("../model/loaCriticalData");
const openai = new OpenAI({
  apiKey: process.env.API,
});
module.exports.loaFormCritical = async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData, 1234);
    const role = formData.typeOfLOA;
    let prompt = "";

    prompt = `Generate a Letter of Appreciation in 500 words for ${formData.recipientName} from ${formData.recipientOrganization} received from ${formData.senderName}. 
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

    // model selection
    const latestModel = await ModelList.findOne({
      name: "CriticalLoa",
    }).sort({ createdAt: -1 });

    const model = latestModel
      ? latestModel.model
      : "ft:gpt-3.5-turbo-0125:cache-labs-llc:article-writer:9460S2UQ";
    console.log(model, 123);

    const response = await openai.chat.completions.create({
      // model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:article-writer:8zrkDK1q", // You may need to adjust the engine version
      model: model,
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

module.exports.loaCriticalAddData = async (req, res) => {
  try {
    const { question, answer } = req.body;
    console.log(question, answer);
    const critical = new loaCritical({
      messages: [
        { role: "system" },
        { role: "user", content: question },
        { role: "assistant", content: answer },
      ],
    });
    await critical.save();
    res.status(201).json({ message: "Data added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Model training for feedback system implementation
const download = async () => {
  const criticalData = await loaCritical.find().lean();

  // Remove the _id field from each document

  const criticalDataWithoutId = criticalData.map((doc) => {
    const { _id, __v, ...rest } = doc;
    const messagesWithoutId = rest.messages.map(
      ({ _id, ...messageRest }) => messageRest
    );
    return { ...rest, messages: messagesWithoutId };
  });

  // Check if there's any data
  if (!criticalDataWithoutId || criticalDataWithoutId.length === 0) {
    throw new Error("No chat data found");
  }

  // Convert the data to a JSON string
  const jsonData = JSON.stringify(criticalDataWithoutId, null, 2);

  const dataDir = path.join(__dirname, "../data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  const filePath = path.join(dataDir, "criticalData.json");

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
    "criticalData.jsonl"
  );

  // Write the JSONL data to a new file
  fs.writeFileSync(outputFilePath, jsonlData, "utf8");

  console.log(`JSONL file has been created successfully at ${outputFilePath}`);

  return outputFilePath; // Return the path of the saved JSONL file
};

module.exports.fineTune = async (req, res) => {
  try {
    const filePath = await download();
    const Path = path.join(__dirname, "../data/criticalData.json");
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
          suffix: "FeedbackTesting",
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
                  name: "CriticalLoa",
                  model: fineTunedModel,
                });
                await newModel.save();

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
