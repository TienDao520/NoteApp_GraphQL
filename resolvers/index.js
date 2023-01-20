import fakeData from '../fakeData/index.js';
import { AuthorModel, FolderModel, NoteModel } from '../models/index.js';

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
      const notes = await NoteModel.find({ folderId: parent.id });
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
