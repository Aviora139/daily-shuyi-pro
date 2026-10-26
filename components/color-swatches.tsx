import { COLOR_HEX } from "@/lib/numerology/config";
export function ColorSwatches({colors}:{colors:string[]}){return <div className="swatches">{colors.map(c=><span key={c}><i style={{background:COLOR_HEX[c]}} aria-hidden="true"/>{c}<code>{COLOR_HEX[c]}</code></span>)}</div>}
