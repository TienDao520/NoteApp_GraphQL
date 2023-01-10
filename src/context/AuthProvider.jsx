import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

//Add context to share the login/ authentication through out the app in the context
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user) => {
      console.log('[From AuthProvider]', { user });
      //If user.uid is there state user will be change and share to all components in app
      if (user?.uid) {
        setUser(user);
        localStorage.setItem('access_token', user.accessToken);
        return;
      }

      //reset user information
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
      {children}
    </AuthContext.Provider>
  );
}
