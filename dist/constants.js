"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REPO_PATH = exports.CREATE_FILE_CMD = exports.CONFIG_PATH = exports.README_PATH = void 0;
exports.README_PATH = "/README.md";
exports.CONFIG_PATH = "/apprag.config.js";
exports.CREATE_FILE_CMD = process.platform === "win32" ? "type nul > " : "touch ";
exports.REPO_PATH = process.platform === "win32"
    ? process.cwd().replace(/\\/g, "/")
    : process.cwd();
