import { render, screen, fireEvent } from '@testing-library/react';
import UserGrid from '../../components/UserGrid';
import { User } from '../../types/User';

const users: User[] = [
  {
    id: 1,
    login: 'octocat',
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  },
  {
    id: 2,
    login: 'hubot',
    avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
  },
];

describe('UserGrid', () => {
  const isSelected = jest.fn((id) => id === 1); // Only user with id 1 is selected
  const onToggleSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays empty message when user list is empty', () => {
    render(<UserGrid users={[]} isSelected={isSelected} onToggleSelect={onToggleSelect} editMode={false} />);
    expect(screen.getByText(/No results./i)).toBeInTheDocument();
  });

  it('renders a UserCard for each user', () => {
    render(<UserGrid users={users} isSelected={isSelected} onToggleSelect={onToggleSelect} editMode={true} />);
    expect(screen.getByText('octocat')).toBeInTheDocument();
    expect(screen.getByText('hubot')).toBeInTheDocument();
  });

  it('calls onToggleSelect when a checkbox is clicked', () => {
    render(<UserGrid users={users} isSelected={isSelected} onToggleSelect={onToggleSelect} editMode={true} />);
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(onToggleSelect).toHaveBeenCalledWith(1);
  });

  it('does not render checkboxes when editMode is false', () => {
    render(<UserGrid users={users} isSelected={isSelected} onToggleSelect={onToggleSelect} editMode={false} />);
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });
});
