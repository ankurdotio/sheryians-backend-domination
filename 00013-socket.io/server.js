import app from './src/app.js';
import { createServer } from "http";
import { Server } from "socket.io";


const httpServer = createServer(app);

const io = new Server(httpServer, { /* options */ });



io.on("connection", (socket) => {
    console.log("a user connected");


    socket.on("sendMessage", elon => {
        socket.emit("receiveMessage", elon)
    })

    socket.on("disconnect", () => {
        console.log("user disconnected");
    })
});

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000")
})