const http = require("http")

const server = http.createServer()

server.on("request", (req, res) => {
    const pathname = req.url

    if (pathname === "/") {
        res.write("hello backend ")
        res.end()
        return
    }

    if (pathname === "/home") {
        res.write("home")
        res.end()
        return
    }

    res.write("404 not found")
    res.end()
})

server.listen(3000)