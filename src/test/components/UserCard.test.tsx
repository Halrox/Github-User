import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from '../../components/UserCard';

describe('UserCard', () => {
  const defaultProps = {
    avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
    login: 'octocat',
    id: 1,
    selected: false,
    onSelect: jest.fn(),
    showCheckbox: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.open = jest.fn(); // Mock la fonction window.open
  });

  it('renders user info and avatar correctly', () => {
    render(<UserCard {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('octocat')).toBeInTheDocument();
    expect(screen.getByAltText('octocat')).toHaveAttribute('src', defaultProps.avatarUrl);
  });

  it('shows a checkbox when showCheckbox is true', () => {
    render(<UserCard {...defaultProps} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('does not show checkbox when showCheckbox is false', () => {
    render(<UserCard {...defaultProps} showCheckbox={false} />);
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('calls onSelect when checkbox is toggled', () => {
    render(<UserCard {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(defaultProps.onSelect).toHaveBeenCalled();
  });

  it('opens GitHub profile in new tab on button click', () => {
    render(<UserCard {...defaultProps} />);
    const button = screen.getByRole('button', { name: /view profile/i });
    fireEvent.click(button);
    expect(window.open).toHaveBeenCalledWith('https://github.com/octocat', '_blank');
  });
});
