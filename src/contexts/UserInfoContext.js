import React, { createContext, useState, useContext } from 'react';

// Create context
const UserInfoContext = createContext();

// Create a provider component
export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    location: '',
    bio: '',
    birthday: new Date(),
    genderIdentity: '',
    interestedIn: [],
    
  });

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

// Custom hook to access the context
export const useUserInfo = () => useContext(UserInfoContext);
