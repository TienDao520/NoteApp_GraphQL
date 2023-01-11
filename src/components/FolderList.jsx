import { Box, Card, CardContent, List, Typography } from '@mui/material';
import { height } from '@mui/system';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function FolderList({ folders }) {
  const { folderId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);

  return (
    <List
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: '#008120',
        padding: '10px',
        textAlign: 'left',
        overflowY: 'auto',
      }}
      subheader={
        <Box>
          <Typography sx={{ fontWeight: 'bold', color: 'white' }}>
            Groups
          </Typography>
        </Box>
      }
    >
      {folders.map(({ id, name }) => {
        return (
          <Link
            key={id}
            to={`folders/${id}`}
            style={{ textDecoration: 'none' }}
            onClick={() => setActiveFolderId(id)}
          >
            <Card
              sx={{
                mb: '5px',
                backgroundColor:
                  id === activeFolderId ? 'rgb(250, 210, 140) ' : null,
              }}
            >
              <CardContent
                sx={{ '&:last-child': { pb: '10px' }, padding: '10px' }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
                  {name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}
