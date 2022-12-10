import process from "process";
import fs from 'fs';
import shell from 'shelljs';

const inputJSON = (): Input => {
    const data = fs.readFileSync(process.argv[2]).toString();
    shell.cd(process.argv[3]);
    console.log(`cd into ${process.argv[3]}`);
    return JSON.parse(data) as Input;
}

interface Input {
    [key: string]: Input | string[]
}

const genf = (input: Input) => {
    console.log(input);
    for (const key of Object.keys(input)) {
        console.log(key);
        if (Array.isArray(input[key])) {

            (input[key] as string[]).forEach(f => {
                shell.exec(`touch ${f}`)
                console.log(`Creating file ${f}`);
            })
        }
        else {
            console.log(`Creating dir ${key}`);
            shell.exec(`mkdir ${key}`);
            shell.cd(key);
            genf(input[key] as Input);
            shell.cd(`..`);
        }
    }
}

genf(inputJSON());


