const util = require("util");
const fs = require("fs");

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const updateUsersDB = async (data) => {
  await readFilePromise(__dirname + "/users.js");
  console.log(data);
  await writeFilePromise(
    __dirname + "/users.js",
    "const usersDB = " + JSON.stringify(data) + ";\nmodule.exports = usersDB;",
  );
  return 0;
};

module.exports = updateUsersDB;
