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

async function func1() {
  try {
    const middle = await midSchool();
    const high = await highSchool(middle);
    const univercity = await univ(high);
    console.log(univercity);
    return univ;
  } catch (error) {
    console.log(error);
  }
}

func1();
