import { DefaultOption } from "./options/DefaultOption";

export function Main() {
  const options = process.argv[2];
  switch (options) {
    default:
      DefaultOption();
      break;
  }
}
