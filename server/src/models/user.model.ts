import {Model, Column, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt, BelongsTo, DataType} from "sequelize-typescript";
import { UserRole } from "./userRole.model";
import { Role } from "./role.model";


@Scopes(() => ({
  roles: {
    include: [
      {
        model: Role,
        through: {attributes: []}
      }
    ]
  }
}))
@Table
export class User extends Model<User> {
  @Column(DataType.STRING)
  username!: string

  @Column(DataType.STRING)
  email!: string

  @Column(DataType.STRING)
  password!: string

  @BelongsToMany(() => Role, () => UserRole)
  roles?: Role[]

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date

}
