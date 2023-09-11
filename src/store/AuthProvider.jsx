import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  email: '',
  loginStatus: '',
});

export default function AuthProvider(props) {
  const [fireUser, setFireUser] = useState({});

  const email = fireUser.email;
  const userId = fireUser.uid;
  let loginStatus = !!email;

  const ctx = {
    email,
    userId,
    loginStatus,
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFireUser(user);
      } else {
        setFireUser({});
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
