import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const UserContext = createContext();

export function AuthProvider({ children }) {
  const [credentials, setCredentials] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        credentials,
        setCredentials,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UserProvider({ children }) {
  const [updatePassword, SetUpdatePassword] = useState(false);
  const [updateProfilePicture, setUpdateProfilePicture] = useState(false);
  const [visibility, setUserVisibility] = useState(false);
  const [userDetails, setOpenUserDetails] = useState(false);

  return (
    <UserContext.Provider
      value={{
        updatePassword,
        SetUpdatePassword,
        updateProfilePicture,
        setUpdateProfilePicture,
        visibility,
        setUserVisibility,
        userDetails,
        setOpenUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
