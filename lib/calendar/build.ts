import { analyzeDay } from "../numerology/calculate";
import { ELEMENT_BY_DIGIT, SEASON_BY_DIGIT } from "../numerology/config";
import type { Birthday, DayAnalysis, Element, Season } from "../numerology/types";
import { daysInMonth } from "../date";

export function buildMonth(birthday:Birthday,year:number,month:number):DayAnalysis[]{
  return Array.from({length:daysInMonth(year,month)},(_,i)=>analyzeDay(birthday,{year,month,day:i+1}));
}
export function monthStats(days:DayAnalysis[]){
  const seasons={春:0,夏:0,秋:0,冬:0} satisfies Record<Season,number>;
  const elements={金:0,水:0,火:0,木:0,土:0} satisfies Record<Element,number>;
  days.forEach(d=>{seasons[SEASON_BY_DIGIT[d.daily.result]]++;elements[ELEMENT_BY_DIGIT[d.daily.result]]++});
  return {seasons,elements,total:days.length};
}
