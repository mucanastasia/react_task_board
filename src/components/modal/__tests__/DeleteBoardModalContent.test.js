import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeleteBoardModalContent from '../DeleteBoardModalContent';
import { useBoard } from '../../../contexts/BoardContext';
import { useNavigate } from 'react-router-dom';
import boardHelpers from '../../../helpers/boardHelpers';

// Mock the useBoard hook
jest.mock('../../../contexts/BoardContext', () => ({
    useBoard: jest.fn(),
}));

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

// Mock the boardHelpers
jest.mock('../../../helpers/boardHelpers', () => jest.fn());

describe('DeleteBoardModalContent Component', () => {
    const setShow = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);

        const boards = [];
        const setBoards = jest.fn();
        const currentBoardId = '123';
        useBoard.mockReturnValue({ boards, setBoards, currentBoardId });

        boardHelpers.mockReturnValue({
            deleteBoard: jest.fn(),
        });
    });

    test('Renders DeleteBoardModalContent without crashing', () => {
        render(<DeleteBoardModalContent setShow={setShow} />);

        const message = screen.getByText('Are you sure you want to delete this board?');
        expect(message).toBeInTheDocument();

        const button = screen.getByRole('button', { name: 'Yes, delete' });
        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });

    test('Handles click correctly and deletes board', async () => {
        const deleteBoard = boardHelpers().deleteBoard;
        render(<DeleteBoardModalContent setShow={setShow} />);

        const button = screen.getByRole('button', { name: 'Yes, delete' });
        fireEvent.click(button);

        expect(button).toBeDisabled();
        expect(screen.getByRole('button').querySelector('.spinner')).toBeInTheDocument();

        // Wait for the delete operation and navigation
        await waitFor(() => {
            expect(deleteBoard).toHaveBeenCalledWith('123');
            expect(mockNavigate).toHaveBeenCalledWith('/');
            expect(setShow).toHaveBeenCalledWith(false);
        });
    });
});