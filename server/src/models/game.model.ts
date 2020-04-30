import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export interface PartyInterface {
  id: number;
  userId: number;
  opponentId: number
}

export class Party extends Model {
  public id: number;
  public userId: number;
  public opponentId: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Party.init(
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



