import { graphQLRequest } from './request';

export const notesLoader = async ({ params: { folderId } }) => {
  console.log(['loader'], { folderId });
  const query = `query Folder($folderId: String!) {
    folder(folderId: $folderId) {
      id
      name
      notes {
        content
        id
      }
    }
  }`;

  const data = await graphQLRequest({
    query,
    variables: {
      //folderId getting from params
      //same with folderId: folderId in ES6 since key and value are the same
      folderId,
    },
  });
  return data;
};

export const noteLoader = async ({ params: { noteId } }) => {
  console.log(['loader'], { noteId });
  const query = `query Folder($noteId: String) {
    note(noteId: $noteId) {
      id
      content
    }
  }`;

  const data = await graphQLRequest({
    query,
    variables: {
      //folderId getting from params
      //same with folderId: folderId in ES6 since key and value are the same
      noteId,
    },
  });
  return data;
};

export const addNewNote = async ({ params, request }) => {
  //request.formData is a submitted data

  const newNote = await request.formData();

  //convert formData to Object
  const formDataObj = {};
  newNote.forEach((value, key) => {
    formDataObj[key] = value;
  });
  console.log({ newNote, formDataObj });

  const query = `mutation Mutation($content: String!, $folderId: ID!) {
    addNote(content: $content, folderId: $folderId) {
      id
      content
    }
  }`;

  const { addNote } = await graphQLRequest({
    query,
    variables: formDataObj,
  });
  console.log({ addNote });
  return addNote;
};
