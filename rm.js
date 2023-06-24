import { rm } from 'fs/promises';

const remove = async (filePath) => {
  try {
    await rm(filePath);
  } catch (err) {
    console.log(err);
  }
};

export default remove;
