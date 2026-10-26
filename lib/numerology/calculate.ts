import { ELEMENT_BY_DIGIT, SEASON_BY_DIGIT } from "./config";
import type { Birthday, DayAnalysis, Digit, LocalDate, Pyramid } from "./types";

export function reduceToDigit(n:number):Digit {
  if (!Number.isInteger(n) || n <= 0) throw new Error("数字必须为正整数");
  return (((n - 1) % 9) + 1) as Digit;
}

function yearParts(year:number):[Digit,Digit] {
  const s = String(year).padStart(4,"0");
  return [reduceToDigit(Number(s.slice(0,2))), reduceToDigit(Number(s.slice(-2)))];
}

function pyramid(a:Digit,b:Digit,c:Digit,d:Digit):Pyramid {
  const e=reduceToDigit(a+b), f=reduceToDigit(c+d);
  return { first:[a,b,c,d],second:[e,f],result:reduceToDigit(e+f) };
}

export function calculateAnnual(birthday:Birthday,date:LocalDate):Pyramid {
  const [a,d]=yearParts(date.year); return pyramid(a,reduceToDigit(birthday.month),reduceToDigit(birthday.day),d);
}
export function calculateMonthly(birthday:Birthday,date:LocalDate):Pyramid {
  const [a,d]=yearParts(date.year); return pyramid(a,reduceToDigit(birthday.month+date.month),reduceToDigit(birthday.day),d);
}
export function calculateDaily(birthday:Birthday,date:LocalDate):Pyramid {
  const [a,d]=yearParts(date.year); return pyramid(a,reduceToDigit(birthday.month+date.month),reduceToDigit(birthday.day+date.day),d);
}
export function analyzeDay(birthday:Birthday,date:LocalDate):DayAnalysis {
  const annual=calculateAnnual(birthday,date),monthly=calculateMonthly(birthday,date),daily=calculateDaily(birthday,date);
  return { date,annual,monthly,daily,annualSeason:SEASON_BY_DIGIT[annual.result],monthlySeason:SEASON_BY_DIGIT[monthly.result],dailySeason:SEASON_BY_DIGIT[daily.result],element:ELEMENT_BY_DIGIT[daily.result] };
}

export function isValidBirthday(b:Birthday):boolean {
  if (b.year<1900 || b.year>new Date().getFullYear() || b.month<1 || b.month>12 || b.day<1) return false;
  const d=new Date(b.year,b.month-1,b.day); return d.getFullYear()===b.year && d.getMonth()===b.month-1 && d.getDate()===b.day;
}
