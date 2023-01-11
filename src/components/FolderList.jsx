import { Box, Card, CardContent, List, Typography } from '@mui/material';
import { height } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

export default function FolderList({ folders }) {
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
          >
            <Card sx={{ mb: '5px' }}>
              <CardContent
                sx={{ '&:last-child': { pb: '10px' }, padding: '10px' }}
              >
                <Typography>{name}</Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}
