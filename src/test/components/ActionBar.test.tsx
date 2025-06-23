import { render, screen, fireEvent } from '@testing-library/react';
import ActionBar from '../../components/ActionBar';

describe('ActionBar', () => {
  const mockToggleAll = jest.fn();
  const mockDuplicate = jest.fn();
  const mockDelete = jest.fn();
  const mockToggleEdit = jest.fn();

  const defaultProps = {
    selectedCount: 2,
    allSelected: false,
    editMode: true,
    onToggleAll: mockToggleAll,
    onDuplicate: mockDuplicate,
    onDelete: mockDelete,
    onToggleEdit: mockToggleEdit,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays the correct number of selected items', () => {
    render(<ActionBar {...defaultProps} />);
    expect(screen.getByText('2 elements selected')).toBeInTheDocument();
  });

  it('calls onToggleAll when the checkbox is clicked', () => {
    render(<ActionBar {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockToggleAll).toHaveBeenCalled();
  });

  it('calls onDuplicate and onDelete when action buttons are clicked', () => {
    render(<ActionBar {...defaultProps} />);
    const copyButton = screen.getByRole('button', { name: /copy/i });
    const deleteButton = screen.getByRole('button', { name: /delete/i });

    fireEvent.click(copyButton);
    fireEvent.click(deleteButton);

    expect(mockDuplicate).toHaveBeenCalled();
    expect(mockDelete).toHaveBeenCalled();
  });

});
