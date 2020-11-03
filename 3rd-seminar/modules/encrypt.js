// Import modules
const util = require("util");
const crypto = require("crypto");

// Promisify encryption functions
const pbkdf2Promise = util.promisify(crypto.pbkdf2);
const randomBytesPromise = util.promisify(crypto.randomBytes);

// Encryption function
const encrypt = async (data, saltForCheck) => {
  try {
    const buf = await randomBytesPromise(64);
    const salt = saltForCheck || buf.toString("base64");
    const key = await pbkdf2Promise(data, salt, 100000, 64, "sha512");
    const encryptedPassword = key.toString("base64");
    return { salt, encryptedPassword };
  } catch (error) {
    console.log(error);
  }
};

module.exports = encrypt;
