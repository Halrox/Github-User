import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

describe('SearchBar', () => {
  it('renders input with the correct value', () => {
    render(<SearchBar value="john" onChange={() => {}} />);
    const input = screen.getByPlaceholderText(/search github users/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('john');
  });

  it('calls onChange when the input changes', () => {
    const handleChange = jest.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText(/search github users/i);

    fireEvent.change(input, { target: { value: 'doe' } });
    expect(handleChange).toHaveBeenCalledWith('doe');
  });
});

