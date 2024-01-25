const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "/config.env" });
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

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
