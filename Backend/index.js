const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require("path");
const db = process.env.DATABASE;
console.log(db);
mongoose
  .connect(db)
  .then((con) => {
    console.log("Database connected successfully!!");
  })
  .catch((err) => {
    console.log("Error connecting the database!!", err);
  });

app.use(cors());
app.use(express.json());

const openaiRouter = require("./router/openaiRouter");
const chatbotRouter = require("./router/chatbotRouter");
app.use("/api/v1/ArticelWriter", openaiRouter);
app.use("/api/v1/chatbot", chatbotRouter);

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

const PORT = process.env.PORT;
app.listen(PORT || 8000, () => {
  console.log(`Port running on ${PORT}`);
});
