import React from "react";

const CurrentUserContext = React.createContext({
  currentUser: {},
  isLoggedIn: false,
});

export { CurrentUserContext };
