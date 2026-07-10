import express from 'express';
import morgan from "morgan"


const app = express();


app.use(morgan("dev"))

app.get("/api", (req, res) => {
    res.status(200).json({
        message: "Hello World"
    })
})



export default app;