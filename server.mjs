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

import './firebaseConfig.js';

import { getAuth } from 'firebase-admin/auth';

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
  typeDefs, //a GraphQL schema
  resolvers, //an object that contains the functions that resolve the fields in the schema
  //plugins is an array of Apollo Server plugins that can extend the functionality of the server.
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], //ApolloServerPluginDrainHttpServer({ httpServer }) is a specific plugin that allows the server to handle requests from an HTTP server.
});

await server.start(); //await without async func when the file is Javascript module '.mjs'

//one of accessToken checking in middleware
const authorizationJWT = async (req, res, next) => {
  console.log({ authorization: req.headers.authorization });

  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const accessToken = authorizationHeader.split(' ')[1];

    getAuth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        console.log({ decodedToken });
        //Response uid value = decodedToken handle in server side
        res.locals.uid = decodedToken.uid;

        next();
      })
      .catch((err) => {
        console.log({ err });
        return res.status(403).json({ message: 'Forbidden', error: err });
      });
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

//Adding middleware
app.use(
  cors(),
  authorizationJWT,
  bodyParser.json(),
  expressMiddleware(server, {
    //Add context to be used by all resolvers
    context: async ({ req, res }) => {
      return { uid: res.locals.uid };
    },
  })
);
mongoose.set('strictQuery', false);
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to DB');
    //Start server with port
    await new Promise((resolve, reject) => {
      httpServer.listen({ port: PORT }, resolve);
      console.log('Server is ready at http://localhost:4000');
    });
  });
