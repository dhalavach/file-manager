import { EOL, cpus, homedir, userInfo, arch } from 'os';

const getOsInfo = (arg) => {
  switch (arg) {
    case '--eol': {
      console.log(EOL);
      break;
    }
    case '--cpus': {
      console.log(cpus());
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
