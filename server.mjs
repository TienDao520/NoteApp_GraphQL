import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import fakeData from './fakeData/index.js';

//creates a new Express application
// use this app constant to set up routes, configure middleware, and start the server.
const app = express();
/**
 * The httpServer variable is assigned the result of calling http.createServer, which is an instance of an http.Server object.
 * This object has methods for listening for incoming requests, closing the server, and so on.
 */
const httpServer = http.createServer(app);

/**
 * 3 first main operation, points / root types that client can query to server
 * Query
 * Mutation: For delete update value
 * Subscription: For realtime update to clientwhen there are any changes from server
 * typeDefs here is like a document a set of rules name and kind of data
 */
const typeDefs = `#graphql
  type Folder {
    id: String,
    name: String,
    createAt: String,
    author: Author,
    notes: [Note]
  }

  type Note {
    id: String,
    content: String,
  }

  type Author {
    id: String,
    name: String,
  }

  type Query {
    folders: [Folder]
    folder(folderId: String): Folder
  }

`;
/**Handle and send back to client base on query from client
 * return value for specific typeDefs
 * Default resolvers mapping with same fields' names
 * Each resolver have 4 parameters:
 */
const resolvers = {
  Query: {
    folders: () => {
      return fakeData.folders;
    },
    folder: (parent, args) => {
      const folderId = args.folderId;
      console.log({ folderId });
      return fakeData.folders.find((folder) => folderId === folder.id);
    },
  },
  //And path/guidline when query to author when query abnormal query
  //parent, args: data sending from client
  //Type is Folder and query to resolver author/notes then will execute resolver func...

  Folder: {
    author: (parent, args) => {
      console.log({ parent, args });
      const authorId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authorId);
      // return { id: '123', name: 'NoteApp' };
    },
    //Add resolver for Note to guide how to get notes
    notes: (parent, args) => {
      console.log({ parent });
      return fakeData.notes.filter((note) => note.folderId === parent.id);
      // return [];
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
