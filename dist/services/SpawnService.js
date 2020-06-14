"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawnProcess = void 0;
var child_process_1 = require("child_process");
exports.spawnProcess = function (command, args) {
  return new Promise(function (resolve, reject) {
    var child = child_process_1.spawn(command, args);
    //Returns success output
    child.stdout.on("data", function (resultChunk) {
      return resolve(resultChunk.toString("utf-8"));
    });
    //Returns error output
    child.stderr.on("data", function (errorChunk) {
      return reject(errorChunk.toString("utf-8"));
    });
    //Caught error
    child.on("error", function (error) {
      return reject(error);
    });
    //Closing
    child.on("close", function () {
      return resolve();
    });
  });
};
