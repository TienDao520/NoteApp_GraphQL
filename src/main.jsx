import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Container } from '@mui/system';
import './firebase/config';
import Image from './broly.png';

import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundPosition: 'center' /* Center the image */,
    backgroundRepeat: 'no-repeat' /* Do not repeat the image */,
    backgroundSize:
      'cover' /* Resize the background image to cover the entire container */,
    opacity: 0.5,
  },
};
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Container maxWidth='lg' sx={{ textAlign: 'center', marginTop: '50px' }}>
      <RouterProvider router={router}></RouterProvider>
    </Container>
  </React.StrictMode>
);
