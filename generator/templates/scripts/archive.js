const zipdir = require('zip-dir');
const fs = require('fs');

const pathFrom = process.argv[2];
let pathTo = process.argv[3];

console.log('Start zipping');
if (pathFrom) {
    if (!pathTo) pathTo = `${pathFrom}.zip`;
    fs.exists(pathTo, (exist) => {
        if (exist) {
            fs.unlink(pathTo, (err) => {
                if (err) throw new Error(err);
            });
        }
        zipdir(pathFrom, { saveTo: pathTo }, (err) => {
            if (err) throw new Error(err);
            else {
                console.log('Archieved successfully');
            }
        });
    });
} else {
    throw new Error('Path from undefined');
}
