import { CREATE_FILE_CMD, CONFIG_PATH, REPO_PATH } from "../constants";
import { spawnProcess } from "../services/SpawnService";
import {
  readTemplateFromUrl,
  writeTemplate,
} from "../services/TemplateService";

export const GenerateConfig = async () => {
  try {
    await spawnProcess(CREATE_FILE_CMD + REPO_PATH + CONFIG_PATH, []);
    const template = await readTemplateFromUrl(
      "https://raw.githubusercontent.com/m3yevn/apprag/master/templates/apprag.config.js"
    );
    await writeTemplate(REPO_PATH + CONFIG_PATH, template);
  } catch (ex) {
    console.error(ex);
  }
};
