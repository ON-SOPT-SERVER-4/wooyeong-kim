const members = [
  {
    name: "김우영",
    address: "서울대입구",
    age: 24,
    hobby: "피아노 치기",
  },
  {
    name: "이영은",
    address: "건대입구",
    age: 24,
    hobby: "운동",
  },
  {
    name: "정효원",
    address: "성신여대입구",
    age: 24,
    hobby: "친구 만나기",
  },
  {
    name: "류세화",
    address: "교대",
    age: 23,
    hobby: "유튜브 보기",
  },
  {
    name: "송정우",
    address: "분당",
    age: 23,
    hobby: "농구 보기",
  },
  {
    name: "이현종",
    address: "인천",
    age: 25,
    hobby: "얘기 들어주기",
  },
  {
    name: "홍혜림",
    address: "오리",
    age: 23,
    hobby: "집콕하기",
  },
];

const displayAllMembers = (members) => {
  console.log("This is a table of all members 🥳");
  console.table(members);
};

const displayInfoByName = (name) => {
  const member = members.filter((member) => member.name === name);
  console.log(`This is info of ${name}`);
  console.table(member);
};

displayAllMembers(members);
displayInfoByName("김우영");
