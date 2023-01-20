import { NoteAddOutlined } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  Link,
  Outlet,
  useParams,
  useLoaderData,
  useSubmit,
  useNavigate,
} from 'react-router-dom';

import moment from 'moment';

export default function NoteList() {
  const { noteId, folderId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  //data gettign from react-router server
  const { folder } = useLoaderData();

  console.log('[NoteList]', { folder });
  // const folder = {
  //   notes: [
  //     { id: '1', content: '<p>This is new note</p>' },
  //     { id: '2', content: '<p>This is new note2</p>' },
  //   ],
  // };

  const submit = useSubmit();
  const navigate = useNavigate();

  useEffect(
    () => {
      //Check noteId in url
      if (noteId) {
        setActiveNoteId(noteId);
        return;
      }
      if (folder?.notes?.[0]) {
        navigate(`note/${folder.notes[0].id}`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [noteId, folder.notes]
  );

  const handleAddNewNote = () => {
    submit(
      {
        content: '',
        folderId,
      },
      { method: 'post', action: `/folders/${folderId}` }
    );
  };
  return (
    <Grid container height='100%'>
      <Grid
        item
        xs={4}
        sx={{
          width: '100%',
          height: '100%',
          maxWidth: 360,
          bgcolor: '#EEDEC0',
          padding: '10px',
          textAlign: 'left',
          overflowY: 'auto',
        }}
      >
        <List
          subheader={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography>Notes</Typography>
              <Tooltip title='Add Note' onClick={handleAddNewNote}>
                <IconButton size='small'>
                  <NoteAddOutlined />
                </IconButton>
              </Tooltip>
            </Box>
          }
        >
          {folder.notes.map(({ id, content, updatedAt }) => {
            return (
              <Link
                key={id}
                to={`note/${id}`}
                style={{ textDecoration: 'none' }}
                onClick={() => setActiveNoteId(id)}
              >
                <Card
                  sx={{
                    mb: '5px',
                    backgroundColor:
                      id === activeNoteId ? 'rgb(250, 210, 140) ' : null,
                  }}
                >
                  <CardContent
                    sx={{ '&:last-child': { pb: '10px' }, padding: '10px' }}
                  >
                    <div
                      style={{ fontSize: 14, fontWeight: 'bold' }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || 'Empty'}`,
                      }}
                    />
                    <Typography sx={{ fontSize: '10px' }}>
                      {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={8}>
        {/* Node Detail */}
        <Outlet />
      </Grid>
    </Grid>
  );
}
