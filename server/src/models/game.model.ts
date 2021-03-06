import {
  Model,
  Column,
  Table,
  BelongsToMany,
  Scopes,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript'
import { User } from './user.model'

@Table({})
export class Game extends Model<Game> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: string

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  opponentId!: string

  @BelongsTo(() => User, 'opponentId')
  opponent: User

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  winnerId!: string

  @BelongsTo(() => User, 'winnerId')
  winner: User

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date
}
