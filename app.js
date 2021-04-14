const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);


const outputWindows = () => {
    app.use(express.static("public"));

    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
        socket.on("chat message", (msg) => {
            console.log(msg);
            io.emit("chat message", msg);
        });

        socket.on("list-consoles", (msg) => {
            console.log("Asked for a list of consoles");
        })
    });

    server.listen(3000, () => {
        console.log("listening on *:3000");
    });

}

module.exports = outputWindows;

class MultiConsole{
    constructor(){
        
    }
}


module.exports.Console = MultiConsole;