import { describe, it, expect } from 'vitest';
import { defaultHoldings, simulateHoldings } from './finance';

describe('my plan today', () => {
  it('default plan uses exactly ₹8,000 per month', () => {
    expect(defaultHoldings.reduce((a, h) => a + h.monthly, 0)).toBe(8000);
  });
  it('money put in after 12 months is ₹96,000', () => {
    expect(simulateHoldings(defaultHoldings, 12).history[11].invested).toBe(96000);
  });
  it('simulation is identical on every run', () => {
    expect(simulateHoldings(defaultHoldings, 24).history[23].value).toBe(simulateHoldings(defaultHoldings, 24).history[23].value);
  });
});
