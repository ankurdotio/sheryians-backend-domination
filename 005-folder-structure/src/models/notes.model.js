import mongoose from "mongoose"

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})

const noteModel = mongoose.model("notes", notesSchema)


export default noteModel