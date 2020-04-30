import express from 'express';
import socket from 'socket.io'
import http from 'http'
import * as bodyParser from 'body-parser';
import { Routes } from "./config/routes";

class App {
  public app: express.Application
  public server: http.Server
  public io: socket.Server
  public routePrv: Routes = new Routes()

  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.io = socket(this.server) // Attach socket.io to our server

    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App()