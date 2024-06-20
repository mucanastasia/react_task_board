import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddBoardModalContent from '../AddBoardModalContent';
import { useBoard } from '../../../contexts/BoardContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import boardHelpers from '../../../helpers/boardHelpers';

// Mock the useBoard hook
jest.mock('../../../contexts/BoardContext', () => ({
    useBoard: jest.fn(),
}));

// Mock the useTheme hook
jest.mock('../../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

// Mock the boardHelpers
jest.mock('../../../helpers/boardHelpers', () => jest.fn());

describe('AddBoardModalContent Component', () => {
    const setShow = jest.fn();
    const setName = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
        useTheme.mockReturnValue({ theme: 'light' });

        const boards = [];
        const setBoards = jest.fn();
        useBoard.mockReturnValue({ boards, setBoards });

        boardHelpers.mockReturnValue({
            addBoard: jest.fn((name) => ({
                name,
                path: `/board/${name.replace(/\s+/g, '-').toLowerCase()}`,
            })),
        });
    });

    test('Renders AddBoardModalContent without crashing', () => {
        render(<AddBoardModalContent setShow={setShow} name="" setName={setName} />);

        const input = screen.getByPlaceholderText('Name your task board');
        expect(input).toBeInTheDocument();
        expect(input).toHaveClass('boardName light');

        const button = screen.getByRole('button', { name: 'Confirm' });
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });

    test('Enables the Confirm button when the input is not empty', () => {
        render(<AddBoardModalContent setShow={setShow} name="Test Board" setName={setName} />);

        const input = screen.getByPlaceholderText('Name your task board');
        fireEvent.change(input, { target: { value: 'Test Board' } });

        const button = screen.getByRole('button', { name: 'Confirm' });
        expect(button).not.toBeDisabled();
    });

    test('Handles input change correctly', () => {
        render(<AddBoardModalContent setShow={setShow} name="" setName={setName} />);

        const input = screen.getByPlaceholderText('Name your task board');
        fireEvent.change(input, { target: { value: 'Test Board' } });

        expect(setName).toHaveBeenCalledWith('Test Board');
    });

    test('Handles click correctly and navigates to new board', async () => {
        render(<AddBoardModalContent setShow={setShow} name="Test Board" setName={setName} />);

        const input = screen.getByPlaceholderText('Name your task board');
        fireEvent.change(input, { target: { value: 'Test Board' } });

        const button = screen.getByRole('button', { name: 'Confirm' });
        fireEvent.click(button);

        expect(button).toBeDisabled();
        expect(button).toHaveClass('loading');

        // Wait for the spinner to appear
        await waitFor(() => expect(screen.getByTestId('spinner')).toBeInTheDocument());

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/board/test-board'));
        expect(setName).toHaveBeenCalledWith('');
        expect(setShow).toHaveBeenCalledWith(false);
    });
});