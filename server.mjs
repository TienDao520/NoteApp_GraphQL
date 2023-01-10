import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';

//creates a new Express application
// use this app constant to set up routes, configure middleware, and start the server.
const app = express();
/**
 * The httpServer variable is assigned the result of calling http.createServer, which is an instance of an http.Server object.
 * This object has methods for listening for incoming requests, closing the server, and so on.
 */
const httpServer = http.createServer(app);

/**
 * Mutation: For delete update value
 * Subscription: For realtime update to clientwhen there are any changes from server
 * typeDefs here is like a document a set of rules name and kind of data
 */
const typeDefs = `#graphql
  type Query {
    name: String
  }

`;
/**Handle and send back to client base on query from client */
const resolvers = {
  Query: {
    name: () => {
      return 'Tien Dao';
    },
  },
};

// schema
const server = new ApolloServer({
  typeDefs, //
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start(); //await without async func when the file is Javascript module '.mjs'

//Adding middleware
app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve, reject) => {
  httpServer.listen({ port: 4000 }, resolve);
});

console.log('Server is ready at http://localhost:4000');
