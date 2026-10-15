export const GOAL = 1_000_000;
export const money = (value: number) => `₹${Math.round(value).toLocaleString('en-IN')}`;
export function futureValue(monthly: number, annualRate: number, months: number, initial = 0) {
  const r = Math.pow(1 + annualRate, 1 / 12) - 1;
  return r === 0 ? initial + monthly * months : initial * Math.pow(1 + r, months) + monthly * (Math.pow(1 + r, months) - 1) / r;
}
export function monthsToGoal(monthly: number, annualRate: number, goal = GOAL, initial = 0): number | null {
  if (initial >= goal) return 0;
  if (monthly <= 0 && annualRate <= 0) return null;
  for (let month = 1; month <= 1200; month++) if (futureValue(monthly, annualRate, month, initial) >= goal) return month;
  return null;
}
export const availableContribution = (income: number, expenses: number) => Math.max(0, income - expenses);
export const afterDecline = (value: number, percent: number) => value * (1 - percent / 100);
export const duration = (months: number | null) => months === null ? 'Not reached within 100 years' : `${Math.floor(months / 12)} ${Math.floor(months / 12) === 1 ? "year" : "years"}${months % 12 ? `, ${months % 12} ${months % 12 === 1 ? "month" : "months"}` : ''}`;/** Monthly contributions that rise by stepUpPct once every 12 months; returns value after `months`. */
export function stepUpValue(monthly: number, stepUpPct: number, annualRate: number, months: number) {
  const r = Math.pow(1 + annualRate, 1 / 12) - 1;
  let value = 0, contributed = 0, pay = monthly;
  for (let m = 1; m <= months; m++) { value = value * (1 + r) + pay; contributed += pay; if (m % 12 === 0) pay *= 1 + stepUpPct / 100; }
  return { value, contributed };
}
export function ageTimeline(age: number, monthly: number, stepUpPct: number, annualRate: number, ages = [22, 25, 30, 35, 40, 50, 60]) {
  return ages.filter(a => a > age).map(a => ({ age: a, ...stepUpValue(monthly, stepUpPct, annualRate, (a - age) * 12) }));
}

export type Holding = { id: string; name: string; monthly: number; annualRate: number; volatility: number };
export const defaultHoldings: Holding[] = [
  { id: 'emergency', name: 'Emergency fund (savings / RD)', monthly: 1500, annualRate: 0.065, volatility: 0 },
  { id: 'index', name: 'Nifty 50 index fund SIP', monthly: 4500, annualRate: 0.11, volatility: 0.05 },
  { id: 'debt', name: 'Short-term debt fund', monthly: 1500, annualRate: 0.07, volatility: 0.005 },
  { id: 'gold', name: 'Gold ETF', monthly: 500, annualRate: 0.08, volatility: 0.03 },
];
/** Deterministic simulated monthly history for each holding (seeded so it is identical on every load). */
export function simulateHoldings(holdings: Holding[], months: number, seed = 7) {
  let s = seed;
  const rand = () => { s = (s * 16807) % 2147483647; return s / 2147483647 - 0.5; };
  const values = holdings.map(() => 0);
  let invested = 0;
  const history: { month: number; invested: number; value: number }[] = [];
  for (let m = 1; m <= months; m++) {
    holdings.forEach((h, i) => {
      const r = Math.pow(1 + h.annualRate, 1 / 12) - 1 + rand() * 2 * h.volatility;
      values[i] = (values[i] ?? 0) * (1 + r) + h.monthly;
    });
    invested += holdings.reduce((a, h) => a + h.monthly, 0);
    history.push({ month: m, invested, value: values.reduce((a, v) => a + v, 0) });
  }
  return { history, holdings: holdings.map((h, i) => ({ ...h, invested: h.monthly * months, value: values[i] ?? 0 })) };
}
