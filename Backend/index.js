const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const axios = require("axios"); // Import axios for HTTP requests

const authRouter = require("./router/auth");
const openaiRouter = require("./router/openaiRouter");
const chatbotRouter = require("./router/chatbotRouter");
const loaRouter = require("./router/loaRouter");
const bioRouter = require("./router/bioRouter");
const lorRouter = require("./router/lorRouter");
const nicheRouter = require("./router/nicheRouter");
const allInfoRouter = require("./router/allinformation");
const clientChatbotRouter = require("./router/clientChatbot ");
const AllInformation = require("./model/allInformation");
const indeedRoutes = require("./router/REA/indeedRoutes");
const salaryRoutes = require("./router/REA/salaryRoutes");
const talentRoutes = require("./router/REA/talentRoutes");
const aggregatorRoutes = require("./router/REA/aggregatorRoutes");
const monsterRoutes = require("./router/REA/monsterRoutes");
const levelsRoutes = require("./router/REA/levelsRoutes");
const socRoutes = require("./router/REA/socRoutes");
const glassdoorRoutes = require("./router/REA/glassdoorRoutes");

// Import your data models
const LorData = require("./model/lorData");
const ArticleData = require("./model/articleData");
const LoaCriticalData = require("./model/loaCriticalData");
const BioData = require("./model/bioData");
const LoaOrgData = require("./model/loaOrgData");
const LoaPaperData = require("./model/loaPaperData");
const ChatbotData = require("./model/chatbotData");
const NicheData = require("./model/niche");
const ClientChatbot = require("./model/clientChatbot");
const app = express();

const db = process.env.DB_PRODUCTION;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully!");
    // Start periodic checking after database connection is established
    startPeriodicChecking();
  })
  .catch((err) => {
    console.log("Error connecting to the database!", err);
  });

// Middleware order
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: "https://www.internal.cachelabs.io", // Adjust this to match your frontend URL
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
};

app.use(cors());

app.use(
  session({
    secret: "1234wpskdm5678",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Ensure this file correctly sets up your Passport strategies
require("./passport");

// Routes
app.use("/oauth", authRouter);
app.use("/api/v1/ArticleWriter", openaiRouter);
app.use("/api/v1/chatbot", chatbotRouter);
app.use("/api/v1/loa", loaRouter);
app.use("/api/v1/bio", bioRouter);
app.use("/api/v1/lor", lorRouter);
app.use("/api/v1/allInfo", allInfoRouter);
app.use("/api/v1/niche", nicheRouter);
app.use("/api/v1/client-chatbot", clientChatbotRouter);
app.use("/api/indeed", indeedRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/talent", talentRoutes);
app.use("/api/aggregator", aggregatorRoutes);
app.use("/api/monster", monsterRoutes);
app.use("/api/levels", levelsRoutes);
app.use("/api/soc", socRoutes);
app.use("/api/glassdoor", glassdoorRoutes);
// Static files
const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../frontend/dist");
app.use(express.static(buildPath));

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});

// Function to start periodic checking
function startPeriodicChecking() {
  // Run the checkModels function every 24 hours
  console.log("Starting periodic checking...");
  setInterval(checkModels, 24 * 60 * 60 * 1000);
  // Initial run immediately after server starts
  checkModels();
}

// Function to check models and trigger fine-tuning API if necessary
async function checkModels() {
  try {
    console.log("Checking models...");
    const models = await AllInformation.find({}); // Retrieve all models from the database

    for (let model of models) {
      const modelName = model.modelName;
      console.log(`Checking model: ${modelName}`);
      let currentLength = 0;

      // Determine the current length of the specific collection
      if (modelName === "lordatas") {
        currentLength = await LorData.countDocuments();
      } else if (modelName === "articles") {
        currentLength = await ArticleData.countDocuments();
      } else if (modelName === "biowriterdatas") {
        currentLength = await BioData.countDocuments();
      } else if (modelName === "loacriticals") {
        currentLength = await LoaCriticalData.countDocuments();
      } else if (modelName === "loaoriginals") {
        currentLength = await LoaOrgData.countDocuments();
      } else if (modelName === "loaresearches") {
        currentLength = await LoaPaperData.countDocuments();
      } else if (modelName === "chats") {
        currentLength = await ChatbotData.countDocuments();
      } else if (modelName === "nichedatas") {
        currentLength = await NicheData.countDocuments();
      } else if (modelName === "clientchatbots") {
        currentLength = await ClientChatbot.countDocuments();
      } else {
        console.warn(`Unknown model: ${modelName}`);
        continue;
      }

      const previousLength = model.previousLength; // Assuming previousLength is the previous length

      if (currentLength > previousLength + 100) {
        // Trigger fine-tuning process
        await triggerFineTuning(modelName, currentLength);
        // Update previousLength in allInformation model
        // await AllInformation.updateOne(
        //   { modelName: modelName },
        //   { previousLength: currentLength }
        // );
      }
    }
  } catch (error) {
    console.error("Error checking models:", error);
  }
}

// Function to trigger fine-tuning API
async function triggerFineTuning(modelName, currentLength) {
  try {
    let host = "";

    if (modelName === "articles") {
      host = "https://www.internal.cachelabs.io/api/v1/lor/fine-tune";
    } else if (modelName === "biowriterdatas") {
      host = "https://www.internal.cachelabs.io/api/v1/bio/fine-tune";
    } else if (modelName === "loacriticals") {
      host = "https://www.internal.cachelabs.io/api/v1/loa/critical-finetune";
    } else if (modelName === "loaoriginals") {
      host = "https://www.internal.cachelabs.io/api/v1/loa/original-finetune";
    } else if (modelName === "loaresearches") {
      host = "https://www.internal.cachelabs.io/api/v1/loa/research-finetune";
    } else if (modelName === "chats") {
      host = "https://www.internal.cachelabs.io/api/v1/chatbot/fine-tune";
    } else if (modelName === "lordatas") {
      host = "https://www.internal.cachelabs.io/api/v1/lor/fine-tune";
    } else if (modelName === "nichedatas") {
      host = "https://www.internal.cachelabs.io/api/v1/niche/fine-tune";
    } else if (modelName === "clientchatbots") {
      host =
        "https://www.internal.cachelabs.io/api/v1/client-chatbot/fine-tune";
    }

    console.log(`Triggering fine-tuning for ${modelName}`);
    const response = await axios.post(`${host}`, { currentLength });
    console.log(`Fine-tuning started for ${modelName}:`, response.data);
  } catch (error) {
    console.error(`Error triggering fine-tuning for ${modelName}:`, error);
  }
}
