import os from 'os';

const getCPUS = () => {
  const cpus = os.cpus();

  console.log(`Total CPUs: ${cpus.length}`);

  cpus.forEach((cpu, i) => {
    console.log(`${i + 1}. ${cpu.model} @ ${cpu.speed / 1000} GHz`);
  });
}

const getEOL = () => console.log(`${os.EOL}`);
const getHomeDir = () => os.homedir();
const getUserName = () => os.userInfo().username;
const getArchitecture = () => os.arch();

const doCommand = async (command) => {
  const cmd = command.slice(2);
  let result = null;

  switch (cmd) {
    case 'EOL': getEOL();
      return;
    case 'cpus': getCPUS();
      return;
    case 'homedir': result = getHomeDir();
      break;
    case 'username': result = getUserName();
      break;
    case 'architecture': result = getArchitecture();
      break;
    default:
      console.log('Invalid input');
      break;
  }

  console.log(result)
}

export { doCommand, getHomeDir };
