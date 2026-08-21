import dotenv from "dotenv";
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage, AIMessage, SystemMessage, tool, createAgent, AIMessageChunk } from "langchain"
import { searchInternet } from "./internet.service.js"
import * as z from "zod"

dotenv.config();


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})



const searchTool = tool(searchInternet, {
    name: "searchInternet",
    description: "Search the internet for information. Input should be a string query.",
    schema: z.object({
        query: z.string().describe("The search query string")
    })
})


const model = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

const agent = createAgent({
    model,
    tools: [ searchTool ],
})

const messages = [
    new SystemMessage(`
        Your name is Ally.
        
        current date: ${new Date().toISOString().split("T")[ 0 ]}
        `)
]

while (true) {

    const userInput = await rl.question("You: ");

    if (userInput.toLocaleLowerCase() === "exit") {
        break;
    }

    messages.push(new HumanMessage(userInput));

    const stream = await agent.stream({
        messages
    }, {
        streamMode: "messages"
    });

    let aiResponse = ""

    for await (const [ chunk, metadata ] of stream) {

        if (!(chunk instanceof AIMessageChunk)) {
            continue;
        }

        aiResponse += chunk.text;

        process.stdout.write(chunk.text);
    }

    process.stdout.write("\n");

    messages.push(new AIMessage(aiResponse));
}




rl.close();
