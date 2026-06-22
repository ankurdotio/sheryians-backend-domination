import express from "express";
import mongoose from "mongoose";
import noteModel from "./models/note.model.js";


const app = express();
app.use(express.json());

async function connectToDb() {
    await mongoose.connect("mongodb://localhost:27017/notesdb")
    console.log("Connected to MongoDB");
}

connectToDb()

app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body;
    await noteModel.create({ title, description })
    res.status(201).json({ message: "Note created successfully" });
})

app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find()
    res.status(200).json({
        message: "Notes retrieved successfully",
        data: notes
    });
})

app.delete("/api/notes/:id", async (req, res) => {
    const { id } = req.params;

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully"
    })
})

app.patch("/api/notes/:id", async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    await noteModel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        message: "Note updated successfully"
    })
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})