import {afterEach,describe,expect,it} from "vitest";import {renderToStaticMarkup} from "react-dom/server";import {Pyramid} from "@/components/pyramid";import {ColorSwatches} from "@/components/color-swatches";import {clearProfile,DEFAULT_PROFILE,loadProfile,saveProfile} from "@/lib/storage/profile";
class MemoryStorage{data=new Map<string,string>();getItem(k:string){return this.data.get(k)??null}setItem(k:string,v:string){this.data.set(k,v)}removeItem(k:string){this.data.delete(k)}}
Object.defineProperty(globalThis,"localStorage",{value:new MemoryStorage(),configurable:true});
afterEach(()=>clearProfile());
describe("组件与本地设置",()=>{
 it("倒金字塔包含可访问的展开控件与每一层",()=>{const html=renderToStaticMarkup(<Pyramid title="流日" data={{first:[2,3,9,8],second:[5,8],result:4}}/>);expect(html).toContain("流日倒金字塔计算");expect(html).toContain("2");expect(html).toContain("最终数字")});
 it("颜色同时显示名称与十六进制码，不只靠色块",()=>{const html=renderToStaticMarkup(<ColorSwatches colors={["黑色","深蓝色"]}/>);expect(html).toContain("黑色");expect(html).toContain("#202321");expect(html).toContain("#243D5C")});
 it("保存、读取和删除用户资料",()=>{saveProfile({...DEFAULT_PROFILE,theme:"dark",detailed:false});expect(loadProfile()?.theme).toBe("dark");expect(loadProfile()?.detailed).toBe(false);clearProfile();expect(loadProfile()).toBeNull()});
 it("默认设置包含系统主题与中性穿搭",()=>{expect(DEFAULT_PROFILE.theme).toBe("system");expect(DEFAULT_PROFILE.outfitStyle).toBe("neutral")});
});
