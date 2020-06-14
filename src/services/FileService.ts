import fs from "fs";
import handlebars from "handlebars";

export const readTemplate = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf-8" }, (err, template) => {
      if (err) {
        return reject(err);
      }
      return resolve(template);
    });
  });
};

export const writeTemplate = (path: string, data: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
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
