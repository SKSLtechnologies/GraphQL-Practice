const { GraphQLServer } = require("graphql-yoga");

/* MONGOOSE SETUP */
// Configuring the database
const dbConfig = require('../config/database.config.js');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {}).then(() => {
    console.log("Successfully connected to the database! ");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now.');
    process.exit();
});

const User = mongoose.model("User", {
  username: String,
  email: String,
  checkAdmin: Boolean
});

const typeDefs = `
  type Query {
    hello(name: String): String!
    users: [User]
  }

  type User {
    id: ID!
    username: String!
    email: String!
    checkAdmin: Boolean
  }
  type Mutation {
    createUser(username: String!, email: String!, checkAdmin: Boolean): User
    updateUser(id: ID!, username: String!): Boolean
    removeUser (id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    users: () => User.find(),
  },
  Mutation: {
    createUser: async (_, { username, email, checkAdmin }) => {
      const user = new User({ username, email, checkAdmin });
      await user.save();
      return user;
    }, 

  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
  server.start(() => console.log(">>> 🌎  Server is running on http://localhost:4000"));


