import express from 'express'
import socket from 'socket.io'
import http from 'http'
import path from 'path'
import bodyParser from 'body-parser'

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

app
  .route('/users')
  .all(function (req, res, next) {
    // user middleware for all request
    next()
  })
  .get(function (req, res, next) {
    console.log('USERS::GET : ', req.query)
    res.json({
      user: {
        username: 'BLABLAsss',
        email: 'test@test.test',
      },
    })
  })
  .post(function (req, res, next) {
    console.log('USERS::POST : ', req.body)
    res.json({
      newUser: {
        username: 'test',
        email: 'nible@test.test',
      },
    })
  })

const server = http.createServer(app)
const io = socket(server) // Attach socket.io to our server

const connectedPlayers = []

io.on('connection', (socket) => {
  console.log(socket)
  // @TODO send user Info when emit intead of socket
})

server.listen(3000, () => {
  console.log('Server started ! Listen on port 3000')
})

module.exports = app
