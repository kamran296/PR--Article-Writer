const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "/config.env" });
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.json());

// const db = process.env.DBURL;
// mongoose
//   .connect(db, {
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Database Connected Successfully!!");
//   });

const openaiRouter = require("./router/openaiRouter");

app.use("/api/v1/ArticelWriter", openaiRouter);

const PORT = process.env.PORT;
app.listen(PORT || 8000, () => {
  console.log(`Port running on ${PORT}`);
});
