const { gql } = require('apollo-server-express')

module.exports = gql`
  type Mutation {
    login(input: AccountInput!): AuthReturn!
    register(input: RegisterInput!): AuthReturn!
    updateAccountDetails(input: UpdateAccountDetailsInput!): String!
  }

  type Query {
    welcome: String!
  }

  type User {
    id: ID!
    email: String!
    password: String!
    username: String!
    location: String!
    createdAt: String!
    updatedAt: String!
  }

  type AuthReturn {
    token: String!
    user: User!
  }

  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
    username: String!
    location: String!
  }

  input UpdateAccountDetailsInput {
    oldUsername: String!
    username: String!
    oldPassword: String!
    password: String!
  }

  input AccountInput {
    email: String!
    password: String!
  }

`
