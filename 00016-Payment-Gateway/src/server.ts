import app from "./app/app.js";
import { connectToDatabase } from "./config/db.js";



await connectToDatabase();



app.listen(3000, () => {
    console.log("Server is running on port 3000");
})