import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoginScreen } from './LoginScreen';
import { useFinanceStore } from '../stores/financeStore';
import { vi } from 'vitest';
vi.mock('../stores/financeStore');
describe('LoginScreen', () => {
  it('should call the login function on form submit', () => {
    const loginMock = vi.fn();
    (useFinanceStore as any).mockReturnValue({
      login: loginMock
    });
    render(<BrowserRouter>
        <LoginScreen />
      </BrowserRouter>);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: {
        value: 'test@test.com'
      }
    });
    fireEvent.change(screen.getByLabelText('Mot de passe'), {
      target: {
        value: 'password'
      }
    });
    fireEvent.click(screen.getByText('Se connecter'));
    expect(loginMock).toHaveBeenCalled();
  });
});