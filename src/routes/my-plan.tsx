import { createFileRoute, Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/page-head';
import { defaultHoldings, simulateHoldings, money, GOAL, monthsToGoal, duration } from '@/lib/finance';

export const Route = createFileRoute('/my-plan')({
  head: () => pageHead('My plan today — Aarav\u2019s holdings and progress', 'See what Aarav holds today, how each investment has grown and how close he is to his ₹10 lakh goal, in a simulated plan.'),
  component: MyPlan,
});

const W = 640, H = 220;

function MyPlan() {
  const [months, setMonths] = useState(18);
  const { history, holdings } = useMemo(() => simulateHoldings(defaultHoldings, months), [months]);
  const last = history[history.length - 1];
  const gain = last.value - last.invested;
  const monthly = defaultHoldings.reduce((a, h) => a + h.monthly, 0);
  const left = monthsToGoal(monthly, 0.095, GOAL, last.value);
  const max = Math.max(...history.map(h => h.value));
  const pt = (v: number, i: number) => `${(i / Math.max(1, history.length - 1)) * W},${H - (v / max) * (H - 10)}`;
  const progress = Math.min(100, (last.value / GOAL) * 100);

  return <main className="content-page">
    <span className="eyebrow">MY PLAN TODAY</span>
    <h1>Here's where Aarav stands.</h1>
    <p className="lede">Aarav invests {money(monthly)} every month. Move the slider to see his plan after any number of months. Values are simulated, so they go up and down like real markets.</p>

    <label className="today-slider">Months since starting: <strong>{months}</strong>
      <input type="range" min={1} max={60} value={months} onChange={e => setMonths(+e.target.value)} aria-label="Months since starting" />
    </label>

    <div className="today-stats">
      <div><span>Total value today</span><strong>{money(last.value)}</strong></div>
      <div><span>Money you put in</span><strong>{money(last.invested)}</strong></div>
      <div><span>{gain >= 0 ? 'Growth so far' : 'Down for now'}</span><strong className={gain >= 0 ? 'up' : 'down'}>{gain >= 0 ? '+' : ''}{money(gain)}</strong></div>
      <div><span>Time left to ₹10 lakh</span><strong>{duration(left)}</strong></div>
    </div>

    <div className="goal-bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Progress to ₹10 lakh goal"><div style={{ width: `${progress}%` }} /></div>
    <p className="summary-note">{progress.toFixed(1)}% of the way to ₹10,00,000.</p>

    <section className="today-card">
      <h2>Progress over time</h2>
      <svg viewBox={`0 0 ${W} ${H}`} className="today-chart" role="img" aria-label="Line chart of value versus money put in">
        <polyline points={history.map((h, i) => pt(h.invested, i)).join(' ')} className="line-invested" />
        <polyline points={history.map((h, i) => pt(h.value, i)).join(' ')} className="line-value" />
      </svg>
      <p className="chart-legend"><span className="lg-value" /> Value <span className="lg-invested" /> Money put in</p>
    </section>

    <section className="today-card">
      <h2>What Aarav holds</h2>
      <div className="holdings">{holdings.map(h => <div className="holding" key={h.id}>
        <div><strong>{h.name}</strong><span>{money(h.monthly)} / month · {Math.round((h.monthly / monthly) * 100)}% of plan</span></div>
        <div className="holding-nums"><strong>{money(h.value)}</strong><span className={h.value >= h.invested ? 'up' : 'down'}>{h.value >= h.invested ? '+' : ''}{money(h.value - h.invested)}</span></div>
      </div>)}</div>
    </section>

    <p className="summary-note">Simulated, educational numbers — not a real account or a promise. Real returns can be lower or negative.</p>
    <div className="flex flex-wrap gap-3 mt-6">
      <Button asChild variant="premium"><Link to="/planner">Change my plan <ArrowRight /></Link></Button>
      <Button asChild variant="outline"><Link to="/invest">Start for real</Link></Button>
    </div>
  </main>;
}
