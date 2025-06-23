import { render, screen } from '@testing-library/react';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import { ApiErrorType } from '../../types/Api';

describe('ApiErrorMessage', () => {
  it('displays rate limit message', () => {
    render(<ApiErrorMessage errorType="rate_limit" />);
    expect(
      screen.getByText(/GitHub rate limit reached/i)
    ).toBeInTheDocument();
  });

  it('displays network error message', () => {
    render(<ApiErrorMessage errorType="network" />);
    expect(
      screen.getByText(/No response from server/i)
    ).toBeInTheDocument();
  });

  it('displays default message for unknown type', () => {
    render(<ApiErrorMessage errorType="unknown" />);
    expect(
      screen.getByText(/An unexpected error occurred/i)
    ).toBeInTheDocument();
  });
});