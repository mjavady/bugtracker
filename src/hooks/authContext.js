import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  currentPage: "",
  setCurrent: () => {},
  setCurrentUser: () => {},
  currentUser: "",
  userData: {},
});
