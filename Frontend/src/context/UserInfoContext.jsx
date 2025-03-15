import React, { useState, createContext } from 'react';

export const UserDataContext = createContext();

function UserInfoContext({ children }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [hiddenFile, setHiddenFile] = useState(null);
  const [decryptFile, setDecryptFile] = useState(null);
  const [decryptData, setDecryptData] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  return (
    <UserDataContext.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
        desc,
        setDesc,
        selectedFile,
        setSelectedFile,
        hiddenFile,
        setHiddenFile,
        decryptFile,
        setDecryptFile,
        decryptData,
        setDecryptData,
        imgSrc,
        setImgSrc,
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export default UserInfoContext;
