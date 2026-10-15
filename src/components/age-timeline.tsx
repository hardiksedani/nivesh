import { useState } from 'react';
import { ageTimeline, GOAL, money } from '@/lib/finance';

const phases = [
  { ages: '19–22 · Student', text: 'Build an emergency fund of 3 months of expenses. Start a small SIP (₹500–₹1,000) in an index fund. Learn, don\u2019t trade.' },
  { ages: '22–25 · First job', text: 'Raise your SIP with every salary hike. Get term + health insurance. Keep 6 months of expenses in a savings/FD.' },
  { ages: '25–30 · Growing', text: 'Mix index funds with PPF/EPF for stability. Increase contributions 10% a year. Avoid high-interest debt.' },
  { ages: '30+ · Building wealth', text: 'Review asset mix yearly. Plan for home, family and retirement goals. Shift gradually to safer assets near each goal.' },
];

export function AgeTimeline() {
  const [age, setAge] = useState(19);
  const [monthly, setMonthly] = useState(1000);
  const [stepUp, setStepUp] = useState(10);
  const [rate, setRate] = useState(8);
  const rows = ageTimeline(age, monthly, stepUp, rate / 100);
  const goalAge = rows.find(r => r.value >= GOAL)?.age;
  const num = (set: (n: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => set(Math.max(0, Number(e.target.value)));
  return <section className="age-timeline" aria-labelledby="age-tl">
    <span className="eyebrow">YOUR LIFE TIMELINE</span>
    <h2 id="age-tl" className="mt-3">Where could you be at 25, 30 and beyond?</h2>
    <p className="text-sm text-muted-foreground mt-2">Start at your age with a monthly amount, and raise it a little every year as your income grows.</p>
    <div className="age-controls">
      <div className="form-field"><label htmlFor="tl-age">Your age</label><input id="tl-age" type="number" min="15" max="59" value={age} onChange={num(setAge)} /></div>
      <div className="form-field"><label htmlFor="tl-m">Starting monthly (₹)</label><input id="tl-m" type="number" min="0" value={monthly} onChange={num(setMonthly)} /></div>
      <div className="form-field"><label htmlFor="tl-s">Yearly increase (%)</label><input id="tl-s" type="number" min="0" max="50" value={stepUp} onChange={num(setStepUp)} /></div>
      <div className="form-field"><label htmlFor="tl-r">Assumed return: {rate}%</label><input id="tl-r" type="range" min="0" max="12" value={rate} onChange={num(setRate)} /></div>
    </div>
    <div className="age-track">{rows.map(r => <div className="age-stop" key={r.age}><b>Age {r.age}</b><strong>{money(r.value)}</strong><small>You put in {money(r.contributed)}<br />Growth {money(r.value - r.contributed)}</small></div>)}</div>
    <p role="status" className="text-primary font-semibold text-sm mt-4">{goalAge ? `On this path, you could cross ₹10 lakh around age ${goalAge}.` : 'Try a higher monthly amount or yearly increase to reach ₹10 lakh sooner.'}</p>
    <div className="phase-list">{phases.map(p => <div className="phase" key={p.ages}><h4>{p.ages}</h4>{p.text}</div>)}</div>
    <p className="summary-note mt-4">Illustration only. Returns are assumed, not promised; real markets rise and fall. Fees, taxes and inflation are not included.</p>
  </section>;
}
