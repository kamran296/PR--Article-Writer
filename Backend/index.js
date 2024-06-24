const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const authRouter = require("./router/auth");
const openaiRouter = require("./router/openaiRouter");
const chatbotRouter = require("./router/chatbotRouter");

const app = express();

const db = process.env.DB_PRODUCTION;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.log("Error connecting to the database!", err);
  });

// Middleware order
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173", // Adjust this to match your frontend URL
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
