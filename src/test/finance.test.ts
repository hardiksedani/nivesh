import { describe, expect, it } from 'vitest';
import { GOAL, availableContribution, afterDecline, futureValue, monthsToGoal } from '@/lib/finance';
describe('Beginner plan rules',()=>{
 it('interprets ₹10 lakh as ₹10,00,000',()=>expect(GOAL).toBe(1_000_000));
 it('calculates zero-rate end-of-month contributions without growth',()=>expect(futureValue(500,0,12)).toBe(6000));
 it('uses an effective annual rate converted to a monthly rate',()=>{const r=Math.pow(1.06,1/12)-1;expect(futureValue(1000,.06,12)).toBeCloseTo(1000*(1.06-1)/r,6)});
 it('limits contributions to disposable income',()=>{expect(availableContribution(8000,6000)).toBe(2000);expect(availableContribution(8000,9000)).toBe(0)});
 it('a 25 percent decline reduces ₹10,000 to ₹7,500',()=>expect(afterDecline(10000,25)).toBe(7500));
 it('finds the first month that reaches the goal',()=>{expect(monthsToGoal(1000,0,10000)).toBe(10);expect(futureValue(1000,0,9)).toBeLessThan(10000)});
});