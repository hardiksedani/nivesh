import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { lessons } from '@/lib/learning';
import { pageHead } from '@/lib/page-head';
export const Route=createFileRoute('/learn')({head:()=>pageHead('Beginner Money Lab','Simple, bite-sized lessons about saving, investing, mutual funds, SIPs, compounding, inflation and risk.'),component:Learn});
function Learn() {
 const [active,setActive]=useState<number|null>(null);
 const [done,setDone]=useState<number[]>([]);
 const selected=active===null?undefined:lessons[active];
 return <main className="content-page"><span className="eyebrow">BEGINNER MONEY LAB</span><h1>Start curious.<br/>Leave a little more confident.</h1><p className="lede">No assumed knowledge. No pressure to invest. Just the ideas that help you make sense of your money.</p><div className="content-grid">{lessons.map((lesson,i)=><article className="investment-card" key={lesson.title}><div className="investment-icon tone-green"><lesson.icon/></div><h3 className="mt-5">{lesson.title}</h3><p>{lesson.text.split('. ')[0]}.</p><Button variant="outline" onClick={()=>setActive(i)}>{done.includes(i)?<><CheckCircle2/>Read again</>:<>Read lesson <ArrowRight/></>}</Button></article>)}</div><Link className="text-link mt-8" to="/explore">Ready to explore your options? <ArrowRight size={16}/></Link><Dialog open={active!==null} onOpenChange={open=>{if(!open)setActive(null)}}><DialogContent className="lesson-dialog">{selected&&active!==null&&<><DialogTitle>{selected.title}</DialogTitle><DialogDescription className="sr-only">A beginner investing lesson</DialogDescription><p>{selected.text}</p><div className="lesson-detail"><h3>One thing to remember</h3><p>{active===3?'An SIP is a method of investing, not a promise of returns.':'Make sure you understand the risk before committing money you may need soon.'}</p></div><Button variant="premium" onClick={()=>{setDone([...new Set([...done,active])]);setActive(null)}}>Mark as read <CheckCircle2/></Button></>}</DialogContent></Dialog></main>;
}