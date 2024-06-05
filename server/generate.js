import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function generateCodingTestQuestions(topic, difficultyLevel) {
  const prompt = `
    Scrap 5 coding questions from leetcode depending on the provided question level in JSON format for the following:
    
    **Topic:** ${topic}
    **Difficulty:** ${
      difficultyLevel.charAt(0).toUpperCase() + difficultyLevel.slice(1)
    }

    Each JSON should include:

    *title: A short simple name of the question 
    *problem_statement: A clear long description which completely explains the coding problem like leetcode does, also provide an example.
    *expected_input: An example of input data for the problem
    *expected_output: The expected output for the provided input

    **Example:**

    {
        "title":"Two Sum",
        "problem_statement": "Write a function that reverse an string",
        "expected_input": "\\"Hello, world!\\"",
        "expected_output": "!dlrow ,olleH"
    }
    `;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1500,
      n: 1,
    });

    const message = res.choices[0].message.content;

    console.log(message);

    //parsing the questions
    const questions = parseQuestions(message);
    return questions;
  } catch (error) {
    throw new Error(`Error while generating questions: ${error.message}`);
  }
}

function parseQuestions(response) {
  const questions = [];
  const regex = /{[^}]*}/g;
  let match;

  while ((match = regex.exec(response)) !== null) {
    try {
      const questionJson = JSON.parse(match[0]);
      if (
        [
          "title",
          "problem_statement",
          "expected_input",
          "expected_output",
        ].every((key) => key in questionJson)
      ) {
        questions.push(questionJson);
      }
    } catch (error) {
      console.error(
        "Failed to parse the response as valid JSON.",
        error
      );
    }
  }

  if (questions.length === 0) {
    throw new Error("No valid questions found in the AI response.");
  }

  return questions;
}
