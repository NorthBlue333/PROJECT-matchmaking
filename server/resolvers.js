const resolvers = {
  Query: {
   async getUser (root, { id }, { models }) {
    return models.User.findByPk(id)
    },
   async getAllUsers (root, args, { models }){
    return models.User.findAll()
    },
   async getGame (root, { id }, { models }) {
    return models.Game.findByPk(id)
    }
  },
  Mutation: {
    async createUser (root, { username, email, password }, { models }) {
      return models.User.create({
        username,
        email,
        password
      })
    },
  },
  User: {
    async game(game) {
      return game.getGame()
    }
  },
  Game: {
    async user(user) {
      return user.getUser()
    }
  },
  async createGame (root, { UserId, opponentId }, { models }) {
    return models.Game.create({ UserId, opponentId })
  },
}
