import { EOL, cpus, homedir, userInfo, arch } from 'os';

const getOsInfo = (arg) => {
  switch (arg) {
    case '--eol': {
      console.log(EOL);
      break;
    }
    case '--cpus': {
      const numberOfCpuThreads = cpus().length;
      const formattedCpuInfo = cpus().map((cpu) => ({
        Model: cpu.model.trim(),
        Clock_Rate: `${cpu.speed / 1000} Ghz`,
      }));
      console.log(`Overall number of CPUs (threads): ${numberOfCpuThreads}`);
      console.table(formattedCpuInfo);
      break;
    }
    case '--homedir': {
      console.log(homedir());
      break;
    }
    case '--username': {
      console.log(userInfo().username);
      break;
    }
    case '--architecture': {
      console.log(arch());
      break;
    }
    default:
      console.log('please provide a valid argument ');
  }
};

export default getOsInfo;
