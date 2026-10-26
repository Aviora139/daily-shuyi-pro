export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Season = "春" | "夏" | "秋" | "冬";
export type Element = "金" | "水" | "火" | "木" | "土";
export type OutfitStyle = "feminine" | "masculine" | "neutral";

export interface LocalDate { year: number; month: number; day: number }
export interface Pyramid { first: [Digit, Digit, Digit, Digit]; second: [Digit, Digit]; result: Digit }
export interface Birthday { year: number; month: number; day: number }
export interface DayAnalysis {
  date: LocalDate;
  annual: Pyramid;
  monthly: Pyramid;
  daily: Pyramid;
  annualSeason: Season;
  monthlySeason: Season;
  dailySeason: Season;
  element: Element;
}
