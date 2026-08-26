import { tavily } from "@tavily/core"
import dotenv from "dotenv"

dotenv.config()

const tvly = tavily({
    apiKey: process.env.TAVILY_API_KEY,
})

async function searchInternet({ query }) {

    const response = await tvly.search(query)

    const finalResult = response.results.map((item) => {
        return item.content
    }).join("\n\n\n")

    return finalResult
}

export { searchInternet }