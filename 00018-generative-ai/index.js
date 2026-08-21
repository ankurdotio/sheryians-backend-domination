import dotenv from "dotenv";
dotenv.config();

import { ChatMistralAI } from "@langchain/mistralai"


const model = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

const stream = await model.stream("write an essay on INDIA ")

for await (const chunk of stream) {
    process.stdout.write(chunk.content)
}
