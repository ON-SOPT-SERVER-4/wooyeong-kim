const members = require("./members");

function getFemale(members) {
  return new Promise(function (resolve, reject) {
    const females = members.filter((member) => member.gender === "여");
    resolve(females);
  });
}

function getYB(members) {
  return new Promise(function (resolve, reject) {
    const YBs = members.filter((member) => member.status === "YB");
    resolve(YBs);
  });
}

function getiOS(members) {
  return new Promise(function (resolve, reject) {
    const iOS = members.filter((member) => member.part === "iOS");
    resolve(iOS);
  });
}

getFemale(members)
  .then((members) => getYB(members))
  .then((members) => getiOS(members))
  .then((members) => {
    console.log(members);
  });
