import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';

//Add context to share the login/ authentication through out the app
const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const auth = getAuth();

  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user) => {
      console.log('[From AuthProvider]', { user });
    });
  }, [auth]);
  //Values passed to Provider will be share to children to access
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
