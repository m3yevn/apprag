import handlebars from "handlebars";
import { writeFile, readFile } from "fs";
import axios from "axios";

export const readTemplateFromUrl = (path: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(path)
      .then((result) => {
        resolve(result.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const readTemplateFromFile = (path: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    readFile(path, { encoding: "utf-8" }, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
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
