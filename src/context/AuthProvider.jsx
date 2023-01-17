import React, { createContext, useEffect, useState } from 'react';

import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

//Add context to share the login/ authentication through out the app in the context
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user) => {
      console.log('[From AuthProvider]', { user });
      //If user.uid is there state user will be change and share to all components in app
      if (user?.uid) {
        setUser(user);
        //Tracking when accessToken has been changed
        if (user.accessToken !== localStorage.getItem('accessToken')) {
          localStorage.setItem('accessToken', user.accessToken);
          window.location.reload();
        }
        setIsLoading(false);
        return;
      }

      //reset user information
      console.log('reset');
      setIsLoading(false);
      setUser({});
      localStorage.clear();
      navigate('/login');
    });

    return () => {
      unsubcribed();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  //Values passed to Provider will be share to children to access
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
}
