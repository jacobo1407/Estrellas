import { createContext, useState } from 'react';
const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
  const [id, setId] = useState(-1);
  const [room, setRoom] = useState(null);
  const [theme, setTheme] = useState('black');
  const [email, setEmail] = useState(null);
  const [filterRooms, setFilterRooms] = useState([]);
  const [imagesRooms, setImagesRooms] = useState([]);
  const [entranceDateContext, setEntranceDateContext] = useState('');
  const [exitDateContext, setExitDateContext] = useState('');

  return (
    <ScreensContext.Provider
      value={{
        id,
        setId,
        room,
        setRoom,
        theme,
        setTheme,
        email,
        setEmail,
        filterRooms,
        setFilterRooms,
        imagesRooms,
        setImagesRooms,
        entranceDateContext,
        setEntranceDateContext,
        exitDateContext,
        setExitDateContext,
      }}>
      {children}
    </ScreensContext.Provider>
  );
};

export default ScreensContext;
