import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { User } from "./user.model";
import { Party } from "./game.model";

export enum Roles {
  Admin = 'admin',
  SuperAdmin = 'superadmin',
  User = 'user',
}

export interface RoleInterface {
  role: Role;
  userId: number;
}

export class Role extends Model {
  public id!: number;
  public role!: Roles;
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
      unique: true,
      defaultValue: Roles.User,
    },
  },
  {
    tableName: "roles",
    sequelize: database // this bit is important
  }
)

User.belongsTo(Role, {as: 'role'})
Party.belongsTo(User, {as: 'user'})
Party.belongsTo(User, {as: 'opponent'})

Role.sync().then(() => {
  console.log('USER Table created')
  User.sync().then(async () => {
    console.log('ROLE Table created')
    await populate()
    Party.sync().then(() => {
      console.log('PARTY Table created')
    })
  }
)})


async function populate() {
  const userRole = await Role.findOrCreate({where: {role: Roles.User}})
  const adminRole = await Role.findOrCreate({where: {role: Roles.Admin}})
  const superAdminRole = await Role.findOrCreate({where: {role: Roles.SuperAdmin}})
  await User.findOrCreate({
    where: {id: 1},
    defaults : {
      username: 'Nible',
      email: 'enzo@wikodit.fr',
      password: 'Azertyuiop1!',
      roleId: superAdminRole[0].id,
    }
  })
}
