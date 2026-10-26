import { NUMBER_GUIDANCE, SEASONS } from "../numerology/config";
import type { DayAnalysis, Season } from "../numerology/types";

const bridge = (from:Season,to:Season,scope:"年月"|"月日") => {
  const subject=scope==="年月"?"全年方向与本月阶段":"本月节奏与今日行动";
  if(from===to) return `${subject}都落在${from}的象征阶段，适合把同一种节奏做得更聚焦、更扎实。`;
  const map:Record<Season,Record<Season,string>>={
    春:{春:"延续播种",夏:"从准备进入推进",秋:"以整理检验长期基础",冬:"暂缓扩张并补充储备"},
    夏:{春:"在行动中校准新方向",夏:"保持稳定投入",秋:"把投入转成可见成果",冬:"为持续行动安排恢复"},
    秋:{春:"从复盘中长出新计划",夏:"把成熟经验重新投入",秋:"集中完成与归纳",冬:"收束后进入休整"},
    冬:{春:"把储备转成清晰起点",夏:"让准备进入实际行动",秋:"检验沉淀所得",冬:"继续深度整理与恢复"},
  };
  return `${subject}处在不同时间尺度，并不冲突：可以${map[from][to]}。`;
};

export function stableReminder(a:DayAnalysis){
  const g=NUMBER_GUIDANCE[a.daily.result];
  return g.reminders[(a.date.year*372+a.date.month*31+a.date.day+a.daily.result)%g.reminders.length];
}

export function interpret(a:DayAnalysis){
  const annual=NUMBER_GUIDANCE[a.annual.result],monthly=NUMBER_GUIDANCE[a.monthly.result],daily=NUMBER_GUIDANCE[a.daily.result];
  return {
    annual:`流年${a.annual.result} · ${a.annualSeason}：${annual.title}。全年适合围绕${SEASONS[a.annualSeason].description}安排长期节奏。`,
    monthly:`流月${a.monthly.result} · ${a.monthlySeason}：${monthly.title}。本月可优先关注${monthly.dos.slice(0,2).join("、")}。`,
    today:`流日${a.daily.result} · ${a.dailySeason}：${daily.title}。今天适合${daily.dos.slice(0,3).join("、")}。`,
    relation:`${bridge(a.annualSeason,a.monthlySeason,"年月")} ${bridge(a.monthlySeason,a.dailySeason,"月日")}`,
    action:daily.dos,
    avoid:daily.cautions,
    reminder:stableReminder(a),
  };
}
