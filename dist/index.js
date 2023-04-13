"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
var DefaultOption_1 = require("./options/DefaultOption");
var GenerateConfig_1 = require("./options/GenerateConfig");
function Main() {
  var options = process.argv[2];
  switch (options) {
    case "--config":
      GenerateConfig_1.GenerateConfig();
      break;
    default:
      DefaultOption_1.DefaultOption();
      break;
  }
}
exports.Main = Main;
