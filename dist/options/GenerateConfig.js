"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateConfig = void 0;
const constants_1 = require("../constants");
const SpawnService_1 = require("../services/SpawnService");
const TemplateService_1 = require("../services/TemplateService");
const GenerateConfig = async () => {
    try {
        await (0, SpawnService_1.spawnProcess)(constants_1.CREATE_FILE_CMD + constants_1.REPO_PATH + constants_1.CONFIG_PATH, []);
        const template = await (0, TemplateService_1.readTemplateFromUrl)("https://raw.githubusercontent.com/m3yevn/apprag/master/templates/apprag.config.js");
        await (0, TemplateService_1.writeTemplate)(constants_1.REPO_PATH + constants_1.CONFIG_PATH, template);
    }
    catch (ex) {
        console.error(ex);
    }
};
exports.GenerateConfig = GenerateConfig;
