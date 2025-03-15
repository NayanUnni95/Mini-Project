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
const cleanUpData = (uname, pass, url, desc) => {
  const finalData = {
    username: uname,
    password: pass,
    url: url,
    desc: desc,
    primaryKey: Date.now(),
  };
  return JSON.stringify(finalData);
};

export { encryptMessage, decryptMessage, cleanUpData };
