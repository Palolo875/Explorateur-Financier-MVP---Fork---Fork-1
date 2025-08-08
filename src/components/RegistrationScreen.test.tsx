import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RegistrationScreen } from './RegistrationScreen';
import { vi } from 'vitest';

vi.mock('../stores/financeStore');

describe('RegistrationScreen', () => {
  it('should show an error if passwords do not match', () => {
    render(
      <BrowserRouter>
        <RegistrationScreen />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('Confirmer le mot de passe'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText("S'inscrire"));

    expect(screen.getByText('Les mots de passe ne correspondent pas.')).toBeInTheDocument();
  });
});
