import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {generateCodingTestQuestions}  from "./generate.js";

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

app.post("/generate", async (req, res) => {
  const topic = req.body.topic;
  const difficulty = req.body.difficulty;

  try {
    const questions = await generateCodingTestQuestions(topic, difficulty);
    console.log(questions)
    res.status(200).json({ questions });
  } catch (e) {
    res.status(500).json({ e });
  } 
});

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
