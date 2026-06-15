"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawnProcess = void 0;
const child_process_1 = require("child_process");
const spawnProcess = (command, args) => {
    return new Promise((resolve, reject) => {
        const options = { shell: true };
        const child = (0, child_process_1.spawn)(command, args, options);
        //Returns success output
        child.stdout.on("data", (resultChunk) => {
            return resolve(resultChunk.toString("utf-8"));
        });
        //Returns error output
        child.stderr.on("data", (errorChunk) => {
            return reject(errorChunk.toString("utf-8"));
        });
        //Caught error
        child.on("error", (error) => {
            console.log(error);
            return reject(error);
        });
        //Closing
        child.on("close", () => {
            return resolve(undefined);
        });
    });
};
exports.spawnProcess = spawnProcess;
