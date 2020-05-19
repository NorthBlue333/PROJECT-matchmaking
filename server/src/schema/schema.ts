
export default `
  type Users {
    id: ID!
    username: String!
    email: String!
    password: String!
    roleId: ID!
    role: Roles!
  }

  type Roles {
    id: ID!
    role: String!
  }
  
  type Query {
    users: [Users!]!
    user(id: ID!): Users
    role(id: ID!): Roles
    roles: [Roles!]!
  }

  type Mutation {
    createUser(username: String!, email:String!, password: String!, roleId: ID!): Users!
    updateUser(id: ID!, username: String, email:String, password: String, roleId: ID): [Int!]!
    deleteUser(id: ID!): Int!
    createRole(role: String!): Roles!
    deleteRole(id: ID!): Int!
  }
`;