import {app} from '../app'
import { Request, Response } from "express";
import listEndpoints from 'express-list-endpoints'
import e from 'express'

export class ApiController {

  public async find(req: Request, res: Response) {
    const routes = listEndpoints(app as e.Express)
    res.json(routes)
  }


}

