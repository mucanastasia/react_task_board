import { render, screen, fireEvent } from '@testing-library/react';
import { BoardProvider, useBoard } from '../BoardContext';
import { getBoardsFromLocalStorage, getTasksFromLocalStorage } from '../../services/localStorageService';

jest.mock('../../services/localStorageService', () => ({
    getBoardsFromLocalStorage: jest.fn(),
    getTasksFromLocalStorage: jest.fn(),
}));

const TestComponent = () => {
    const { boards, setBoards, tasks, setTasks, setCurrentBoardId } = useBoard();
    return (
        <div>
            <ul data-testid="boardsList">
                {boards.map((board) => (
                    <li key={board.id}>{board.name}</li>
                ))}
            </ul>
            <ul data-testid="tasksList">
                {tasks.map((task) => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
            <button onClick={() => setBoards([...boards, { id: `new-board-${boards.length}`, name: 'New Board' }])}>Add Board</button>
            <button onClick={() => setTasks([...tasks, { id: `new-task-${tasks.length}`, name: 'New Task' }])}>Add Task</button>
            <button onClick={() => setCurrentBoardId('test-board-id')}>Set Current Board</button>
        </div>
    );
};

describe('BoardProvider', () => {
    beforeEach(() => {
        getBoardsFromLocalStorage.mockReturnValue([{ id: 'board-1', name: 'Board 1' }]);
        getTasksFromLocalStorage.mockReturnValue([{ id: 'task-1', name: 'Task 1', status: 'toDo' }]);
    });

    test('Provides initial boards array', () => {
        render(
            <BoardProvider>
                <TestComponent />
            </BoardProvider>
        );

        expect(screen.getByTestId('boardsList')).toBeInTheDocument();
        expect(screen.getByText('Board 1')).toBeInTheDocument();
    });

    test('Updates boards array correctly', () => {
        render(
            <BoardProvider>
                <TestComponent />
            </BoardProvider>
        );

        const addBoardButton = screen.getByText('Add Board');
        fireEvent.click(addBoardButton);

        expect(screen.getByText('New Board')).toBeInTheDocument();
    });

    test('Updates tasks array correctly', () => {
        render(
            <BoardProvider>
                <TestComponent />
            </BoardProvider>
        );

        const addTaskButton = screen.getByText('Add Task');
        fireEvent.click(addTaskButton);

        expect(screen.getByText('New Task')).toBeInTheDocument();
    });

    test('Handles multiple updates to boards array', () => {
        render(
            <BoardProvider>
                <TestComponent />
            </BoardProvider>
        );

        const addBoardButton = screen.getByText('Add Board');
        fireEvent.click(addBoardButton);
        fireEvent.click(addBoardButton);

        expect(screen.getAllByText('New Board')).toHaveLength(2);
    });

    test('Handles multiple updates to tasks array', () => {
        render(
            <BoardProvider>
                <TestComponent />
            </BoardProvider>
        );

        const addTaskButton = screen.getByText('Add Task');
        fireEvent.click(addTaskButton);
        fireEvent.click(addTaskButton);

        expect(screen.getAllByText('New Task')).toHaveLength(2);
    });

    test('Sets current board ID and updates tasks from local storage', () => {
        render(
            <BoardProvider>
                <TestComponent />
            </BoardProvider>
        );

        const setCurrentBoardButton = screen.getByText('Set Current Board');
        fireEvent.click(setCurrentBoardButton);

        expect(screen.getByTestId('tasksList')).toBeInTheDocument();
        expect(screen.getByText('Task 1')).toBeInTheDocument();
    });
});