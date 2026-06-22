/**
 * server ko listen krwna
 * database se connect krna
 */


import app from "./src/app.js";
import connectToDB from "./src/config/db.js";

connectToDB();

app.listen(3000, () => {
    console.log("server is running on port 3000");
})