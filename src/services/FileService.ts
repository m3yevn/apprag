import handlebars from "handlebars";
import { request } from "http";
import { writeFile } from "fs";

export const readTemplate = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    request(path, (result) => {
      let data = "";

      // A chunk of data has been recieved.
      result.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      result.on("end", () => {
        resolve(data);
      });

      result.on("error", (err) => {
        reject(err);
      });
    });
  });
};

export const writeTemplate = (path: string, data: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    writeFile(path, data, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

export const fillTemplate = (html: string, replacements: any) => {
  return handlebars.compile(html)(replacements);
};
