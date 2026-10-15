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
export const duration = (months: number | null) => months === null ? 'Not reached within 100 years' : `${Math.floor(months / 12)} ${Math.floor(months / 12) === 1 ? "year" : "years"}${months % 12 ? `, ${months % 12} ${months % 12 === 1 ? "month" : "months"}` : ''}`;