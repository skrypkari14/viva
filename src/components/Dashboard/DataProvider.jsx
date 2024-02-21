import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();


export const ContextProvider = ({ children }) => {
  const [isSidebarActive, setSidebarActive] = useState(false);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ isSidebarActive, setSidebarActive }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);