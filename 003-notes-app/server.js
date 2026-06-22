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
app.post("/api/notes", (req, res) => {
    const data = req.body
    notes.push(data)

    res.status(201).json({
        message: "Note created successfully",
        note: data
    })
})


app.get("/api/notes", (req, res) => {
    res.status(200).json({
        message: "Notes fetched successfully",
        notes: notes
    })
})


/**
 * DELETE /api/notes/0
 * DELETE /api/notes/1
 * DELETE /api/notes/2
 * DELETE /api/notes/3
 */
app.delete("/api/notes/:index", (req, res) => {
    const index = req.params.index
    notes.splice(index, 1)
    res.status(200).json({
        message: "Note deleted successfully"
    })
})


app.patch("/api/notes/:index", (req, res) => {
    const index = req.params.index
    const { description } = req.body

    notes[ index ].description = description

    res.status(200).json({
        message: "Note updated successfully",
        note: notes[ index ]
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})