"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillTemplate = exports.writeTemplate = exports.readTemplate = void 0;
var fs_1 = __importDefault(require("fs"));
var handlebars_1 = __importDefault(require("handlebars"));
exports.readTemplate = function (path) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(path, { encoding: "utf-8" }, function (err, template) {
            if (err) {
                return reject(err);
            }
            return resolve(template);
        });
    });
};
exports.writeTemplate = function (path, data) {
    return new Promise(function (resolve, reject) {
        fs_1.default.writeFile(path, data, function (err) {
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
