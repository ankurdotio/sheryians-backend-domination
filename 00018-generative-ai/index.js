import dotenv from "dotenv";
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai"

dotenv.config();


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const model = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: process.env.MISTRAL_API_KEY
})


while (true) {

    const userInput = await rl.question("You: ");

    const response = await model.invoke(userInput);

    console.log("MistralAI: ", response.content);
}




rl.close();
