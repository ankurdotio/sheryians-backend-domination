import dotenv from "dotenv";
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage, AIMessage } from "langchain"

dotenv.config();


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const model = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

const messages = []

while (true) {

    const userInput = await rl.question("You: ");

    if (userInput.toLocaleLowerCase() === "exit") {
        break;
    }

    messages.push(new HumanMessage(userInput));

    const stream = await model.stream(messages);

    let aiResponse = ""

    for await (const chunk of stream) {
        aiResponse += chunk.text;
        process.stdout.write(chunk.text);
    }

    process.stdout.write("\n");

    messages.push(new AIMessage(aiResponse));
}




rl.close();
