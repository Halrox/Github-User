import { render, screen, fireEvent } from '@testing-library/react';
import UserGithub from '../../pages/UserGithub';
import * as useGitHubUsersHook from '../../hooks/useGitHubUsers';
import * as useSelectionHook from '../../hooks/useSelection';

jest.mock('../../hooks/useGitHubUsers');
jest.mock('../../hooks/useSelection');

describe('UserGithub', () => {
  const baseUser = {
    id: 1,
    login: 'octocat',
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  };

  const secondUser = {
    id: 2,
    login: 'hubot',
    avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header and search bar', () => {
    (useGitHubUsersHook.useGitHubUsers as jest.Mock).mockReturnValue({
      users: [],
      status: 'success',
      errorType: undefined,
    });

    (useSelectionHook.useSelection as jest.Mock).mockReturnValue({
      selectedIds: [],
      selectedItems: [],
      toggle: jest.fn(),
      toggleAll: jest.fn(),
      isSelected: jest.fn(),
      clear: jest.fn(),
    });

    render(<UserGithub />);
    expect(screen.getByPlaceholderText(/search github users/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^edit$/i })).toBeInTheDocument();
  });

  it('displays API error message', () => {
    (useGitHubUsersHook.useGitHubUsers as jest.Mock).mockReturnValue({
      users: [],
      status: 'error',
      errorType: 'network',
    });

    (useSelectionHook.useSelection as jest.Mock).mockReturnValue({
      selectedIds: [],
      selectedItems: [],
      toggle: jest.fn(),
      toggleAll: jest.fn(),
      isSelected: jest.fn(),
      clear: jest.fn(),
    });

    render(<UserGithub />);
    expect(screen.getByText(/no response from server/i)).toBeInTheDocument();
  });

  it('enters edit mode and shows ActionBar', () => {
    (useGitHubUsersHook.useGitHubUsers as jest.Mock).mockReturnValue({
      users: [baseUser],
      status: 'success',
      errorType: undefined,
    });

    (useSelectionHook.useSelection as jest.Mock).mockReturnValue({
      selectedIds: [],
      selectedItems: [],
      toggle: jest.fn(),
      toggleAll: jest.fn(),
      isSelected: () => false,
      clear: jest.fn(),
    });

    render(<UserGithub />);
    fireEvent.click(screen.getByRole('button', { name: /^edit$/i }));
    expect(screen.getByText(/0 elements selected/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^view$/i })).toBeInTheDocument();
  });

  it('duplicates selected users', () => {
    (useGitHubUsersHook.useGitHubUsers as jest.Mock).mockReturnValue({
      users: [baseUser],
      status: 'success',
      errorType: undefined,
    });

    (useSelectionHook.useSelection as jest.Mock).mockReturnValue({
      selectedIds: [1],
      selectedItems: [baseUser],
      toggle: jest.fn(),
      toggleAll: jest.fn(),
      isSelected: () => true,
      clear: jest.fn(),
    });

    render(<UserGithub />);
    fireEvent.click(screen.getByRole('button', { name: /^edit$/i }));
    fireEvent.click(screen.getByRole('button', { name: /copy/i }));

    const logins = screen.getAllByText(/octocat/i);
    expect(logins).toHaveLength(2);
  });

  it('removes selected users', () => {
    (useGitHubUsersHook.useGitHubUsers as jest.Mock).mockReturnValue({
      users: [baseUser, secondUser],
      status: 'success',
      errorType: undefined,
    });

    (useSelectionHook.useSelection as jest.Mock).mockReturnValue({
      selectedIds: [1],
      selectedItems: [baseUser],
      toggle: jest.fn(),
      toggleAll: jest.fn(),
      isSelected: (id: number) => id === 1,
      clear: jest.fn(),
    });

    render(<UserGithub />);
    fireEvent.click(screen.getByRole('button', { name: /^edit$/i }));
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(screen.queryByText(/octocat/i)).not.toBeInTheDocument();
    expect(screen.getByText(/hubot/i)).toBeInTheDocument();
  });
});
