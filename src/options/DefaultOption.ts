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
  return packageInfo;
};
