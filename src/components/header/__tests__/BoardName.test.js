import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BoardName from '../BoardName';
import { useTheme } from '../../../contexts/ThemeContext';
import { useBoardName } from '../../../contexts/BoardNameContext';

// Mock the useTheme hook
jest.mock('../../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

// Mock the useBoardName hook
jest.mock('../../../contexts/BoardNameContext', () => ({
    useBoardName: jest.fn(),
}));

describe('BoardName Component', () => {
    beforeEach(() => {
        useTheme.mockReturnValue({ theme: 'light' });
    });

    test('Renders BoardName without crashing', () => {
        useBoardName.mockReturnValue({
            boardName: { name: 'Test Name Board', isEditing: false },
            setBoardName: jest.fn(),
        });

        render(<BoardName />);

        const span = screen.getByTestId('double-slash');
        expect(span).toBeInTheDocument();
        expect(span).toHaveClass('light');

        const headingBoardName = screen.getByRole('heading');
        expect(headingBoardName).toBeInTheDocument();
        expect(headingBoardName).toHaveTextContent('Test Name Board');
        expect(headingBoardName).toHaveClass('light');

        const editButton = screen.getByRole('button');
        expect(editButton).toBeInTheDocument();

        // Check that there is NO input
        const input = screen.queryByPlaceholderText('Name your task board');
        expect(input).not.toBeInTheDocument();
    });

    test('Entering edit mode on button click', () => {
        const setBoardName = jest.fn();
        useBoardName.mockReturnValue({
            boardName: { name: 'Entering edit mode', isEditing: false },
            setBoardName,
        });

        render(<BoardName />);

        const span = screen.getByTestId('double-slash');
        expect(span).toBeInTheDocument();
        expect(span).toHaveClass('light');

        const editButton = screen.getByRole('button');
        userEvent.click(editButton);
        expect(setBoardName).toHaveBeenCalledWith({ name: 'Entering edit mode', isEditing: true });
    });

    test('Renders input and hides button in edit mode', () => {
        useBoardName.mockReturnValue({
            boardName: { name: 'Test board name', isEditing: true },
            setBoardName: jest.fn(),
        });

        render(<BoardName />);

        const input = screen.getByPlaceholderText('Name your task board');
        expect(input).toBeInTheDocument();

        const editButton = screen.queryByRole('button');
        expect(editButton).not.toBeInTheDocument();

        const HeadingBoardName = screen.queryByText('Test board name');
        expect(HeadingBoardName).not.toBeInTheDocument();
    });

    test('Should show edit mode when the input is empty', () => {
        useBoardName.mockReturnValue({
            boardName: { name: '', isEditing: true },
            setBoardName: jest.fn(),
        });

        render(<BoardName />);

        const input = screen.getByPlaceholderText('Name your task board');
        expect(input).toBeInTheDocument();

        const editButton = screen.queryByRole('button');
        expect(editButton).not.toBeInTheDocument();

        const HeadingBoardName = screen.queryByRole('heading');
        expect(HeadingBoardName).not.toBeInTheDocument();
    });

    test('Should not change the boardName when enter and leave the edit mode without changes.', () => {
        const setBoardName = jest.fn();
        useBoardName.mockReturnValue({
            boardName: { name: 'Entering edit mode and leave', isEditing: true },
            setBoardName,
        });

        render(<BoardName />);

        const span = screen.getByTestId('double-slash');
        expect(span).toBeInTheDocument();
        expect(span).toHaveClass('light');

        const editButton = screen.queryByRole('button');
        expect(editButton).not.toBeInTheDocument();

        const input = screen.getByPlaceholderText('Name your task board');
        expect(input).toBeInTheDocument();
        userEvent.click(input);
        userEvent.tab();
        expect(setBoardName).toHaveBeenCalledWith({ name: 'Entering edit mode and leave', isEditing: false });
    });

    test('Submitting a new boardName on Enter key', () => {
        const setBoardName = jest.fn();
        useBoardName.mockReturnValue({
            boardName: { name: 'Old board name', isEditing: true },
            setBoardName,
        });

        render(<BoardName />);

        const span = screen.getByTestId('double-slash');
        expect(span).toBeInTheDocument();
        expect(span).toHaveClass('light');

        const editButton = screen.queryByRole('button');
        expect(editButton).not.toBeInTheDocument();

        const input = screen.getByPlaceholderText('Name your task board');
        expect(input).toBeInTheDocument();
        userEvent.clear(input);
        userEvent.type(input, 'New board name{enter}');

        expect(setBoardName).toHaveBeenCalledWith({ name: 'New board name', isEditing: false });
    });

    test('Submitting a new boardName on blur', () => {
        const setBoardName = jest.fn();
        useBoardName.mockReturnValue({
            boardName: { name: 'Old board name', isEditing: true },
            setBoardName,
        });

        render(<BoardName />);

        const span = screen.getByTestId('double-slash');
        expect(span).toBeInTheDocument();
        expect(span).toHaveClass('light');

        const editButton = screen.queryByRole('button');
        expect(editButton).not.toBeInTheDocument();

        const input = screen.getByPlaceholderText('Name your task board');
        expect(input).toBeInTheDocument();
        userEvent.clear(input);
        userEvent.type(input, 'New board name');
        userEvent.tab();

        expect(setBoardName).toHaveBeenCalledWith({ name: 'New board name', isEditing: false });
    });
});