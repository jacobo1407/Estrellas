import { createContext, useState } from 'react';

const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
  const [id, setId] = useState(-1);
  const [theme, setTheme] = useState('black');
  return (
    <ScreensContext.Provider value={{ id, setId, theme, setTheme }}>
      {children}
    </ScreensContext.Provider>
  );
};

export default ScreensContext;