import { render, screen } from '@testing-library/react';
import TaskBoard from '../TaskBoard';
import { useBoard } from '../../../contexts/BoardContext';
import { getTasksFromLocalStorage } from '../../../services/localStorageService';
import { CurrentBoardProvider } from '../../../contexts/CurrentBoardContext';
import { SectionProvider } from '../../../contexts/SectionContext';

// Mock the useBoard hook
jest.mock('../../../contexts/BoardContext', () => ({
    useBoard: jest.fn(),
}));

// Mock the getTasksFromLocalStorage function
jest.mock('../../../services/localStorageService', () => ({
    getTasksFromLocalStorage: jest.fn(),
}));

// Mock child components
jest.mock('../../header/BoardHeader', () => () => <div>BoardHeader Component</div>);
jest.mock('../section/Section', () => () => <div>Section Component</div>);
jest.mock('../../pageTransition/PageTransition', () => ({ children }) => <div>{children}</div>);

describe('TaskBoard Component', () => {
    const board = { id: 'test-board', name: 'Test Board' };

    beforeEach(() => {
        useBoard.mockReturnValue({
            setTasks: jest.fn(),
            setCurrentBoardId: jest.fn(),
        });
        getTasksFromLocalStorage.mockReturnValue([]);
    });

    test('Renders TaskBoard without crashing', () => {
        render(<TaskBoard board={board} />);

        const sections = screen.getAllByText('Section Component');
        expect(sections).toHaveLength(3);

        const boardHeader = screen.getByText('BoardHeader Component');
        expect(boardHeader).toBeInTheDocument();
    });

    test('Loads tasks from local storage on mount', () => {
        const setTasks = jest.fn();
        const setCurrentBoardId = jest.fn();
        useBoard.mockReturnValue({ setTasks, setCurrentBoardId });
        const storedTasks = [{
            id: 1,
            sortId: '1000000',
            name: 'Sample Task',
            description: 'Sample description',
            status: 'toDo',
            isEditingDescription: false,
            isEditingName: false,
        }];
        getTasksFromLocalStorage.mockReturnValue(storedTasks);

        render(<TaskBoard board={board} />);

        expect(setTasks).toHaveBeenCalledWith(storedTasks);
        expect(setCurrentBoardId).toHaveBeenCalledWith(board.id);
    });
});