import path from 'path'

const {exec} = require('child_process');

class Generator {
    private pathToCxxGeneratorDirectory = path.join(__dirname, '../../../engine/Generator_artefacts');
    private commandToExecute: string = `cd ${this.pathToCxxGeneratorDirectory} && ./Generator`;

    public runCxxGenerator() {
        exec(this.commandToExecute, (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`error: ${error}`);
                throw error;
            }

            if(stdout) {
                console.log(`stdout: ${stdout}`);
            }

            if(stderr) {
                console.log(`stderr: ${stderr}`)
            }

        });
    }
}

export default Generator;