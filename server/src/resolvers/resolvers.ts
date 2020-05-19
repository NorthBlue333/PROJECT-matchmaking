export default {
  Users: {
    role: (parent, args, context, info) => parent.getRole(),
  },
  Roles: {
  },
  Query: {
    users: (parent, args, { db }, info) => db.users.findAll(),
    roles: (parent, args, { db }, info) => db.roles.findAll(),
    // games: (parent, args, { db }, info) => db.game.findAll(),
    user: (parent, { id }, { db }, info) => db.users.findByPk(id),
    role: (parent, { id }, { db }, info) => db.roles.findByPk(id),
    // game: (parent, { id }, { db }, info) => db.game.findByPk(id),
  },
  Mutation: {
    createUser: (parent, { username, email, password, roleId }, { db }, info) =>
      db.post.create({
        username: username,
        email: email,
        password: password,
        roleId: roleId,
      }),
    updateUser: (parent, { username, email, password, roleId, id }, { db }, info) =>
      db.post.update({
        username: username,
        email: email,
        password: password,
        roleId: roleId,
      },
      {
        where: {
          id: id
        }
      }),
    deleteUser: (parent, {id}, { db }, info) =>
      db.post.destroy({
        where: {
          id: id
        }
      }),
    createRole: (parent, { role }, { db }, info) =>
      db.post.create({
        role: role,
      }),
    deleteRole: (parent, {id}, { db }, info) =>
      db.post.destroy({
        where: {
          id: id
        }
      }),
    // createGame: (parent, { userId, opponentId }, { db }, info) =>
    //   db.post.create({
    //     userId: userId,
    //     opponentId: opponentId,
    //   }),
    // updateGame: (parent, { userId, opponentId, id }, { db }, info) =>
    //   db.post.update({
    //     userId: userId,
    //     opponentId: opponentId,
    //   },
    //   {
    //     where: {
    //       id: id
    //     }
    //   }),
    // deleteGame: (parent, {id}, { db }, info) =>
    //   db.post.destroy({
    //     where: {
    //       id: id
    //     }
    //   }),
  }
};