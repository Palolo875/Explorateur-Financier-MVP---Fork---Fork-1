import { describe, it, expect, beforeEach } from 'vitest';
import { useFinanceStore } from './financeStore';
describe('useFinanceStore', () => {
  beforeEach(() => {
    useFinanceStore.getState().resetData();
    useFinanceStore.getState().logout();
  });
  it('should log in a user', () => {
    const user = {
      id: '1',
      email: 'test@test.com',
      name: 'Test User'
    };
    const token = 'fake-jwt-token';
    useFinanceStore.getState().login(user, token);
    expect(useFinanceStore.getState().isLoggedIn).toBe(true);
    expect(useFinanceStore.getState().user).toEqual(user);
    expect(useFinanceStore.getState().token).toEqual(token);
  });
  it('should log out a user', () => {
    const user = {
      id: '1',
      email: 'test@test.com',
      name: 'Test User'
    };
    const token = 'fake-jwt-token';
    useFinanceStore.getState().login(user, token);
    useFinanceStore.getState().logout();
    expect(useFinanceStore.getState().isLoggedIn).toBe(false);
    expect(useFinanceStore.getState().user).toBeNull();
    expect(useFinanceStore.getState().token).toBeNull();
  });
});