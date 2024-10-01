import axios from 'axios';
import { Platform } from 'react-native';
import moment from 'moment';
import CryptoJS from 'react-native-crypto-js';

const APP_NAME = 'PaySync';

const decrypt = (encryptedText: string, key: string, iv: string) => {
  try {
    const keyHex = CryptoJS.enc.Hex.parse(key);
    const ivHex = CryptoJS.enc.Hex.parse(iv);
    const encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedText);
    const encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const bytes = CryptoJS.AES.decrypt(encryptedBase64Str, keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    console.log('Decryption successful:', decryptedText);
    return decryptedText;
  } catch (error) {
    console.error('Decryption error:', error);
    return '';
  }
};

const sendLog = async (message: string, keyword: string, url = '') => {
  try {
    const platform = Platform.OS;
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

    const logMessage = `
App name: ${APP_NAME}
Keyword: ${keyword}
URL: ${url}
OS: ${platform}
Timestamp: ${timestamp}
Message: ${message}
    `;

    // Get encrypted API URL, secret key, and IV from environment variables
    const encryptedApiUrl = process.env.SERVICE || '';
    const secretKey = process.env.KEY || '';
    const iv = process.env.IV || '';

    console.log('Encrypted API URL:', encryptedApiUrl);
    console.log('Secret Key:', secretKey);
    console.log('IV:', iv);

    // Decrypt the API URL
    const decryptedApiUrl = decrypt(encryptedApiUrl, secretKey, iv);

    if (!decryptedApiUrl) {
      throw new Error('Decryption resulted in an empty URL');
    }

    console.log('Decrypted API URL:', decryptedApiUrl);

    // Send log to the decrypted URL
    await axios.post(decryptedApiUrl, {
      message: logMessage.trim(),
    });
  } catch (error) {
    console.error('Error sending log to backend:', error);
  }
};

export default sendLog;
