import { DayView } from "@/components/day-view";import { parseISO } from "@/lib/date";import { notFound } from "next/navigation";
export default async function DatePage({params}:{params:Promise<{date:string}>}){const {date}=await params;const parsed=parseISO(date);if(!parsed)notFound();return <DayView date={parsed}/>}
