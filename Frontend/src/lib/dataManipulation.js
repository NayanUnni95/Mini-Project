import CryptoJS from 'crypto-js';

// Encrypt message using AES
const encryptMessage = (message, password) => {
  return CryptoJS.AES.encrypt(message, password).toString();
};

// Decrypt extracted message
const decryptMessage = (cipherText, password) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, password);
  return bytes.toString(CryptoJS.enc.Utf8);
};
const cleanUpData = (uname, pass, name, desc) => {
  const finalData = {
    username: uname,
    password: pass,
    // name: name,
    desc: desc,
    primaryKey: Date.now(),
  };
  return JSON.stringify(finalData);
};

const convertToJson = (data) => {
  return JSON.parse(data);
};

export { encryptMessage, decryptMessage, cleanUpData, convertToJson };
