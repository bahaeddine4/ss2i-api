const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')
const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/ss2i')
  .then(() => console.log('connected to ss2i db'))
  .catch((err) => console.log('error ', err))

const server = new ApolloServer({ typeDefs, resolvers })

server.listen(4000, () => console.log('server listening on port 3000'))
