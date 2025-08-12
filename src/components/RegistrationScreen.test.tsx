import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { RegistrationScreen } from './RegistrationScreen';
import { vi } from 'vitest';

vi.mock('../stores/financeStore');

describe('RegistrationScreen', () => {
  it('should show an error if passwords do not match', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/register',
          element: <RegistrationScreen />,
        },
      ],
      {
        initialEntries: ['/register'],
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
    fireEvent.change(screen.getByLabelText('Confirmer le mot de passe'), {
      target: {
        value: 'wrongpassword',
      },
    });
    fireEvent.click(screen.getByText("S'inscrire"));
    expect(screen.getByText('Les mots de passe ne correspondent pas.')).toBeInTheDocument();
  });
});