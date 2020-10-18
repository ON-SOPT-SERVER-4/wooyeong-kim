const quit = true;

const midSchool = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Middle School`);
    }, 1000);
  });

const highSchool = (school) =>
  new Promise((resolve, reject) => {
    if (quit) {
      setTimeout(() => {
        reject(new Error("검정고시"));
      }, 1000);
    } else {
      setTimeout(() => {
        resolve(`${school} High school`);
      }, 1000);
    }
  });

const univ = (school) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${school} univ`);
    }, 1000);
  });

midSchool()
  .then((school) => highSchool(school))
  .catch((err) => {
    return `검정고시`;
  })
  .then((school) => univ(school))
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
