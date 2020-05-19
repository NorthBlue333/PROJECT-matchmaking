import {Model, Column, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt, BelongsTo, ForeignKey, DataType} from "sequelize-typescript";
import { User } from "./user.model";

@Table({})
export class Game extends Model<Game> {
  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  userId!: string

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  opponentId!: string

  @BelongsTo(() => User, 'opponentId')
  opponent: User

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date
}