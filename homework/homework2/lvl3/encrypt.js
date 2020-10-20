// fs 모듈을 이용하여 비동기적으로 비밀번호 암호화하기 (암호화된 문자열을 파일에 write 하면 됩니다!)

// Import modules
const fs = require("fs");
const util = require("util");
const crypto = require("crypto");

// Define password and filename
const password = "a_very_random_password";
const fileName = "greatFile";

// Promisify encryption functions
const pbkdf2Promise = util.promisify(crypto.pbkdf2);
const randomBytesPromise = util.promisify(crypto.randomBytes);
const writeFilePromise = util.promisify(fs.writeFile);

// Write encrypted password in file
const writeKey = async (fileName, key) => {
  await writeFilePromise(`${fileName}.txt`, key);
};

// Encryption function
const encrypt = async (data) => {
  try {
    const buf = await randomBytesPromise(64);
    const salt = buf.toString("base64");
    const key = await pbkdf2Promise(data, salt, 100000, 64, "sha512");
    const encryptedPassword = key.toString("base64");
    await writeKey(fileName, encryptedPassword);
    return key.toString("base64");
  } catch (error) {
    console.log(error);
  }
};

encrypt(password);
