import {Model, Column, Table, ForeignKey, DataType} from "sequelize-typescript";
import {User} from "./user.model";
import {Role} from "./role.model";

@Table
export class UserRole extends Model<UserRole> {

  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  userId!: number;

  @ForeignKey(() => Role)
  @Column(DataType.NUMBER)
  roleId!: number;
}