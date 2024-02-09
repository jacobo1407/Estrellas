import { createContext, useState } from 'react';

const ScreensContext = createContext();
export const ScreensProvider = ({ children }) => {
  const [id, setId] = useState(-1);
  return (
    <ScreensContext.Provider value={{ id, setId }}>
      {children}
    </ScreensContext.Provider>
  );
};

export default ScreensContext;
