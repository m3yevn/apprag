import { spawnProcess } from "../services/SpawnService";
import {
  readTemplate,
  fillTemplate,
  writeTemplate,
} from "../services/FileService";
import { existsSync } from "fs";

export const DefaultOption = async () => {
  try {
    await spawnProcess("touch", [process.cwd() + "/README.md"]);
    const template = await readTemplate("templates/Default.md");
    const replacements = await getReplacements();
    const filledTemplate = fillTemplate(template, replacements);
    await writeTemplate(process.cwd() + "/README.md", filledTemplate);
  } catch (ex) {
    console.error(ex);
  }
};

const getReplacements = async () => {
  let licenseFile;
  const packageInfo = require(process.cwd() + "/package.json");
  const licenseExists = existsSync(process.cwd() + "/LICENSE");
  if (licenseExists) {
    licenseFile = await getLicense();
  }

  return {
    ...packageInfo,
    name: packageInfo.name
      ? (packageInfo.name as string).charAt(0).toUpperCase() +
        (packageInfo.name as string).slice(1)
      : "This project name",
    funFacts: packageInfo.funFacts
      ? renderList(packageInfo.funFacts as string[], " - **{}**")
      : "This project is awesome!",
    badges: packageInfo.badges
      ? renderList(packageInfo.badges as string[], "{}")
      : "This project is well tested!",
    techStacks: packageInfo.techStacks
      ? renderList(packageInfo.techStacks as string[], " - {}")
      : "This project is using awesome tech stacks!",
    publicUrl:
      packageInfo.publicUrl || "This project is not published to public!",
    screenshots: packageInfo.screenshots
      ? renderList(packageInfo.screenshots as string[], " - <img src=\"{}\" />")
      : "This project does not have screenshots available.",
    scripts:
      packageInfo.scripts && structureScripts(packageInfo.scripts).length
        ? renderList(structureScripts(packageInfo.scripts), "{}")
        : "This project does not have scripts to run.",
    bugUrl:
      packageInfo.bugs && packageInfo.bugs.url
        ? packageInfo.bugs.url
        : "Visit the repository to open bug reports and issues",
    license: packageInfo.license
      ? licenseExists
        ? licenseFile
        : packageInfo.license
      : "This project does not have a license.",
    dependencies:
      packageInfo.dependencies &&
      structureDependencies(packageInfo.dependencies).length
        ? renderList(structureScripts(packageInfo.dependencies), " - {}")
        : "This project does not have dependencies",
    devDependencies:
      packageInfo.devDependencies &&
      structureDependencies(packageInfo.devDependencies).length
        ? renderList(structureScripts(packageInfo.devDependencies), " - {}")
        : "This project does not have dev dependencies",
    animations: packageInfo.animations
      ? renderList(packageInfo.animations, "<img src=\"{}\"")
      : "<img src=\"https://cdn.dribbble.com/users/2401141/screenshots/5487982/developers-gif-showcase.gif\"/>",
    footer: packageInfo.footer || "Happy Coding!",
  };
};

const getLicense = async () => {
  try {
    const licenseFile = await readTemplate(process.cwd() + "/LICENSE");
    return licenseFile;
  } catch (ex) {
    console.error(ex);
  }
};

const structureDependencies = (deps: any): string[] => {
  const keys = Object.keys(deps);
  const values = Object.values(deps);
  const scriptString: string[] = [];
  if (keys && values) {
    for (let i = 0; i < values.length; i++) {
      scriptString.push(`${keys[i]} : ${values[i]}`);
    }
    return scriptString;
  }
  return [];
};

const structureScripts = (scripts: any): string[] => {
  const keys = Object.keys(scripts);
  const values = Object.values(scripts);
  const scriptString: string[] = [];
  if (keys && values) {
    for (let i = 0; i < values.length; i++) {
      scriptString.push(`${keys[i]} : $ ${values[i]}`);
    }
    return scriptString;
  }
  return [];
};

const renderList = (loops: string[], format: string) => {
  let renderedString: string = "";
  for (const loop of loops) {
    renderedString += format.replace("{}", loop) + "\r\n";
  }
  return renderedString;
};
