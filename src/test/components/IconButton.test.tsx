import { render, screen, fireEvent } from '@testing-library/react';
import IconButton from '../../components/IconButton';

describe('IconButton', () => {
  it('renders the correct icon image', () => {
    render(<IconButton name="copy" />);
    const img = screen.getByRole('img', { name: /copy/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('/src/assets/icons/copy.svg'));
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<IconButton name="delete" onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies custom size styles', () => {
    render(<IconButton name="copy" size={40} />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ width: '40px', height: '40px' });
  });

  it('applies additional className', () => {
    render(<IconButton name="copy" className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('icon-button');
    expect(button).toHaveClass('custom-class');
  });
});