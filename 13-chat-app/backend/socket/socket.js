import {Server} from "socket.io"
import http from "http";

import express from "express"
const app = express();

const server = http.createServer(app);
const io = new Server(server);

export const getRecieverSocketID = (receiverID) => {
    return userSocketMap[receiverID]
}
// {userID : socketID}
const userSocketMap = new Map() 

// socket has various properties like id etc
io.on('connect', (socket) => {
    console.log("A User Is Connected", socket.id);

    // got into the query which is on the frontend
    const userID = socket.handshake.query.userID;
    if(userID != "undefined") userSocketMap[userID]
    // tp send events tp all connected users
    io.emit('getOnlineUsers', Object.keys(userSocketMap))

    // socket.on() is used to listen to the events, it is used both for front and server-side
    socket.on('disconnect', () => {
        console.log("A User Was Disconnected");
        delete userSocketMap[userID];
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })

    

});



export {app, server, io};


