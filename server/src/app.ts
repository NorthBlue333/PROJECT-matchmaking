import express from 'express'
import socket from 'socket.io'
import http from 'http'

const app = express()
const server = http.createServer(app);
const io = socket(server); // Attach socket.io to our server

app.use(express.static('public')); // Serve our static assets from /public

server.listen(3000, () => console.log('server started'));

io.on('connection', (socket) => {
  console.log(socket)
})