import { Request, Response } from "express";
import { Role, RoleInterface } from "../models/role.model";
import { UpdateOptions, DestroyOptions } from "sequelize";

export class RolesController {
  public index(req: Request, res: Response) {
    Role.findAll<Role>({})
      .then((users: Array<Role>) => res.json(users))
      .catch((err: Error) => res.status(500).json(err));
  }

  public create(req: Request, res: Response) {
    const params: RoleInterface = req.body;
    Role.create<Role>(params)
      .then((role: Role) => res.status(201).json(role))
      .catch((err: Error) => res.status(500).json(err));
  }

  public show(req: Request, res: Response) {
    const nodeId: number = +req.params.id;

    Role.findByPk<Role>(nodeId)
      .then((role: Role | null) => {
        if (role) {
          res.json(role);
        } else {
          res.status(404).json({ errors: ["role not found"] });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  public update(req: Request, res: Response) {
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