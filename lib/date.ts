import type { LocalDate } from "./numerology/types";
export const localToday=():LocalDate=>{const d=new Date();return {year:d.getFullYear(),month:d.getMonth()+1,day:d.getDate()}};
export const formatISO=(d:LocalDate)=>`${d.year}-${String(d.month).padStart(2,"0")}-${String(d.day).padStart(2,"0")}`;
export const parseISO=(s:string):LocalDate|null=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s);if(!m)return null;const d={year:+m[1],month:+m[2],day:+m[3]};const x=new Date(d.year,d.month-1,d.day);return x.getFullYear()===d.year&&x.getMonth()===d.month-1&&x.getDate()===d.day?d:null};
export const displayDate=(d:LocalDate)=>`${d.year}年${d.month}月${d.day}日`;
export const daysInMonth=(year:number,month:number)=>new Date(year,month,0).getDate();
export const weekdayOfFirst=(year:number,month:number)=>new Date(year,month-1,1).getDay();
