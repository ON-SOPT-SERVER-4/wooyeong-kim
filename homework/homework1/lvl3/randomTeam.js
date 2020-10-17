const members = require("./member");

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
