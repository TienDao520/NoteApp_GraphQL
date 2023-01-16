import fakeData from '../fakeData/index.js';
import { AuthorModel, FolderModel } from '../models/index.js';

/**Handle and send back to client base on query from client
 * return value for specific typeDefs
 * Default resolvers mapping with same fields' names
 * Each resolver have 4 parameters:
 */
export const resolvers = {
  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      });
      console.log({ folders, context });
      return folders;
      // return fakeData.folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      console.log({ folderId });
      const foundFolder = await FolderModel.findOne({
        _id: folderId,
      });
      return foundFolder;
      // return fakeData.folders.find((folder) => folderId === folder.id);
    },
    note: (parent, args) => {
      const noteId = args.noteId;
      return fakeData.notes.find((note) => note.id === noteId);
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
  Mutation: {
    addFolder: async (parent, args) => {
      //Create newFolder with FolderModel
      const newFolder = new FolderModel({ ...args, authorId: '123' });
      console.log({ newFolder });
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
  },
};
