import React, { useEffect, useMemo, useState } from 'react';
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHTML from 'draftjs-to-html';
import { useLoaderData, useSubmit, useLocation } from 'react-router-dom';
import { debounce } from '@mui/material';

export default function Note() {
  const { note } = useLoaderData();

  const submit = useSubmit();
  const location = useLocation();

  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });

  //rawHTML that will be sent from client to backend
  //rawHTML: change from  EditorState of lib draftjs to HTML
  const [rawHTML, setRawHTML] = useState(note.content);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [note.id]);

  useEffect(() => {
    debouncedMemorized(rawHTML, note, location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawHTML, location.pathname]);

  const debouncedMemorized = useMemo(() => {
    //value using in debounce should be also add as parameter of func to avoid query to old data
    return debounce((rawHTML, note, pathname) => {
      //Comparing user input data with getting from backend
      if (rawHTML === note.content) return;

      submit(
        { ...note, content: rawHTML },
        {
          method: 'post',
          //pathname is value after host
          actions: pathname,
        }
      );
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Change RawHTML value when content change
  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);

  const handleOnChange = (e) => {
    setEditorState(e);
    setRawHTML(draftToHTML(convertToRaw(e.getCurrentContent())));
  };
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder='Added your note'
    />
  );
}
