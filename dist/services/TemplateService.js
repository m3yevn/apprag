"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillTemplate = exports.writeTemplate = exports.readTemplate = void 0;
var handlebars_1 = __importDefault(require("handlebars"));
var https_1 = require("https");
var fs_1 = require("fs");
exports.readTemplate = function (path) {
  return new Promise(function (resolve, reject) {
    https_1.request(path, function (result) {
      var data = "";
      // A chunk of data has been recieved.
      result.on("data", function (chunk) {
        data += chunk;
      });
      // The whole response has been received. Print out the result.
      result.on("end", function () {
        resolve(data);
      });
      result.on("error", function (err) {
        reject(err);
      });
    });
  });
};
exports.writeTemplate = function (path, data) {
  return new Promise(function (resolve, reject) {
    fs_1.writeFile(path, data, function (err) {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};
exports.fillTemplate = function (html, replacements) {
  return handlebars_1.default.compile(html)(replacements);
};
