export const notesLoader = async ({ params: { folderId } }) => {
  console.log(['loader'], { folderId });
  const query = `query Folder($folderId: String) {
    folder(folderId: $folderId) {
      id
      name
      notes {
        content
        id
      }
    }
  }`;
  const res = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        //folderId getting from params
        //same with folderId: folderId in ES6 since key and value are the same
        folderId,
      },
    }),
  });
  const { data } = await res.json();
  console.log('[Note List]', { data });
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
  const res = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        noteId,
      },
    }),
  });
  const { data } = await res.json();
  console.log('[Note List]', { data });
  return data;
};
