const express = require('express');

const app = express(); // create server instance


app.get("/", (req, res) => {
    res.send("Hello World") // send response to client
})

app.get("/home", (req, res) => {
    res.send("Welcome to the Home Page") // send response to client
})

app.listen(3000) // start server on port 3000