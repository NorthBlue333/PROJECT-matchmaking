import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export interface GameInterface {
  id: number;
  userId: number;
  opponentId: number
}

export class Game extends Model {
  public id: number;
  public userId: number;
  public opponentId: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
  },
  {
    tableName: "party",
    sequelize: database // this bit is important
  }
);



