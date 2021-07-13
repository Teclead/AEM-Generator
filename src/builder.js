const path = require('path');
const DIALOG = '.dialog.ts';
const start = './';

const exec = require('child_process').exec;

console.log("Looking for files containing .dialog.ts");

const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const isDirectory = source => lstatSync(source).isDirectory()
const getAllFiles = source =>
    readdirSync(source).map(name => join(source, name))
const files = [];


addFiles(start);
function addFiles(dirPath) {
    getAllFiles(path.resolve(dirPath)).forEach(name => {
        // find dialog files
        if (!isDirectory(name) && name.indexOf(DIALOG) > -1) {
            files.push(name);
        }

        // search in every folder but node modules
        if (isDirectory(name) && name.indexOf('node_modules') < 0) {
            addFiles(name);
        }
    })
}

files.forEach(file => {
    // execute each file
    console.log('Run dialog file: ' + file);
    // run the typescript file
    if (process.platform === 'win32') {
        exec('ts-node --compilerOptions {\"\"\"module\"\"\":\"\"\"commonjs\"\"\"} ' + file, (err, t) => {
            console.log(err || t)
        });
    } else {
        exec('ts-node --compiler-options \'{"module": "commonjs"}\' ' + file, (err, t) => {
            console.log(err || t)
        });
    }
});
