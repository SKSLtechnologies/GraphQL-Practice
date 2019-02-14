const { GraphQLServer } = require("graphql-yoga");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const app = express();

app.use('*', cors());


/* MONGOOSE SETUP */
// Configuring the database
const dbConfig = require('../config/database.config.js');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {useNewUrlParser: true} ).then(() => {
    console.log("Successfully connected to the database.");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now.');
    process.exit();
});


const User =require ('../server/models/user.js') 

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    users: () => User.find(),
  },
  Mutation: {
    createUser: async (_, { username, password, email, checkAdmin }) => {
      const user = new User ();
      user.email = email; 
      user.checkAdmin = checkAdmin;
      user.username = username;
      user.setPassword(password); 
      await user.save();
      return user;
    }, 
    updateUser: async (_, {id, username}) => {
      const user = await User.findByIdAndUpdate(id, { username }, {new: true});
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
