const { GraphQLServer } = require('graphql-yoga')


//pseudo database
let usersdb = [{
    id: '0',
    name: 'Ononn',
    isAdmin: true, 
    age: 12
  },
  {
    id: '1',
    name: 'Silk',
    isAdmin: false,
    age: 14
}];
let idCount = usersdb.length

// declaration 
const typeDefs = `
type User {
    id: ID!
    name: String!
    isAdmin: Boolean! 
    age: Int!
}
type Query {
  info: String!
  hero(name: String): String!
  allUsers: [User!]!
  user(id: ID!): User!
}

type Mutation {
    post(name: String!): User!
    update(id: ID! , name: String!) : User!
}
`



// resolvers - actual implementation 
const resolvers = {
  Query: {
    info: () => `This is the first GraphQL project`,
    hero: (_, {name}) => `My hero is ${name || "Boy"}`,
    allUsers: () => {
        console.log(usersdb);
        return usersdb
    },
    user: (_, { id }) => {
        const user = usersdb.find(user => user.id === id);
        if (!user) {
          throw new Error('Cannot find your user!');
        }
        return user;
      }
  },
  Mutation: {
    // 2
    post: (parent, args) => {
       const user = {
        id: `user-${idCount++}`,
        name: args.name
      }
      usersdb.push(user)
      return user
    },

    update: (parent,args) => {
        let user = usersdb.find(user => user.id === args.id);
        if (!user) {
            throw new Error('Cannot find your user!');
          }
        user = {
            id: args.id,
            name: args.name,
            isAdmin: user.isAdmin,
            age: user.age
          }
        return user
    }
  }
}



// typedefs and mutation bundled and passed to the server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`>>> 🌎  Server is running on http://localhost:4000`))


