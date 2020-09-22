import fs from 'fs';

const fileNames: string[] = [];

findDataFileNamesInDir(__dirname + '\\..\\..\\inputData\\', fileNames);

// every 10 seconds, copy the next file into the "receivedByIngestor" 
// folder within the "inputData" folder
while (fileNames.length > 0) {
    // copy file into dir
    // how to copy files? seems difficult

    // wait
}

// obtain names etc of all input data files
function findDataFileNamesInDir(absoluteDir, fileNamesArray) {
  let i = 0;
  fs.readdirSync(absoluteDir).forEach((file) => {
    i += 1;
    fileNamesArray.push(absoluteDir + file);
  });
  console.log(i + ' files found');
}


