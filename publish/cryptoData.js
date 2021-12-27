// 轉換DATA加密
export function ecode (value) {
  // const value = document.getElementById('ecode').value;
  const KEY = '農田水利灌溉管理';// <-128位元加密只允許8個中文字或16個英數, 加解密要相同
  const IV = '0000000000000000';// 16位英數, 加解密要相同
  const key = CryptoJS.enc.Utf8.parse(KEY);
  const iv = CryptoJS.enc.Utf8.parse(IV);
  let encrypted = '';
  const srcs = CryptoJS.enc.Utf8.parse(value);
  encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  // alert(encrypted.ciphertext.toString().toUpperCase());
  return encrypted.ciphertext.toString().toUpperCase();
}
// 轉換DATA解密
export function dcode (value) {
  // var value = document.getElementById("dcode").value;
  const KEY = '農田水利灌溉管理';// <-128位元加密只允許8個中文字或16個英數, 加解密要相同
  const IV = '0000000000000000';// 16位英數, 加解密要相同
  const key = CryptoJS.enc.Utf8.parse(KEY);
  const iv = CryptoJS.enc.Utf8.parse(IV);
  const encryptedHexStr = CryptoJS.enc.Hex.parse(value);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  // alert(decryptedStr.toString().toUpperCase());
  return decryptedStr.toString().toUpperCase();
}
