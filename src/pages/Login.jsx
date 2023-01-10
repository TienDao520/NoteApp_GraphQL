import React from 'react';

import { Button, Typography } from '@mui/material';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../context/AuthProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const auth = getAuth();
  //Get the user object value from the public context
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    console.log({ res });
  };

  if (user?.uid) {
    navigate('/');
    return;
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
