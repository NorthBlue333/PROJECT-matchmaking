import { Request, Response } from "express";
import { Game } from "../models/game.model";
import { UpdateOptions, DestroyOptions } from "sequelize";

export class UsersController {
  public async find(req: Request, res: Response) {
    try {
      const games = await Game.findAll<Game>({include: [{all: true}]})
      res.json(games);
    } catch (err) {
      res.status(500).json(err)
    }
  }

  public async create(req: Request, res: Response) {
    const params = req.body;
    try {
      const game = await Game.create<Game>(params)
      res.status(201).json(game)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  public async findById(req: Request, res: Response) {
    const userId: number = +req.params.id;
    try {
      const game = await Game.findByPk<Game>(userId)
      if (!game) res.status(404).json({ code: 'USER_NOT_FOUND' });
      res.json(game);
    } catch (err) {
      res.status(500).json(err)
    }
  }

  public async updateById(req: Request, res: Response) {
    const nodeId: number = +req.params.id;
    const params = req.body;

    const update: UpdateOptions = {
      where: { id: nodeId },
      limit: 1
    };
    Game.update(params, update)
      .then(() => res.status(202).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }

  public delete(req: Request, res: Response) {
    const nodeId: number = +req.params.id;
    const options: DestroyOptions = {
      where: { id: nodeId },
      limit: 1
    };
    Game.destroy(options)
      .then(() => res.status(204).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }
}