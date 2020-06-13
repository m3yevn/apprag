import { Options } from "./constants/options";
import { DefaultOption } from "./options/DefaultOption";

export function Main() {
  const options = process.argv[2];
  switch (options) {
    case Options.init:
      break;
    default:
      DefaultOption();
      break;
  }
}
