const express = require("express");
const socket = require("socket.io");
const http = require("http");
const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(__dirname + "/"));

app.get("/",(req, res) => {
    res.sendFile(__dirname + "/index.html");
})

const peers = io.of("/notify");

peers.on("connection", (socket) => {


    socket.on("disconnect", (data) => {
        console.log("disconnect")
    })

    socket.on("sendnotification" , (data) => {
        console.log(data);
        socket.broadcast.emit("recieve", data)
    })
})

server.listen(PORT);