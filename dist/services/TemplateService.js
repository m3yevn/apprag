"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillTemplate = exports.writeTemplate = exports.readTemplateFromFile = exports.readTemplateFromUrl = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = require("fs");
const axios_1 = __importDefault(require("axios"));
const readTemplateFromUrl = (path) => {
    return new Promise((resolve, reject) => {
        axios_1.default
            .get(path)
            .then((result) => {
            resolve(result.data);
        })
            .catch((err) => {
            reject(err);
        });
    });
};
exports.readTemplateFromUrl = readTemplateFromUrl;
const readTemplateFromFile = (path) => {
    return new Promise((resolve, reject) => {
        (0, fs_1.readFile)(path, { encoding: "utf-8" }, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};
exports.readTemplateFromFile = readTemplateFromFile;
const writeTemplate = (path, data) => {
    return new Promise((resolve, reject) => {
        (0, fs_1.writeFile)(path, data, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve("");
        });
    });
};
exports.writeTemplate = writeTemplate;
const fillTemplate = (html, replacements) => {
    return handlebars_1.default.compile(html)(replacements);
};
exports.fillTemplate = fillTemplate;
