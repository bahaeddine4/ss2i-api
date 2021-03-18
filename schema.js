const { gql } = require('apollo-server')

const typeDefs = gql`
  type Review {
    id: ID
    content: String
    author: User
    company: Company
  }
  type User {
    id: ID
    name: String
    email: String
    password: String
    reviews: [Review]
  }
  type Company {
    id: ID
    name: String
    reviews: [Review]
  }
  type Query {
    companyByName(name: String!): Company
    reviews: [Review]
    review(id: ID!): Review
    users: [User]
    user(id: ID!): User
    companies: [Company]
    company(id: ID!): Company
  }
  type Mutation {
    addReview(author: ID!, content: String!, company: ID!): Review
    editReview(id: String!, content: String!): Review
    deleteReview(id: ID!): Review
    createUser(name: String!, email: String!, password: String!): User
    createCompany(name: String!): Company
  }
`
exports.typeDefs = typeDefs
