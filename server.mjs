import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import mongoose from 'mongoose';
import { resolvers } from './resolvers/index.js';
import { typeDefs } from './schemas/index.js';

import fakeData from './fakeData/index.js';

import 'dotenv/config';

//creates a new Express application
// use this app constant to set up routes, configure middleware, and start the server.
const app = express();
/**
 * The httpServer variable is assigned the result of calling http.createServer, which is an instance of an http.Server object.
 * This object has methods for listening for incoming requests, closing the server, and so on.
 */
const httpServer = http.createServer(app);

//Connect to DB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pzi6ywz.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 4000;
// schema
const server = new ApolloServer({
  typeDefs, //
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start(); //await without async func when the file is Javascript module '.mjs'

//Adding middleware
app.use(cors(), bodyParser.json(), expressMiddleware(server));
mongoose.set('strictQuery', false);
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to DB');
    await new Promise((resolve, reject) => {
      httpServer.listen({ port: PORT }, resolve);
      console.log('Server is ready at http://localhost:4000');
    });
  });
