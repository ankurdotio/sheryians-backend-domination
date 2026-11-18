import express from "express"
import morgan from "morgan"
import path from "path"

const app = express()


app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// ––––––––––––––––––––––– notes array –––––––––––––––––––––––
const notes = []

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
    res.render("index", { notes })
})

app.get("/create", (req, res) => {
    res.render("create-notes")
})


app.post("/create", (req, res) => {

    const { title, content } = req.body

    notes.push({ title, content })

    res.redirect('/')
})

app.get("/notes/delete/:index", (req, res) => {
    const { index } = req.params
    notes.splice(index, 1)
    res.redirect('/')
})

/**
 * <%=  %>
 * <% %>
 * <%# %>
 * <%- %>
 */


export default app