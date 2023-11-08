import { DiscussServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";
import env from "./validateEnv";

const MODEL_NAME = "models/chat-bison-001";
const BARD_API_KEY = env.BARD_API_KEY;

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(BARD_API_KEY),
});

const GenerateMessage = async (
  question: string | null | undefined,
  prevChats: {
    question: string | null | undefined;
    answer: string | null | undefined;
  }[]
) => {
  const messages = [];
  if (prevChats.length > 0) {
    for (let i = 0; i < prevChats.length; i++) {
      messages.push(
        { content: prevChats[i].question },
        { content: prevChats[i].answer }
      );
    }
  }
  messages.push({ content: question });
  const result = await client.generateMessage({
    model: MODEL_NAME, // Required. The model to use to generate the result.
    temperature: 0.5, // Optional. Value `0.0` always uses the highest-probability result.
    candidateCount: 1, // Optional. The number of candidate results to generate.
    prompt: {
      // optional, preamble context to prime responses
      context: "Respond to all questions with a rhyming poem.",
      // Optional. Examples for further fine-tuning of responses.
      examples: [
        {
          input: { content: "What is the capital of California?" },
          output: {
            content: `If the capital of California is what you seek,
Sacramento is where you ought to peek.`,
          },
        },
      ],
      // Required. Alternating prompt/response messages.
      messages,
    },
  });

  if (result[0]?.candidates) {
    // console.log(result[0]?.candidates[0].content);
    // messages.push({ content: result[0]?.candidates[0].content });
    return result[0]?.candidates[0].content;
  }
};

export default GenerateMessage;
