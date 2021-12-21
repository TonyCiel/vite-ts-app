import CryptoJS from 'crypto-js';
// aesECB加密
export const encryptAES  = (content: string,key :string) => {
  const keys = CryptoJS.enc.Utf8.parse(key);
  return CryptoJS.AES.encrypt(content, keys, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
}
// aes解密
export const decryptAES = (content,key) => {
  const keys = CryptoJS.enc.Utf8.parse(key);
  return CryptoJS.AES.decrypt(content, keys, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8)
}

