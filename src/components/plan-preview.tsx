import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Check, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { money } from '@/lib/finance';
export function PlanPreview() {
 const [monthly,setMonthly]=useState(1000);
 return <div className="plan-preview"><div><div className="preview-steps"><div className="preview-step"><span className="step-dot"><Check size={14}/></span><div><p className="font-semibold">About you</p><small>Student, 19 years, ₹8,000/month</small></div></div><div className="preview-step"><span className="step-dot">2</span><div><p className="font-semibold">Your goal</p><small>₹10,00,000</small></div></div></div><div className="preview-slider"><label htmlFor="preview-monthly">Monthly contribution <strong>{money(monthly)}</strong></label><input id="preview-monthly" type="range" min="500" max="5000" step="500" value={monthly} onChange={e=>setMonthly(Number(e.target.value))}/><Button asChild variant="premium" className="w-full"><Link to="/planner">Create my plan <ArrowRight/></Link></Button></div></div><div className="preview-result"><div className="flex items-center gap-3"><div className="investment-icon bg-background text-primary"><TrendingUp/></div><h3>A simple plan,<br/>made for your journey.</h3></div><p>Start with what feels comfortable. Build understanding, then take your next step.</p><span className="text-xs text-primary font-medium">Your money. Your future. Your plan.</span></div></div>;
}