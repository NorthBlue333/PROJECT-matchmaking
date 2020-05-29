import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  DataType,
  HasMany,
} from 'sequelize-typescript'
import { Game } from './game.model'

@Table
export class User extends Model<User> {
  @Column(DataType.STRING)
  username!: string

  @Column(DataType.STRING)
  email!: string

  @Column(DataType.STRING)
  password!: string

  @HasMany(() => Game, 'userId')
  userGames?: Game[]

  @HasMany(() => Game, 'opponentId')
  opponentGames?: Game[]

  @HasMany(() => Game, 'winnerId')
  wonGames?: Game[]

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date
}
