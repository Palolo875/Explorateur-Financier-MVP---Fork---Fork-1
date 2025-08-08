import { describe, it, expect } from 'vitest';
import { calculateCompoundInterest } from './financialCalculations';

describe('financialCalculations', () => {
  it('calculates compound interest correctly', () => {
    expect(calculateCompoundInterest(1000, 5, 10, 100, 'yearly')).toBeCloseTo(2886.68);
  });
});
