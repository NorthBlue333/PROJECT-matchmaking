import {Sequelize} from 'sequelize-typescript';

export const database = new Sequelize({
  database: "matchmaking",
  username: "matchmaking",
  password: "matchmaking",
  port: 3306,
  host: 'mariadb',
  dialect: "mariadb",
  dialectOptions: {
    timezone: 'Etc/GMT0'
  },
  models: [__dirname + '/models']
});