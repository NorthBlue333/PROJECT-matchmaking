import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export interface UserInterface {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string
}

export class User extends Model {
  public id: number;
  public username: string;
  public email: string;
  public password: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      unique: true,
      allowNull: false,
      validate: { isEmail: true },
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      validate: { is: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){8,}$/ },
    },
  },
  {
    tableName: "users",
    sequelize: database // this bit is important
  }
);

// User.hasMany(Role, {as: 'roles', foreignKey: 'userId'})

User.sync().then(() => console.log("User table created"));