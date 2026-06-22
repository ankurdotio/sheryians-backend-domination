import mongoose from "mongoose";


const connectToDB = async () => {

    await mongoose.connect("mongodb://localhost:27017/folder-structure")
    console.log("database connected successfully");

}

export default connectToDB;