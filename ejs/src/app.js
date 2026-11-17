import express from "express"
import morgan from "morgan"
import path from "path"

const app = express()


app.use(morgan("dev"))
app.use(express.json())

// –––––––––––––––––––––––– EJS setup ––––––––––––––––––––––––
app.set("view engine", "ejs")
app.set("views", path.join(path.resolve(), "views"))



app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok"
    })
})

app.use(express.static(path.join(path.resolve(), "public")))

app.get("/", (req, res) => {
    res.render("index")
})


export default app