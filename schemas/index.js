/**
 * 3 first main operation, points / root types that client can query to server
 * Query
 * Mutation: For delete update value
 * Subscription: For realtime update to clientwhen there are any changes from server
 * typeDefs here is like a document a set of rules name and kind of data (schema)
 */
export const typeDefs = `#graphql
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
    note(noteId: String): Note
  }

  type Mutation {
    addFolder(name: String!): Folder,
    register(uid: String!, name: String!): Author
  }

`;
