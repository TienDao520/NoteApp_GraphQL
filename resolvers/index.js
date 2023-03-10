import { GraphQLScalarType } from 'graphql';

import fakeData from '../fakeData/index.js';
import {
  AuthorModel,
  FolderModel,
  NoteModel,
  NotificationModel,
} from '../models/index.js';

import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

/**Handle and send back to client base on query from client
 * return value for specific typeDefs
 * Default resolvers mapping with same fields' names
 * Each resolver have 4 parameters:
 */
export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    //when reading type Date it will return some thing to client
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),
  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      }).sort({
        updatedAt: 'desc',
      });
      console.log({ folders, context });
      return folders;
      // return fakeData.folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      console.log({ folderId });
      const foundFolder = await FolderModel.findById(folderId);
      return foundFolder;
      // return fakeData.folders.find((folder) => folderId === folder.id);
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const note = await NoteModel.findById(noteId);
      return note;
      // return fakeData.notes.find((note) => note.id === noteId);
    },
  },
  //And path/guidline when query to author when query abnormal query
  //parent, args: data sending from client
  //Type is Folder and query to resolver author/notes then will execute resolver func...

  Folder: {
    author: async (parent, args) => {
      console.log({ parent, args });
      const authorId = parent.authorId;
      const author = await AuthorModel.findOne({
        uid: authorId,
      });
      return author;
      // return { id: '123', name: 'NoteApp' };
    },
    //Add resolver for Note to guide how to get notes
    notes: async (parent, args) => {
      console.log({ parent });
      const notes = await NoteModel.find({ folderId: parent.id }).sort({
        updatedAt: 'desc',
      });
      console.log({ notes });
      return notes;
      // return fakeData.notes.filter((note) => note.folderId === parent.id);
      // return [];
    },
  },
  Mutation: {
    addNote: async (parent, args) => {
      //args data submitted from client
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },
    updateNote: async (parent, args) => {
      const noteId = args.id;
      const note = await NoteModel.findByIdAndUpdate(noteId, args);
      return note;
    },
    addFolder: async (parent, args, context) => {
      //Create newFolder with FolderModel
      const newFolder = new FolderModel({ ...args, authorId: context.uid });
      console.log({ newFolder });
      pubsub.publish('FOLDER_CREATED', {
        //Data send to client
        folderCreated: {
          message: 'New Folder created',
        },
      });

      await newFolder.save();
      return newFolder;
    },
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid });

      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }

      return foundUser;
    },
    pushNotification: async (parent, args) => {
      // const content = args.content;
      const newNotification = new NotificationModel(args);
      pubsub.publish('PUSH_NOTIFICATION', {
        notification: {
          message: args.content,
        },
      });
      await newNotification.save();

      return { message: 'SUCCESS' };
    },
  },
  Subscription: {
    folderCreated: {
      subscribe: () => pubsub.asyncIterator(['FOLDER_CREATED', 'NOTE_CREATED']),
    },
    notification: {
      subscribe: () => pubsub.asyncIterator(['PUSH_NOTIFICATION']),
    },
  },
};
