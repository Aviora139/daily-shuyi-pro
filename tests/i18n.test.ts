import { describe, expect, it } from "vitest";
import { REVERSE_UI_TRANSLATIONS, translateText } from "@/lib/i18n";

describe("language switch vocabulary", () => {
  it("translates shared labels in both directions", () => {
    expect(translateText("首页", "en")).toBe("Home");
    expect(translateText("Home", "zh")).toBe("首页");
    expect(REVERSE_UI_TRANSLATIONS["Daily Shuyi Guide"]).toBe("每日数易指南");
  });

  it("leaves dates, numbers, and unknown copy untouched", () => {
    expect(translateText("2026年10月25日", "en")).toBe("October 25, 2026");
    expect(translateText("custom user note", "en")).toBe("custom user note");
  });
});
