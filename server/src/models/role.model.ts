import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { User } from "./user.model";

export enum Roles {
  Admin = 'admin',
  SuperAdmin = 'superadmin',
  User = 'user',
}

export interface RoleInterface {
  role: Role;
  userId: string;
}

export class Role extends Model {
  public id: number;
  public role: Roles;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    role: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      defaultValue: Roles.User,
    },
  },
  {
    tableName: "roles",
    sequelize: database // this bit is important
  }
);

Role.belongsTo(User, {foreignKey: 'userId'})

Role.sync().then(() => console.log("Role table created"));