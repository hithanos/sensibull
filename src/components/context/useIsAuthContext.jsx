import { createContext, useState } from "react";

export const IsAuthContext = createContext();

export const IsAuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <IsAuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </IsAuthContext.Provider>
  );
};
