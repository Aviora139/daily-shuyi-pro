import {describe,expect,it} from "vitest";import {analyzeDay,calculateAnnual,calculateDaily,calculateMonthly,isValidBirthday,reduceToDigit} from "@/lib/numerology/calculate";import {ELEMENT_BY_DIGIT,ELEMENTS,SEASON_BY_DIGIT} from "@/lib/numerology/config";import {buildMonth,monthStats} from "@/lib/calendar/build";import {getOutfits} from "@/lib/outfits/templates";import {interpret,stableReminder} from "@/lib/guidance/interpret";import {daysInMonth,formatISO,parseISO} from "@/lib/date";
const birthday={year:1990,month:11,day:2};const date={year:2026,month:10,day:25};
describe("三层倒金字塔",()=>{
 it("化简所有数字到1至9",()=>{expect(Array.from({length:29},(_,i)=>reduceToDigit(i+1))).toEqual([1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2])});
 it("通过固定验收案例",()=>{expect(calculateAnnual(birthday,date)).toEqual({first:[2,2,2,8],second:[4,1],result:5});expect(calculateMonthly(birthday,date)).toEqual({first:[2,3,2,8],second:[5,1],result:6});expect(calculateDaily(birthday,date)).toEqual({first:[2,3,9,8],second:[5,8],result:4})});
 it("给出正确季节与五行",()=>{const a=analyzeDay(birthday,date);expect([a.annualSeason,a.monthlySeason,a.dailySeason,a.element]).toEqual(["春","秋","秋","木"])});
});
describe("映射与配色",()=>{
 it("覆盖1至9季节映射",()=>expect(Object.values(SEASON_BY_DIGIT)).toEqual(["春","夏","冬","秋","春","秋","春","冬","秋"]));
 it("覆盖1至9五行映射",()=>expect(Object.values(ELEMENT_BY_DIGIT)).toEqual(["金","水","火","木","土","金","水","火","木"]));
 it("使用相生推荐与相克少穿",()=>{expect(ELEMENTS.木.generatedBy).toBe("水");expect(ELEMENTS.木.controlledBy).toBe("金");expect(ELEMENTS.木.colors).toEqual(["黑色","深蓝色"]);expect(ELEMENTS.木.avoid).toEqual(["白色","银色","金色"])});
});
describe("内容引擎",()=>{
 const a=analyzeDay(birthday,date);
 it("为每种风格返回三个不重复的真实场景",()=>{const signatures=new Set<string>();for(const element of ["金","水","火","木","土"] as const){for(const s of ["feminine","masculine","neutral"] as const){const o=getOutfits(element,s);expect(o).toHaveLength(3);expect(o.map(x=>x.scene)).toEqual(["日常休闲","上班通勤","聚会外出"]);expect(o.every(x=>x.top&&x.bottom&&x.shoes&&x.accessory)).toBe(true);o.forEach(x=>signatures.add(`${element}-${x.scene}-${x.top}-${x.bottom}`))}}expect(signatures.size).toBe(45)});
 it("综合解读体现长期播种与当日整理",()=>{const r=interpret(a);expect(r.annual).toContain("全年");expect(r.annual).toContain("打基础");expect(r.monthly).toContain("本月");expect(r.today).toContain("完成已有待办");expect(r.relation).toContain("并不冲突")});
 it("每日提醒稳定",()=>expect(stableReminder(a)).toBe(stableReminder(analyzeDay(birthday,date))));
});
describe("月历与日期",()=>{
 it("月历详情和单日结果一致",()=>{const month=buildMonth(birthday,2026,10);expect(month[24].daily.result).toBe(4);expect(month[24].element).toBe("木")});
 it("统计合计等于月份天数",()=>{const days=buildMonth(birthday,2026,10),s=monthStats(days);expect(s.total).toBe(31);expect(Object.values(s.seasons).reduce((a,b)=>a+b,0)).toBe(31);expect(Object.values(s.elements).reduce((a,b)=>a+b,0)).toBe(31)});
 it("处理闰年",()=>{expect(daysInMonth(2024,2)).toBe(29);expect(daysInMonth(2025,2)).toBe(28);expect(buildMonth(birthday,2024,2)).toHaveLength(29)});
 it("日期不经UTC转换",()=>{expect(formatISO({year:2026,month:1,day:2})).toBe("2026-01-02");expect(parseISO("2026-10-25")).toEqual(date);expect(parseISO("2026-02-30")).toBeNull()});
});
describe("资料验证",()=>{it("接受有效生日并拒绝无效日期",()=>{expect(isValidBirthday(birthday)).toBe(true);expect(isValidBirthday({year:2023,month:2,day:29})).toBe(false);expect(isValidBirthday({year:1899,month:1,day:1})).toBe(false)})});
