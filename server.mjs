import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { AppoloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

//creates a new Express application
// use this app constant to set up routes, configure middleware, and start the server.
const app = express();
/**
 * The httpServer variable is assigned the result of calling http.createServer, which is an instance of an http.Server object.
 * This object has methods for listening for incoming requests, closing the server, and so on.
 */
const httpServer = http.createServer(app);

const typeDefs = '';
const resolvers = {};

const server = new ApolloServer({
  typeDefs, //
  resolvers,
  plugins: [AppoloServerPluginDrainHttpServer({ httpServer })],
});

await server.start(); //await without async func when the file is Javascript module '.mjs'
