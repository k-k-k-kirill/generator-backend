const execFile = require('child_process').execFile;
const path = require('path');

const child = execFile('../Generator_artefacts/Generator', [], (error, stdout, stderr) => {
    if (error) {
        console.error('stderr', stderr);
        throw error;
    }
    console.log('stdout', stdout);
});