const AllInformation = require("../model/allInformation");
const axios = require("axios");
const Article = require("../model/articleData");
const Chatbot = require("../model/chatbotData");
const LoaOriginal = require("../model/loaOrgData");
const LoaCritical = require("../model/loaCriticalData");
const LoaResearch = require("../model/loaPaperData");
const Lor = require("../model/lorData");
const BioData = require("../model/bioData");

// Create a new entry
module.exports.createEntry = async (req, res) => {
  try {
    const { modelName, previousLength, currentLength } = req.body;
    const newEntry = new AllInformation({
      modelName,
      previousLength,
      currentLength,
    });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all entries
module.exports.getAllEntries = async (req, res) => {
  try {
    const entries = await AllInformation.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    let data = await AllInformation.find();
    let currArticle = await Article.countDocuments();
    let currLor = await Lor.countDocuments();
    let currBio = await BioData.countDocuments();
    let currLoaOrg = await LoaOriginal.countDocuments();
    let currLoaResearch = await LoaResearch.countDocuments();
    let currLoaCritical = await LoaCritical.countDocuments();
    let currChatbot = await Chatbot.countDocuments();

    const modelCounts = {
      articles: currArticle,
      lordatas: currLor,
      biowriterdatas: currBio,
      loaoriginals: currLoaOrg,
      loaresearches: currLoaResearch,
      loacriticals: currLoaCritical,
      chats: currChatbot,
    };

    for (let entry of data) {
      entry.currentLength = modelCounts[entry.modelName];
      await entry.save();
    }

    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json("Error occured while getting the data");
  }
};
