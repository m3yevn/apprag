import { describe, expect, it } from "vitest";
import { README_PATH, CONFIG_PATH } from "../src/constants";

describe("apprag constants", () => {
  it("defines standard paths", () => {
    expect(README_PATH).toBe("/README.md");
    expect(CONFIG_PATH).toBe("/apprag.config.js");
  });
});
