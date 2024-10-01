import CryptoJS from 'react-native-crypto-js';

export const decryptUrl = () => {
    const PYSNYC_ID = process.env.PYSNYC_ID;
    const PYSNYC_KEY = process.env.PYSNYC_KEY;
    const PYSNYC_IV = process.env.PYSNYC_IV;

    try {
        // Convert key and IV to correct format
        const key = CryptoJS.enc.Hex.parse(PYSNYC_KEY);
        const iv = CryptoJS.enc.Hex.parse(PYSNYC_IV);

        // The PYSNYC_ID may be a Base64 encoded string, so we should decode it first
        const encryptedHexStr = CryptoJS.enc.Hex.parse(PYSNYC_ID);
        const encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);

        // Decrypt the data
        const decrypted = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        // Convert the decrypted data to UTF-8
        const decryptedUrl = decrypted.toString(CryptoJS.enc.Utf8);

        return decryptedUrl;
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
};


 // Function to handle decryption of "nexa"
 export const decryptNexa = (nexa: string, key: string, iv: string) => {
    try {
        // Log the received values for debugging
        console.log('Nexa (Encrypted):', nexa);
        console.log('Key (Hex):', key);
        console.log('IV (Hex):', iv);

        // If nexa is hex-encoded, we can parse it as Hex.
        const encryptedHex = CryptoJS.enc.Hex.parse(nexa);
        const encryptedBase64 = CryptoJS.enc.Base64.stringify(encryptedHex);

        // Perform the decryption
        const decrypted = CryptoJS.AES.decrypt(encryptedBase64, CryptoJS.enc.Hex.parse(key), {
            iv: CryptoJS.enc.Hex.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        // Convert the decrypted data to UTF-8
        const decryptedUrl = decrypted.toString(CryptoJS.enc.Utf8);
        console.log('Decrypted Nexa URL:', decryptedUrl);

        if (!decryptedUrl) {
            console.error('Decryption returned an empty string.');
        }

        return decryptedUrl;
    } catch (error) {
        console.error('Decryption error for nexa:', error);
        return null;
    }
};
