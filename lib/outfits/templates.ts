import type { Element, OutfitStyle } from "../numerology/types";

type Scene="日常休闲"|"上班通勤"|"聚会外出";
export interface Outfit { scene:Scene; top:string; bottom:string; shoes:string; accessory:string; note:string }
const styleLabel:Record<OutfitStyle,string>={feminine:"柔和利落",masculine:"沉稳简洁",neutral:"中性简约"};
const pieces:Record<Element,Record<Scene,[string,string,string,string]>>={
  金:{日常休闲:["米色针织或黄色T恤","咖色直筒裤","奶油色运动鞋","咖色帆布包"],上班通勤:["米白衬衫配金黄内搭","咖色西裤或中长裙","棕色乐福鞋","金色表带"],聚会外出:["暖黄上衣或米色外套","深咖下装","焦糖色鞋","金棕小包"]},
  水:{日常休闲:["白色棉质上衣","浅灰牛仔裤","银灰运动鞋","银色发夹或手表"],上班通勤:["象牙白衬衫","炭灰西裤或半裙","黑白乐福鞋","金色细节配饰"],聚会外出:["白色简约上衣","金属灰下装","白色便鞋","金银色小包"]},
  火:{日常休闲:["青绿色T恤或薄衫","卡其休闲裤","白绿运动鞋","绿色帆布包"],上班通勤:["墨绿衬衫","米白西裤或半裙","棕色乐福鞋","青色丝巾"],聚会外出:["祖母绿上衣","深色长裤或裙装","简洁深色鞋","青绿色耳饰"]},
  木:{日常休闲:["深蓝T恤或黑色卫衣","黑色牛仔裤","深色运动鞋","藏蓝帽或袜子"],上班通勤:["藏蓝衬衫","黑色西裤或中长裙","深色皮鞋","蓝黑表带"],聚会外出:["黑色简约上衣","深蓝外套与深色下装","黑色便鞋","藏蓝小包"]},
  土:{日常休闲:["砖红T恤或橙色薄衫","米色休闲裤","白色运动鞋","紫色袜子"],上班通勤:["酒红衬衫","深灰西裤或半裙","棕色乐福鞋","橙色丝巾"],聚会外出:["紫色或暖红上衣","深色长裤或裙装","简约深色鞋","橙红小包"]},
};

export function getOutfits(element:Element,style:OutfitStyle):Outfit[]{
  return (Object.entries(pieces[element]) as [Scene,[string,string,string,string]][]).map(([scene,p])=>({scene,top:p[0],bottom:p[1],shoes:p[2],accessory:p[3],note:`${styleLabel[style]}的配法，用已有单品或小面积配饰带入推荐色即可。`}));
}
