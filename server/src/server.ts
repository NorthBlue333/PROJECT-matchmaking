import {app} from "./app";
import http from 'http'
import { Server } from 'colyseus'
import { TestRoom } from "./room/test";
import {database} from "./config/database";
import { Routes } from "./config/routes";
const PORT = process.env.PORT || 3000;

const gameServer = new Server({
  server: http.createServer(app),
  express: app
});
const routes = new Routes().routes(app)
database.sync({force: true});
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

// App.gameServer.define()
gameServer.define('test', TestRoom)
gameServer.listen(3333).then(() => console.log('GameServer listen on port 3333'));

