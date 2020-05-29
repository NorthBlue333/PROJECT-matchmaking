import { app } from './app'
import { createServer } from 'http'
import { Server } from 'colyseus'
import { monitor } from '@colyseus/monitor'
import { GameRoom } from './room/game'
import { database } from './config/database'
;(async () => {
  // await database.sync()
  await database.sync({ force: true })

  const PORT = Number(process.env.PORT) || 3000

  const gameServer = new Server({
    server: createServer(app),
    express: app,
  })

  gameServer.define('game_room', GameRoom)

  app.use('/colyseus', monitor())

  await gameServer.listen(PORT)

  console.log('GameServer listen on ws://localhost:' + PORT)
})()
