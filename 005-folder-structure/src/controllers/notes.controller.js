import noteModel from "../models/notes.model.js";


export async function createNote(req, res) {

    const { title, description } = req.body;

    const note = await noteModel.create({ title, description });

    return res.status(201).json({ message: "Note created successfully", note });
}