import express from "express"

const app = express()

app.use(express.json())

/**
 * * notes creation
 * * Show all notes
 * * Delete a note
 * * Update a note
 */

/**
 * notes= {
 *   title:"note title",
 *   description:"note description"
 * }
 */


const notes = []

/**
 * /api/notes = { title description }
 */
app.post("/api/notes", function (req, res) {
    const data = req.body
    notes.push(data)

    res.status(201).json({
        message: "Note created successfully",
        note: data
    })
})


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})