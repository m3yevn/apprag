import { spawn } from "child_process";

export const spawnProcess = (
  command: string,
  args?: string[]
): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const options = { shell: true };
    const child = spawn(command, args, options);
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
