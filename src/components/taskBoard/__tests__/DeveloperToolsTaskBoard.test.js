import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeveloperToolsTaskBoard from '../DeveloperToolsTaskBoard';
import { useBoard } from '../../../contexts/BoardContext';
import { useCurrentBoard } from '../../../contexts/CurrentBoardContext';
import { useTheme } from '../../../contexts/ThemeContext';
import taskHelpers from '../../../helpers/taskHelpers';
import boardHelpers from '../../../helpers/boardHelpers';
import { exampleTasks, exampleBoardName } from '../../../helpers/exampleTasks';

// Mock the useBoard hook
jest.mock('../../../contexts/BoardContext', () => ({
    useBoard: jest.fn(),
}));

// Mock the useCurrentBoard hook
jest.mock('../../../contexts/CurrentBoardContext', () => ({
    useCurrentBoard: jest.fn(),
}));

// Mock the useTheme hook
jest.mock('../../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

// Mock the taskHelpers and boardHelpers
jest.mock('../../../helpers/taskHelpers', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('../../../helpers/boardHelpers', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('DeveloperToolsTaskBoard Component', () => {
    const saveTasks = jest.fn();
    const updateBoardName = jest.fn();
    const setTasks = jest.fn();
    const setBoards = jest.fn();
    const currentBoardId = '1';
    const board = { id: currentBoardId, name: 'Test Board' };

    beforeEach(() => {
        useTheme.mockReturnValue({ theme: 'light' });

        useBoard.mockReturnValue({
            tasks: [],
            setTasks,
            boards: [],
            setBoards,
            currentBoardId,
        });

        useCurrentBoard.mockReturnValue({ board });

        taskHelpers.mockReturnValue({
            saveTasks,
        });

        boardHelpers.mockReturnValue({
            updateBoardName,
        });
    });

    test('Renders DeveloperToolsTaskBoard without crashing', () => {
        render(<DeveloperToolsTaskBoard />);
        expect(screen.getByText('Auto fill tasks')).toBeInTheDocument();
    });

    test('Handles Auto Fill button click', () => {
        render(<DeveloperToolsTaskBoard />);
        const autoFillButton = screen.getByText('Auto fill tasks');
        fireEvent.click(autoFillButton);

        expect(saveTasks).toHaveBeenCalledWith(exampleTasks);
        expect(updateBoardName).toHaveBeenCalledWith(currentBoardId, { name: exampleBoardName });
    });

    test('Handles Delete All button click', () => {
        useBoard.mockReturnValue({
            tasks: exampleTasks,
            setTasks,
            boards: [],
            setBoards,
            currentBoardId,
        });

        render(<DeveloperToolsTaskBoard />);
        const deleteAllButton = screen.getByText('Delete all tasks');
        fireEvent.click(deleteAllButton);

        expect(saveTasks).toHaveBeenCalledWith([]);
        expect(updateBoardName).toHaveBeenCalledWith(currentBoardId, { name: 'Untitled task board' });
    });
});