import express from 'express';
import {createServer} from 'node:http'
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req,res) => {
    res.send(`<h1> Hello Parth </h1>`);
})

io.on("connection", (socket) => {
    console.log('a user connected')
})

server.listen(3000, ()=>{
    console.log("Server is Running on 3000");
})