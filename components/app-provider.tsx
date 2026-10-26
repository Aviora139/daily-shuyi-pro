"use client";
import { createContext,useContext,useEffect,useState } from "react";
import { isValidBirthday } from "@/lib/numerology/calculate";
import { DEFAULT_PROFILE,loadProfile,saveProfile,type Profile } from "@/lib/storage/profile";

type Ctx={profile:Profile|null;hydrated:boolean;update:(p:Profile)=>void;remove:()=>void};
const AppContext=createContext<Ctx|null>(null);
export const useApp=()=>{const c=useContext(AppContext);if(!c)throw new Error("AppProvider missing");return c};
export function AppProvider({children}:{children:React.ReactNode}){
  const [profile,setProfile]=useState<Profile|null>(null);const [hydrated,setHydrated]=useState(false);
  useEffect(()=>{const timer=setTimeout(()=>{const p=loadProfile();setProfile(p&&isValidBirthday(p.birthday)?p:null);setHydrated(true)},0);return()=>clearTimeout(timer)},[]);
  useEffect(()=>{if(!profile)return;const root=document.documentElement;root.dataset.theme=profile.theme;const dark=profile.theme==="dark"||(profile.theme==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);root.classList.toggle("dark",dark)},[profile]);
  const update=(p:Profile)=>{saveProfile(p);setProfile(p)};
  const remove=()=>{localStorage.removeItem("daily-shuyi-profile-v1");setProfile(null)};
  return <AppContext.Provider value={{profile,hydrated,update,remove}}>{children}{hydrated&&!profile&&<BirthdayDialog onSave={update}/>}</AppContext.Provider>;
}
function BirthdayDialog({onSave}:{onSave:(p:Profile)=>void}){
  const [value,setValue]=useState("1990-11-02");const [error,setError]=useState("");
  const submit=(e:React.FormEvent)=>{e.preventDefault();const [year,month,day]=value.split("-").map(Number);if(!isValidBirthday({year,month,day})){setError("请输入有效的出生日期");return}onSave({...DEFAULT_PROFILE,birthday:{year,month,day}})};
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="welcome-title"><form className="welcome-card" onSubmit={submit}>
    <span className="eyebrow">欢迎来到</span><h1 id="welcome-title">每日数易指南</h1><p>输入生日，开启只保存在此设备上的每日节奏指南。出生年份仅用于记录，不参与计算。</p>
    <label htmlFor="birthday">你的出生日期</label><input id="birthday" type="date" value={value} max={`${new Date().getFullYear()}-12-31`} onChange={e=>setValue(e.target.value)} required/>
    {error&&<p className="form-error" role="alert">{error}</p>}<button className="primary-button" type="submit">开始查看我的指南</button><small>你的资料不会被发送到服务器</small>
  </form></div>
}
