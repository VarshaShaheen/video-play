
const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)


const WebSocket = require("ws");
const wss = new WebSocket.Server({port: 8083});

wss.on('connection', function connection(ws) {
    console.log("CONNECTED")
    ws.on('message', function message(data, isBinary) {
        console.log(data)
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
});


app.get("/1", (req, res)=>{
    res.sendFile(__dirname + '/play1.html');
})

app.get("/2", (req, res)=>{
    res.sendFile(__dirname + '/play2.html');
})

app.get("/3", (req, res)=>{
    res.sendFile(__dirname + '/play3.html');
})

app.use(express.static("public"))

server.listen(3000, ()=>{
    console.log("Started on 3000")
})
