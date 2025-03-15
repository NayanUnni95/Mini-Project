import CryptoJS from 'crypto-js';
// import { Jimp } from 'jimp';
// import { Buffer } from 'buffer';

// Encrypt message using AES
const encryptMessage = (message, password) => {
  return CryptoJS.AES.encrypt(message, password).toString();
};

// Decrypt extracted message
const decryptMessage = (cipherText, password) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, password);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export { encryptMessage, decryptMessage };
