import { Request, Response } from "express";
import { User, UserInterface } from "../models/user.model";
import { UpdateOptions, DestroyOptions } from "sequelize";
import { Role } from '../models/role.model'

export class UsersController {
  public async find(req: Request, res: Response) {
    try {
      const users = await User.findAll<User>({ include: [{
        model: Role,
       }]})
      res.json(users);
    } catch (err) {
      res.status(500).json(err)
    }
  }

  public async create(req: Request, res: Response) {
    const params: UserInterface = req.body;
    try {
      const user = await User.create<User>(params)
      res.status(201).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  public async findById(req: Request, res: Response) {
    const userId: number = +req.params.id;
    try {
      const user = await User.findByPk<User>(userId)
      if (!user) res.status(404).json({ code: 'USER_NOT_FOUND' });
      res.json(user);
    } catch (err) {
      res.status(500).json(err)
    }
  }

  public async updateById(req: Request, res: Response) {
    const nodeId: number = +req.params.id;
    const params: UserInterface = req.body;

    const update: UpdateOptions = {
      where: { id: nodeId },
      limit: 1
    };
    User.update(params, update)
      .then(() => res.status(202).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }

  public delete(req: Request, res: Response) {
    const nodeId: number = +req.params.id;
    const options: DestroyOptions = {
      where: { id: nodeId },
      limit: 1
    };
    User.destroy(options)
      .then(() => res.status(204).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }
}