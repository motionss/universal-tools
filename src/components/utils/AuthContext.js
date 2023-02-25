import { createContext, useContext } from "react";

export const AuthContext = createContext({
  firebase: { auth: null, user: null },
  setFirebaseAuth: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
