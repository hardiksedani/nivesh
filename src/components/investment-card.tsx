import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { type Investment } from '@/lib/learning';

export function InvestmentCard({item}:{item:Investment}) {
 const [open,setOpen]=useState(false);
 return <><article className="investment-card"><div className="investment-card-top"><div className={`investment-icon tone-${item.tone}`}><item.icon/></div><div className="min-w-0"><h3>{item.name}</h3><span className={`risk-label tone-${item.tone}`}>{item.risk}</span></div></div><p>{item.short}</p><Button variant="outline" className="learn-more" onClick={()=>setOpen(true)}>Learn more <ArrowRight/></Button></article><InvestmentDialog item={item} open={open} onOpenChange={setOpen}/></>;
}
export function InvestmentDialog({item,open,onOpenChange}:{item:Investment;open:boolean;onOpenChange:(open:boolean)=>void}) {
 const [level,setLevel]=useState<'simple'|'example'|'deeper'>('simple');
 const [answer,setAnswer]=useState<number|null>(null);
 return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="lesson-dialog"><DialogTitle>{item.name}</DialogTitle><DialogDescription>{item.short}</DialogDescription><div className="lesson-tabs">{(['simple','example','deeper'] as const).map(tab=><Button key={tab} variant={level===tab?'default':'outline'} size="sm" aria-pressed={level===tab} onClick={()=>setLevel(tab)}>{tab==='simple'?'The basics':tab==='example'?'A real-life example':'A little deeper'}</Button>)}</div><p>{item[level]}</p><div className="lesson-detail"><h3>What to watch for</h3><p>{item.limitations}</p><h3>Can I take my money out?</h3><p>{item.liquidity}</p><h3>Charges & taxes</h3><p>{item.fees}</p></div><div className="quiz"><h3>{item.question}</h3><div className="quiz-options">{item.answers.map((label,i)=><Button key={label} variant={answer===i?'default':'outline'} className="justify-start whitespace-normal h-auto py-3 text-left" onClick={()=>setAnswer(i)}>{label}</Button>)}</div>{answer!==null&&<div className="quiz-feedback" role="status">{answer===item.correct?<span className="flex items-center gap-2 text-primary"><CheckCircle2 size={17}/>That's right. You're building understanding.</span>:"Not quite. Take another look at the explanation and try again."}</div>}</div><p className="lesson-note">Educational examples only. Actual rates, terms, fees and tax rules vary.</p></DialogContent></Dialog>;
}