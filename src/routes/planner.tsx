import { createFileRoute } from '@tanstack/react-router';
import { Planner } from '@/components/planner';
import { AgeTimeline } from '@/components/age-timeline';
import { pageHead } from '@/lib/page-head';
export const Route=createFileRoute('/planner')({head:()=>pageHead('Your personal ₹10 lakh plan','Create an illustrative investing plan, explore contributions and experience the impact of a market decline.'),component:PlanPage});
function PlanPage(){return <main className="content-page"><span className="eyebrow">YOUR PERSONAL PLAN</span><h1>Your money. Your future. Your plan.</h1><p className="lede">Start with what you can comfortably set aside. Explore a possible path, then see what happens when the journey isn't a straight line. No real money is invested.</p><Planner/><AgeTimeline/></main>}