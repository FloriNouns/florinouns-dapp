import { createContext, useState } from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [navbarVisible, setNavbarVisible] = useState(false);

  const toggleNavbar = () => setNavbarVisible((v) => !v);

  return (
    <AppContext.Provider value={{ navbarVisible, toggleNavbar }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
