import { spawnProcess } from "../services/SpawnService";
import {
  fillTemplate,
  writeTemplate,
  readTemplateFromUrl,
  readTemplateFromFile,
} from "../services/TemplateService";
import { existsSync } from "fs";
import { readLine } from "../services/ReadlineService";

const README_PATH = "/README.md";
const CREATE_FILE_CMD = process.platform === "win32" ? "type nul > " : "touch";
const REPO_PATH =
  process.platform === "win32"
    ? process.cwd().replace(/\\/g, "/")
    : process.cwd();

export const DefaultOption = async () => {
  try {
    await spawnProcess(CREATE_FILE_CMD + REPO_PATH + README_PATH, []);
    const template = await readTemplateFromUrl(
      "https://raw.githubusercontent.com/m3yevn/apprag/master/templates/Default.md"
    );
    const replacements = await getReplacements();
    const filledTemplate = fillTemplate(template, replacements);
    await writeTemplate(REPO_PATH + README_PATH, filledTemplate);
  } catch (ex) {
    console.error(ex);
  }
};

const getPackage = () => {
  try {
    return require(process.cwd() + "/package.json");
  } catch (ex) {
    console.error("There is no package.json inside the directory.");
  }
};

const getReplacements = async () => {
  let licenseFile;
  const packageInfo = getPackage();
  const licenseExists = existsSync(process.cwd() + "/LICENSE");
  if (licenseExists) {
    licenseFile = await getLicense();
  }

  if (!packageInfo.name) {
    readLine(
      "There is no name for this project. Please enter the name.\r\n",
      (answer: any) => {
        packageInfo.name = answer;
        writeTemplate(
          REPO_PATH + "/package.json",
          JSON.stringify(packageInfo, null, "\t")
        );
      }
    );
  }

  if (!packageInfo.version) {
    packageInfo.version = packageInfo.version ?? "1.0";
  }
  if (!packageInfo.author) {
    packageInfo.author = "";
  }
  if (!packageInfo.funFacts) {
    packageInfo.funFacts = [];
  }
  if (!packageInfo.badges) {
    packageInfo.badges = [];
  }
  if (!packageInfo.techStacks) {
    packageInfo.techStacks = [];
  }
  if (!packageInfo.publicUrl) {
    packageInfo.publicUrl = "";
  }
  if (!packageInfo.screenshots) {
    packageInfo.screenshots = [];
  }

  writeTemplate(
    REPO_PATH + "/package.json",
    JSON.stringify(packageInfo, null, "\t")
  );

  return {
    ...packageInfo,
    name: packageInfo.name
      ? (packageInfo.name as string).charAt(0).toUpperCase() +
        (packageInfo.name as string).slice(1)
      : "This project name",
    funFacts: packageInfo.funFacts?.length
      ? renderList(packageInfo.funFacts as string[], " - {}")
      : "",
    badges: packageInfo.badges?.length
      ? renderList(packageInfo.badges as string[], "{}")
      : "",
    techStacks: packageInfo.techStacks?.length
      ? renderList(packageInfo.techStacks as string[], " - {}")
      : "N.A",
    publicUrl: packageInfo.publicUrl || "N.A",
    screenshots: packageInfo.screenshots?.length
      ? renderList(packageInfo.screenshots as string[], " - <img src=\"{}\" />")
      : "N.A",
    scripts:
      packageInfo.scripts && structureScripts(packageInfo.scripts).length
        ? renderList(structureScripts(packageInfo.scripts), "{}")
        : "N.A",
    bugUrl:
      packageInfo.bugs && packageInfo.bugs.url
        ? packageInfo.bugs.url
        : "Visit the repository to open bug reports and issues",
    license: licenseExists
      ? licenseFile
      : packageInfo.license || "This project does not have a license.",
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
    const licenseFile = await readTemplateFromFile(process.cwd() + "/LICENSE");
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
