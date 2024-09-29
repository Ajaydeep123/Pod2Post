// import { ChatOpenAI } from "@langchain/openai";

import { ChatGroq } from "@langchain/groq";


// export const gptModal = new ChatOpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   model: "gpt-4o-mini",
//   temperature: 0.3,
//   streaming: true,
//   maxTokens: 16000,
// });

export const groqModal = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model:"llama-3.1-70b-versatile",
  temperature: 0.3,
  streaming: true,
  maxTokens: 8000,
})