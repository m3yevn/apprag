"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = Main;
const DefaultOption_1 = require("./options/DefaultOption");
const GenerateConfig_1 = require("./options/GenerateConfig");
function Main() {
    const options = process.argv[2];
    switch (options) {
        case "--config":
            (0, GenerateConfig_1.GenerateConfig)();
            break;
        default:
            (0, DefaultOption_1.DefaultOption)();
            break;
    }
}
