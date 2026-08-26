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

const userInput = await rl.question("You: ");

messages.push(new HumanMessage(userInput));

const response = await agent.invoke({
    messages
});

console.log(response);


rl.close();
