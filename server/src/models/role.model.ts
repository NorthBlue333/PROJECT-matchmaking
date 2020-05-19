import {Model, Column, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt, DataType} from "sequelize-typescript";

@Table
export class Role extends Model<Role> {
  @Column(DataType.STRING)
  role!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}


// async function populate() {
  // const userRole = await Role.findOrCreate({where: {role: Roles.User}})
  // const adminRole = await Role.findOrCreate({where: {role: Roles.Admin}})
  // const superAdminRole = await Role.findOrCreate({where: {role: Roles.SuperAdmin}})
  // await User.findOrCreate({
    // where: {id: 1},
    // defaults : {
      // username: 'Nible',
      // email: 'enzo@wikodit.fr',
      // password: 'Azertyuiop1!',
      // roleId: superAdminRole[0].id,
    // }
  // })
// }
