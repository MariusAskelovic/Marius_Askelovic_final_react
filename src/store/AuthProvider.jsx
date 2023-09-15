import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';

const AuthContext = createContext({
  email: '',
  loginStatus: false,
});

export default function AuthProvider(props) {
  const [fireUser, setFireUser] = useState(auth.currentUser);
  const accToken = localStorage.getItem('fbToken');

  const userEmail = fireUser?.email;
  let loginStatus = userEmail ? true : false;
  loginStatus = !!accToken;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFireUser(user);
        localStorage.setItem('fbToken', user.accessToken);
      } else {
        setFireUser({});
        localStorage.removeItem('fbToken');
      }
    });
  }, []);

  const ctx = {
    userEmail,
    loginStatus,
  };

  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
