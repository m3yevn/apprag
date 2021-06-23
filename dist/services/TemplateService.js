"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillTemplate =
  exports.writeTemplate =
  exports.readTemplateFromFile =
  exports.readTemplateFromUrl =
    void 0;
var handlebars_1 = __importDefault(require("handlebars"));
var fs_1 = require("fs");
var axios_1 = __importDefault(require("axios"));
exports.readTemplateFromUrl = function (path) {
  return new Promise(function (resolve, reject) {
    axios_1.default
      .get(path)
      .then(function (result) {
        resolve(result.data);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};
exports.readTemplateFromFile = function (path) {
  return new Promise(function (resolve, reject) {
    fs_1.readFile(path, { encoding: "utf-8" }, function (error, result) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};
exports.writeTemplate = function (path, data) {
  return new Promise(function (resolve, reject) {
    fs_1.writeFile(path, data, function (err) {
      if (err) {
        return reject(err);
      }
      return resolve("");
    });
  });
};
exports.fillTemplate = function (html, replacements) {
  return handlebars_1.default.compile(html)(replacements);
};
