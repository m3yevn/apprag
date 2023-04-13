export const README_PATH = "/README.md";
export const CONFIG_PATH = "/apprag.config.js";
export const CREATE_FILE_CMD =
  process.platform === "win32" ? "type nul > " : "touch ";
export const REPO_PATH =
  process.platform === "win32"
    ? process.cwd().replace(/\\/g, "/")
    : process.cwd();
