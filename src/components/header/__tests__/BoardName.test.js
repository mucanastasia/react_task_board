import { render, screen, fireEvent } from '@testing-library/react';
import BoardName from '../BoardName';
import { useTheme } from '../../../contexts/ThemeContext';
import { useBoard } from '../../../contexts/BoardContext';
import { useCurrentBoard } from '../../../contexts/CurrentBoardContext';
import boardHelpers from '../../../helpers/boardHelpers';

// Mock the useTheme hook
jest.mock('../../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

// Mock the useBoard hook
jest.mock('../../../contexts/BoardContext', () => ({
    useBoard: jest.fn(),
}));

// Mock the useCurrentBoard hook
jest.mock('../../../contexts/CurrentBoardContext', () => ({
    useCurrentBoard: jest.fn(),
}));

// Mock the boardHelpers
jest.mock('../../../helpers/boardHelpers', () => jest.fn());

describe('BoardName Component', () => {
    let updateBoardName;

    beforeEach(() => {
        useTheme.mockReturnValue({ theme: 'light' });
        updateBoardName = jest.fn();
        boardHelpers.mockReturnValue({
            updateBoardName,
        });
    });

    test('Renders BoardName without crashing', () => {
        const setBoards = jest.fn();
        const boards = [{ id: 1, name: 'Test Board' }];
        const board = { id: 1, name: 'Test Board', isEditing: false };

        useBoard.mockReturnValue({ boards, setBoards });
        useCurrentBoard.mockReturnValue({ board });

        render(<BoardName />);

        const span = screen.getByTestId('double-slash');
        expect(span).toBeInTheDocument();
        expect(span).toHaveClass('light');

        const headingBoardName = screen.getByRole('heading');
        expect(headingBoardName).toBeInTheDocument();
        expect(headingBoardName).toHaveTextContent('Test Board');
        expect(headingBoardName).toHaveClass('light');

        const editButton = screen.getByRole('button');
        expect(editButton).toBeInTheDocument();

        // Check that there is NO input
        const input = screen.queryByPlaceholderText('Name your task board');
        expect(input).not.toBeInTheDocument();
    });

    test('Entering edit mode on button click', () => {
        const setBoards = jest.fn();
        const boards = [{ id: 1, name: 'Entering edit mode' }];
        const board = { id: 1, name: 'Entering edit mode', isEditing: false };

        useBoard.mockReturnValue({ boards, setBoards });
        useCurrentBoard.mockReturnValue({ board });

        render(<BoardName />);

        const editButton = screen.getByRole('button');
        expect(editButton).toBeInTheDocument();

        fireEvent.click(editButton);

        expect(updateBoardName).toHaveBeenCalledWith(1, { id: 1, name: 'Entering edit mode', isEditing: true });
    });

    test('Renders input and hides button in edit mode', () => {
        const setBoards = jest.fn();
        const boards = [{ id: 1, name: 'Test board name' }];
        const board = { id: 1, name: 'Test board name', isEditing: true };

        useBoard.mockReturnValue({ boards, setBoards });
        useCurrentBoard.mockReturnValue({ board });

        render(<BoardName />);

        const input = screen.getByPlaceholderText('Name your task board');
        expect(input).toBeInTheDocument();

        const editButton = screen.queryByRole('button');
        expect(editButton).not.toBeInTheDocument();

        const HeadingBoardName = screen.queryByText('Test board name');
        expect(HeadingBoardName).not.toBeInTheDocument();
    });

    test('Should show edit mode when the input is empty', () => {
        const setBoards = jest.fn();
        const boards = [{ id: 1, name: '' }];
        const board = { id: 1, name: '', isEditing: true };

        useBoard.mockReturnValue({ boards, setBoards });
        useCurrentBoard.mockReturnValue({ board });

        render(<BoardName />);

        const input = screen.getByPlaceholderText('Name your task board');
        expect(input).toBeInTheDocument();

        const editButton = screen.queryByRole('button');
        expect(editButton).not.toBeInTheDocument();

        const HeadingBoardName = screen.queryByRole('heading');
        expect(HeadingBoardName).not.toBeInTheDocument();
    });

    test('Should not change the boardName when enter and leave the edit mode without changes.', () => {
        const setBoards = jest.fn();
        const boards = [{ id: 1, name: 'Entering edit mode and leave' }];
        const board = { id: 1, name: 'Entering edit mode and leave', isEditing: true };

        useBoard.mockReturnValue({ boards, setBoards });
        useCurrentBoard.mockReturnValue({ board });

        render(<BoardName />);

        const input = screen.getByPlaceholderText('Name your task board');
        expect(input).toBeInTheDocument();
        fireEvent.focus(input);
        fireEvent.blur(input);

        expect(updateBoardName).toHaveBeenCalledWith(1, { name: 'Entering edit mode and leave', isEditing: false });
    });

    test('Submitting a new boardName on Enter key', () => {
        const setBoards = jest.fn();
        const boards = [{ id: 1, name: 'Old board name' }];
        const board = { id: 1, name: 'Old board name', isEditing: true };

        useBoard.mockReturnValue({ boards, setBoards });
        useCurrentBoard.mockReturnValue({ board });

        render(<BoardName />);

        const input = screen.getByPlaceholderText('Name your task board');
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: 'New board name' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(updateBoardName).toHaveBeenCalledWith(1, { name: 'New board name', isEditing: false });
    });

    test('Submitting a new boardName on blur', () => {
        const setBoards = jest.fn();
        const boards = [{ id: 1, name: 'Old board name' }];
        const board = { id: 1, name: 'Old board name', isEditing: true };

        useBoard.mockReturnValue({ boards, setBoards });
        useCurrentBoard.mockReturnValue({ board });

        render(<BoardName />);

        const input = screen.getByPlaceholderText('Name your task board');
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: 'New board name' } });
        fireEvent.blur(input);

        expect(updateBoardName).toHaveBeenCalledWith(1, { name: 'New board name', isEditing: false });
    });
});