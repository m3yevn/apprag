import { DefaultOption } from "./options/DefaultOption";
import { GenerateConfig } from "./options/GenerateConfig";

export function Main() {
  const options = process.argv[2];
  switch (options) {
    case "--config":
      GenerateConfig();
      break;

    default:
      DefaultOption();
      break;
  }
}
