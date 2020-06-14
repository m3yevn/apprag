import { spawnProcess } from "../services/SpawnService";
import { readTemplate, fillTemplate } from "../services/FileService";

export const DefaultOption = async () => {
  try {
    await spawnProcess("touch", ["README.md"]);
    const template = await readTemplate("src/templates/Default.md");
    const replacements = getReplacements();
    const filledTemplate = fillTemplate(template, replacements);
    console.log(filledTemplate);
  } catch (ex) {
    console.error(ex);
  }
};

const getReplacements = () => {
  const packageInfo = require("../../package.json");
  return {
    ...packageInfo,
    name:
      (packageInfo.name as string).charAt(0).toUpperCase() +
      (packageInfo.name as string).slice(1),
    funFacts: renderList(packageInfo.funfacts as string[], "#### {}"),
  };
};

const renderList = (loops: string[], format: string) => {
  let renderedString: string = "";
  for (const loop of loops) {
    renderedString += format.replace("{}", loop) + "\r\n";
  }
  return renderedString;
};
