import type { Birthday, OutfitStyle } from "../numerology/types";
export type Theme="system"|"light"|"dark";
export interface Profile { birthday:Birthday; outfitStyle:OutfitStyle; theme:Theme; detailed:boolean }
export const DEFAULT_PROFILE:Profile={birthday:{year:1990,month:11,day:2},outfitStyle:"neutral",theme:"system",detailed:true};
const KEY="daily-shuyi-profile-v1";
export function loadProfile():Profile|null{try{const raw=localStorage.getItem(KEY);return raw?{...DEFAULT_PROFILE,...JSON.parse(raw)}:null}catch{return null}}
export function saveProfile(p:Profile){localStorage.setItem(KEY,JSON.stringify(p))}
export function clearProfile(){localStorage.removeItem(KEY)}
