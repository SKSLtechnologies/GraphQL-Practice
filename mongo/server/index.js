const { GraphQLServer } = require("graphql-yoga");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");

const app = express();

app.use('*', cors());

/* MONGOOSE SETUP */
// Configuring the database
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect('mongodb://localhost/mydb', {}).then(() => {
    console.log("Successfully connected to the database! ");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now.');
    process.exit();
});

const User = require('../server/models/users');

// const User = mongoose.model("users", {
//   name: String,
//   empcd: String,
//   proj: Number,
//   email: String,
//   isAdmin: Boolean,
//   password: String
// });

// const typeDefs = `
//   type Query {
//     hello(name: String): String!
//     users: [User]
//     user(id: String): User!
//   }
//   type User {
//     id: ID!
//     name: String!
//     empcd: String!
//     proj: Int
//   }
//   type Mutation {
//     createUser(empcd: String!, name: String!, proj: Int): User
//     updateUser(id: ID!, name: String!): Boolean
//     removeUser (id: ID!): Boolean
//   }
// `

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    user: (_, { id } ) => {
      var user = User.findById(id)
      if (!user) {
        throw new Error('Cannot find your user!');
      }
      return user
    },
    users: () => User.find()
  },
  Mutation: {
    createUser: async (_, { name, empcd, proj, email, password, isAdmin }) => {
      const user = new User();
      user.email = email; 
      user.empcd = empcd; 
      user.proj = proj; 
      user.isAdmin = isAdmin;
      user.name = name;
      user.setPassword(password); 
      await user.save();
      return user;
    }, 
    updateUser: async (_, {id, name}) => {
      const user = await User.findByIdAndUpdate(id, { name }, {new: true} );
      return user;
    },
    removeUser: async (_, {id}) => {
      await User.findByIdAndDelete (id);
      return true;
    },
  }
};

const server = new GraphQLServer({
  typeDefs: '../server/models/schema.graphql',
  resolvers,
})

 server.start(() => console.log(">>> 🌎  Server is running on http://localhost:4000"));
