const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
var cors = require("cors");

const app = express();
const PORT = 3000;

const scoreController = require("./controllers/scoreController.js");

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/", express.static(path.resolve(__dirname, "../dist")));

app.get("/", (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "../dist/index.html"));
});

app.post(
  "/sendscore",
  scoreController.addScore,
  (req, res) => {
    return res.status(200).json(res.locals.record);
  }
);

app.get(
  "/getscore",
  scoreController.getScore,
  (req, res) => {
    return res.status(200).json(res.locals.score);
  }
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`...listening on port ${PORT}`);
});
