// const members = require("./member");
const members = [
  {
    name: "최정재",
    part: "Server",
    status: "OB",
    gender: "남",
  },
  {
    name: "박남선",
    part: "Server",
    status: "OB",
    gender: "여",
  },
  {
    name: "신민상",
    part: "Server",
    status: "OB",
    gender: "남",
  },
  {
    name: "강효원",
    part: "Server",
    status: "OB",
    gender: "여",
  },
  {
    name: "류세훈",
    part: "Server",
    status: "OB",
    gender: "여",
  },
  {
    name: "이가영",
    part: "Server",
    status: "OB",
    gender: "여",
  },
  {
    name: "이영현",
    part: "Server",
    status: "OB",
    gender: "여",
  },
  {
    name: "남궁찬",
    part: "Server",
    status: "OB",
    gender: "남",
  },
  {
    name: "김민주",
    part: "Server",
    status: "OB",
    gender: "여",
  },
  {
    name: "최정훈",
    part: "Server",
    status: "OB",
    gender: "여",
  },
  {
    name: "박주은",
    part: "Server",
    status: "OB",
    gender: "여",
  },
  {
    name: "이현준",
    part: "Server",
    status: "OB",
    gender: "여",
  },
  {
    name: "김수민",
    part: "Server",
    status: "OB",
    gender: "여",
  },
  {
    name: "김현상",
    part: "Server",
    status: "OB",
    gender: "여",
  },
  {
    name: "김채림",
    part: "Server",
    status: "OB",
    gender: "여",
  },
  {
    name: "이현상",
    part: "Server",
    status: "YB",
    gender: "남",
  },
  {
    name: "홍혜진",
    part: "Server",
    status: "YB",
    gender: "여",
  },
  {
    name: "오승준",
    part: "Server",
    status: "YB",
    gender: "남",
  },
  {
    name: "양재욱",
    part: "Server",
    status: "YB",
    gender: "남",
  },
  {
    name: "최선준",
    part: "Server",
    status: "YB",
    gender: "남",
  },
  {
    name: "박상수",
    part: "Server",
    status: "YB",
    gender: "남",
  },
  {
    name: "임찬기",
    part: "Server",
    status: "YB",
    gender: "남",
  },
  {
    name: "박진호",
    part: "Server",
    status: "YB",
    gender: "남",
  },
  {
    name: "신지한",
    part: "Server",
    status: "YB",
    gender: "여",
  },
  {
    name: "김영은",
    part: "Server",
    status: "YB",
    gender: "여",
  },
  {
    name: "송정훈",
    part: "Server",
    status: "YB",
    gender: "남",
  },
  {
    name: "강준수",
    part: "Server",
    status: "YB",
    gender: "남",
  },
  {
    name: "김중현",
    part: "Server",
    status: "YB",
    gender: "여",
  },
  {
    name: "김기찬",
    part: "Server",
    status: "YB",
    gender: "남",
  },
  {
    name: "김우영",
    part: "Server",
    status: "YB",
    gender: "남",
  },
  {
    name: "윤가인",
    part: "Server",
    status: "YB",
    gender: "여",
  },
  {
    name: "이예진",
    part: "Server",
    status: "YB",
    gender: "여",
  },
  {
    name: "박수진",
    part: "Server",
    status: "YB",
    gender: "여",
  },
  {
    name: "최다슬",
    part: "Server",
    status: "YB",
    gender: "여",
  },
  {
    name: "한승아",
    part: "Server",
    status: "YB",
    gender: "여",
  },
  {
    name: "김재은",
    part: "Server",
    status: "YB",
    gender: "여",
  },
];
const membersOB = members.filter((member) => member.status === "OB");
console.log(membersOB.length);
const membersYB = members.filter((member) => member.status === "YB");
console.log(membersYB.length);

const setTeamSettings = ({ numberOfGroups }) => {
  const numberOfMembersInAGroup = Math.round(members.length / numberOfGroups);
  console.log(numberOfMembersInAGroup);
  const ratio = membersOB.length / membersYB.length;
  console.log(ratio);
  const numberOfYBsInAGroup = Math.round(numberOfMembersInAGroup / (ratio + 1));
  console.log(numberOfYBsInAGroup);
  const numberOfOBsInAGroup = numberOfMembersInAGroup - numberOfYBsInAGroup;
  console.log(numberOfOBsInAGroup);
  return { numberOfOBsInAGroup, numberOfYBsInAGroup };
};

const makeTeam = ({ numberOfOBsInAGroup, numberOfYBsInAGroup, teamId }) => {
  let team = {};
  let members = [];
  for (o = 0; o < numberOfOBsInAGroup; o++) {
    const { length: lengthOB } = membersOB;
    const indexOB = Math.floor(Math.random() * lengthOB);
    const [randomOB] = membersOB.splice(indexOB, 1);
    members.push(randomOB);
  }
  for (y = 0; y < numberOfYBsInAGroup; y++) {
    const { length: lengthYB } = membersYB;
    const indexYB = Math.floor(Math.random() * lengthYB);
    const [randomYB] = membersYB.splice(indexYB, 1);
    members.push(randomYB);
  }
  team["teamId"] = teamId;
  team["members"] = members;
  console.log(team);
  console.log(members.length);
  return team;
};

const makeTeams = (number) => {
  let teams = [];
  const { numberOfOBsInAGroup, numberOfYBsInAGroup } = setTeamSettings({
    numberOfGroups: number,
  });
  for (j = 1; j <= number; j++) {
    teams.push(
      makeTeam({ numberOfOBsInAGroup, numberOfYBsInAGroup, teamId: j }),
    );
  }
  console.table(teams);
  console.log(teams.length);
  return teams;
};

makeTeams(4);
