const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { Configuration, OpenAI } = require("openai");
const BioData = require("../model/bioData");
const ModelList = require("../model/modelList");
const AllInformation = require("../model/allInformation");
const path = require("path");
const fs = require("fs");
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
    const latestModel = await ModelList.findOne({
      name: "BioWriter",
    }).sort({ createdAt: -1 });
    const model = latestModel
      ? latestModel.model
      : "ft:gpt-3.5-turbo-0125:cache-labs-llc:bio-writer:9DGBBLCC";
    console.log(model, 123);
    const response = await openai.chat.completions.create({
      // model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:article-writer:8zrkDK1q", // You may need to adjust the engine version
      // model: "ft:gpt-3.5-turbo-0125:cache-labs-llc:bio-writer:9A9R9krl",
      // "ft:gpt-3.5-turbo-0125:cache-labs-llc:bio-writer:9DGBBLCC",;atest model in use
      model: model,
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

module.exports.addData = async (req, res) => {
  try {
    const { question, answer } = req.body;
    // console.log(question, answer);
    const bio = new BioData({
      messages: [
        { role: "system" },
        { role: "user", content: question },
        { role: "assistant", content: answer },
      ],
    });
    await bio.save();
    res.status(201).json({ message: "Data added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Model training for feedback system implementation
const download = async () => {
  const bioData = await BioData.find().lean();

  // Remove the _id field from each document

  const bioDataWithoutId = bioData.map((doc) => {
    const { _id, __v, ...rest } = doc;
    const messagesWithoutId = rest.messages.map(
      ({ _id, ...messageRest }) => messageRest
    );
    return { ...rest, messages: messagesWithoutId };
  });

  // Check if there's any data
  if (!bioDataWithoutId || bioDataWithoutId.length === 0) {
    throw new Error("No chat data found");
  }

  // Convert the data to a JSON string
  const jsonData = JSON.stringify(bioDataWithoutId, null, 2);

  const dataDir = path.join(__dirname, "../data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  const filePath = path.join(dataDir, "bioData.json");

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
  const outputFilePath = path.join(path.dirname(filePath), "bioData.jsonl");

  // Write the JSONL data to a new file
  fs.writeFileSync(outputFilePath, jsonlData, "utf8");

  console.log(`JSONL file has been created successfully at ${outputFilePath}`);

  return outputFilePath; // Return the path of the saved JSONL file
};

module.exports.fineTune = async (req, res) => {
  const { currentLength } = req.body;
  try {
    const filePath = await download();
    const Path = path.join(__dirname, "../data/bioData.json");
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
                  name: "BioWriter",
                  model: fineTunedModel,
                });
                await newModel.save();
                await AllInformation.updateOne(
                  { modelName: "biowriterdatas" },
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
