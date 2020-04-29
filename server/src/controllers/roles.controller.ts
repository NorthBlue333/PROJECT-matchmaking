import { Request, Response } from "express";
import { Role, RoleInterface } from "../models/role.model";
import { UpdateOptions, DestroyOptions } from "sequelize";
import { User } from "../models/user.model";

export class RolesController {
  public async find(req: Request, res: Response) {
    try {
      const roles = await Role.findAll<Role>({})
      res.json(roles)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  public async create(req: Request, res: Response) {
    const params: RoleInterface = req.body;
    try {
      const role = await Role.create<Role>(params)
      res.status(201).json(role)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  public async findById(req: Request, res: Response) {
    const roleId: number = +req.params.id;
    try {
      const role = await Role.findByPk<Role>(roleId)
      if (!role) res.status(404).json({ code: 'ROLE_NOT_FOUND' });
      res.json(role);
    } catch (err) {
      res.status(500).json(err)
    }
  }

  public updateById(req: Request, res: Response) {
    const nodeId: number = +req.params.id;
    const params: RoleInterface = req.body;

    const update: UpdateOptions = {
      where: { id: nodeId },
      limit: 1
    };
    Role.update(params, update)
      .then(() => res.status(202).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }

  public delete(req: Request, res: Response) {
    const nodeId: number = +req.params.id;
    const options: DestroyOptions = {
      where: { id: nodeId },
      limit: 1
    };
    Role.destroy(options)
      .then(() => res.status(204).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }
}