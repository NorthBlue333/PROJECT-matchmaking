import { Sequelize } from 'sequelize-typescript'
import { Game } from '../models/game.model'
import { User } from '../models/user.model'

export const database = new Sequelize({
  database: 'matchmaking',
  username: 'matchmaking',
  password: 'matchmaking',
  port: 3306,
  host: 'mariadb',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT0',
  },
  models: [Game, User],
})
