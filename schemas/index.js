/**
 * 3 first main operation, points / root types that client can query to server
 * Query
 * Mutation: For delete update value
 * Subscription: For realtime update to clientwhen there are any changes from server
 * typeDefs here is like a document a set of rules name and kind of data (schema)
 */
export const typeDefs = `#graphql

  scalar Date

  type Folder {
    id: String!,
    name: String,
    createAt: String,
    author: Author,
    notes: [Note]
  }

  type Note {
    id: String!,
    content: String,
    updatedAt: Date
  }

  type Author {
    uid: String!,
    name: String!,
  }

  type Query {
    folders: [Folder]
    folder(folderId: String!): Folder
    note(noteId: String): Note
  }

  type Mutation {
    addFolder(name: String!): Folder,
    addNote(content: String!, folderId: ID!): Note,
    updateNote(id: String!, content: String!): Note,
    register(uid: String!, name: String!): Author,
    pushNotification(content: String): Message,
  }

  type Message {
    message: String
  }
  type Subscription {
    folderCreated: Message
    notification: Message
  }

`;
