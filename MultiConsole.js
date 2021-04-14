const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const open = require("open");
const uuid = require("uuid").v4;

let app;
let server;
let io;

let config = {
    port: 3000,
    openInBrowser: true
}

const allConsoles = [];

class MultiConsole {
    id = null;

    constructor(id) {
        if (server === undefined) {
            this.initConsoles();
        }
        this.id = id || uuid();
        allConsoles.push({
            id: this.id,
            logs: []
        });
    }

    initConsoles() {
        app = express();
        server = http.createServer(app);
        io = socketio(server);


        io.on("connection", (socket) => {
            socket.on("disconnect", () => {
            });
            socket.on("list-consoles", (msg) => {
                io.emit("allConsoles", allConsoles)
            })
        })

        app.use(express.static("public"));

        server.listen(config.port);

        if(config.openInBrowser){
            open("http://localhost:"+config.port)
        }
    }

    getId(){
        return this.id;
    }

    log(msg) {
        this.sendLog(msg, "log")
    }

    success(msg) {
        this.sendLog(msg, "success")
    }

    info(msg) {
        this.sendLog(msg, "info")
    }

    error(msg) {
        this.sendLog(msg, "error")
    }

    warning(msg) {
        this.sendLog(msg, "warning");
    }

    sendLog(msg, type) {
        const mConsole = allConsoles.find(mConsole => mConsole.id === this.id);

        mConsole.logs.push({
            data: msg,
            type
        });

        io.emit("log", {
            id: this.id,
            data: msg,
            type
        });
    }

    clear() {
        const mConsole = allConsoles.find(mConsole => mConsole.id === this.id);
        mConsole.logs.length = 0;
        io.emit("clear", { id: this.id })
    }



}

module.exports = MultiConsole;

module.exports.config = (mConfig) => {
    config = {...config, ...mConfig}
}

module.exports.openBrowser = () => {
    open("http://localhost:"+config.port);
}