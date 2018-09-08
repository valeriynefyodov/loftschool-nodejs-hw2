const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const noSuchFileCode = 'ENOENT';
const fileExistsCode = 'EEXIST';

async function distributeFile(filepath, sortedDir) {
  try {
    const basename = path.basename(filepath),
      firstLetter = basename.charAt(0).toUpperCase(),
      newFileDir = path.join(sortedDir, firstLetter);

    if (!fs.existsSync(newFileDir)) {
      await fsPromises.mkdir(newFileDir);
    }

    const fileData = await fsPromises.readFile(filepath);

    const newFilepath = path.join(newFileDir, basename)
    await fsPromises.writeFile(newFilepath, fileData);

    return newFilepath;
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
}

async function sortDirectory(dirname, sortedDir) {
  try {
    const dirContent = await fsPromises.readdir(dirname);
  
    dirContent.forEach(async function(file) {
      try {
        const filepath = path.join(dirname, file);
        const fileStat = await fsPromises.lstat(filepath);
    
        if (fileStat.isDirectory()) {
          await sortDirectory(filepath, sortedDir);
        } else {
          await distributeFile(filepath, sortedDir);
        }
      } catch (err) {
        console.log(err);
      }
    });

    return dirContent;
  } catch (err) {
    return new Error(err);
  }
}

function sort(messyDir, sortedDir, shouldDelete) {
  return new Promise(function (resolve, reject) {
    fsPromises.lstat(sortedDir)
      .catch(err => {
        if (err.errno === 34) {
          fsPromises.mkdir(sortedDir)
            .then(() => console.log(`Directiory ${sortedDir} was created!`))
            .catch(err => con)
        }
      })
      .then()
  });


  try {
    if (!fs.existsSync(sortedDir)) {
      await fsPromises.mkdir(sortedDir);
    } else {
      const sortedDirStat = await fsPromises.lstat(sortedDir);

      if (!sortedDirStat.isDirectory()) {
        throw new Error(`${sortedDir} is not a directory!`)
      }
    }

    const messyDirStat = await fsPromises.lstat(messyDir);

    if (!messyDirStat.isDirectory()) {
      throw new Error(`${messyDir} is not a directory!`)
    }

    await sortDirectory(messyDir, sortedDir);
    
    return 'Success';
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
}

module.exports = {
  sort: sort
};