import { createContext, useState } from 'react';

const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
  const [logged, setLogged] = useState("");
  

  return (
    <ScreensContext.Provider value={{ logged,setLogged }}> 
      {children}
    </ScreensContext.Provider>
  );
};

export default ScreensContext;
