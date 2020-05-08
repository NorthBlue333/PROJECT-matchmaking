const { gql } = require('apollo-server-express')
const typeDefs = gql`
type User {
id: Int!
username: String!
email: String!
password: String!
role: Role!
}
type Role {
id: Int!
role: String!
users: [User!]!
}
type Game {
id: Int!
user: User!
opponent: User!
}
type Query {
getUser(id: Int!): User
getAllUsers: [User!]!
getGame(id: Int!): Game
}
type Mutation {
createUser(username: String!, email: String!, password: String!): User!
createGame( userId: Int!, opponentId: Int!): Game!
}`

module.exports = typeDefs
