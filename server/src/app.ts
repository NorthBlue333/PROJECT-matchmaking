import express from 'express';
import http from 'http'
import cors from 'cors'
import { Server } from 'colyseus'
import { Routes } from "./config/routes"
import { users } from './controllers/users.controller';


export const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/users', users)

// class App {
//   public app: express.Application
//   public server: http.Server
//   public gameServer: Server
//   public routePrv: Routes = new Routes()

//   constructor() {
//     this.app = express()
//     this.server = http.createServer(this.app)
//     this.gameServer = new Server({
//       server: this.server,
//       express: this.app,
//     })

//     this.config();
//     this.routePrv.routes(this.app);
//   }

//   private config(): void {
//     this.app.use(cors())
//     this.app.use(express.json())
//     this.app.use(express.urlencoded({ extended: false }));
//   }
// }
