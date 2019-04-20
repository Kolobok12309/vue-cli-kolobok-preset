const Client = require('ssh2-sftp-client');
const fs = require('fs');

function recursiveFiles(dir) {
    return new Promise((res, rej) => {
        fs.readdir(dir, (err, files) => {
            const promises = files.map((file) => {
                const filePath = `${dir}/${file}`;
                return new Promise((resL, rejL) => {
                    fs.stat(filePath, (err, stats) => {
                        if (err) rejL(err);
                        else if (stats.isFile()) {
                            resL(filePath);
                        } else {
                            recursiveFiles(filePath)
                                .then((returnedArr) => {
                                    resL(returnedArr);
                                })
                                .catch((err) => {
                                    rejL(err);
                                });
                        }
                    });
                });
            });
            Promise.all(promises)
                .then((result) => {
                    const arr = result.reduce((arr, elem) => arr.concat(elem), []);
                    res(arr);
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });
    });
}

async function getFilesFromDir(dir) {
    const files = await recursiveFiles(dir);
    return files.map(file => ({
        fullPath: file,
        shortPath: file.split(dir)[1],
    }));
}

const sftp = new Client();

// add path to file key
// Example:
// C:/Users/user/.ssh/gitkraken_rsa
const PATHTOKEY = '';

const privateKey = fs.readFileSync(PATHTOKEY);

const config = {
    host: '127.0.0.1',
    port: '22',
    username: 'user',
    password: 'password',
    privateKey, // if needed
};

// paths
const remoteDirPath = '/var/www/app';
const localeDirPath = './dist';

console.log(`Connecting to ${config.host}:${config.port}`);
sftp.connect(config)
    .then(async () => {
        const arr = [];
        console.log('Sending files');
        arr.push(sftp.fastPut(`${localeDirPath}/index.html`, `${remoteDirPath}/index.html`));
        const files = await getFilesFromDir(`${localeDirPath}/sys`);
        let count = 0;
        files.forEach((file) => {
            arr.push(new Promise((res, rej) => {
                sftp.fastPut(file.fullPath, `${remoteDirPath}/sys${file.shortPath}`).then((data) => {
                    count++;
                    // console.log(count);
                    res(data);
                });
            }));
        });
        return Promise.all(arr);
    })
    .then((data) => {
        console.log('Deploy successfull');
        sftp.end();
    })
    .catch((err) => {
        console.log(`[Deploy] Trouble with connection ${err}`);
        sftp.end();
    });
