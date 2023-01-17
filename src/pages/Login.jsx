import React from 'react';

import { Button, Typography } from '@mui/material';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../context/AuthProvider';
import { useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { graphQLRequest } from '../utils/request';

export default function Login() {
  const auth = getAuth();
  //Get the user object value from the public context
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);
    const { data } = await graphQLRequest({
      query: `mutation register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        uid
        name
      }
    }`,
      variables: {
        uid,
        name: displayName,
      },
    });
    console.log('register', { data });
  };

  if (localStorage.getItem('accessToken')) {
    /* navigate('/');*/
    return <Navigate to='/' />;
  }

  return (
    <>
      <Typography variant='h5' sx={{ marginBottom: '10px' }}>
        Welcome to Note Application
      </Typography>
      <Button variant='outlined' onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  );
}
