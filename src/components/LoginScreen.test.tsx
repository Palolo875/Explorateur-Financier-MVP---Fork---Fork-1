import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { LoginScreen } from './LoginScreen';
import { useFinanceStore } from '../stores/financeStore';
import { vi } from 'vitest';

vi.mock('../stores/financeStore');

describe('LoginScreen', () => {
  it('should call the login function on form submit', () => {
    const loginMock = vi.fn();
    (useFinanceStore as any).mockReturnValue({
      login: loginMock,
    });

    const router = createMemoryRouter(
      [
        {
          path: '/login',
          element: <LoginScreen />,
        },
      ],
      {
        initialEntries: ['/login'],
        future: {
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        },
      }
    );

    render(<RouterProvider router={router} />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: {
        value: 'test@test.com',
      },
    });
    fireEvent.change(screen.getByLabelText('Mot de passe'), {
      target: {
        value: 'password',
      },
    });
    fireEvent.click(screen.getByText('Se connecter'));
    expect(loginMock).toHaveBeenCalled();
  });
});