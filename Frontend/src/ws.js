import {io} from "socket.io-client"

export default function connectWS(){
    return io('http://localhost:3000');
}