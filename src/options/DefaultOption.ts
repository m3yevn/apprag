import { spawnProcess } from "../services/SpawnService";

export const DefaultOption = async () => {
  await spawnProcess("touch",["README.md"]); 
};
