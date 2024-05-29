import { render, screen } from '@testing-library/react';
import TasksList from '../TasksList';
import { useTasks } from '../../../../../contexts/TasksContext';
import { useSection } from '../../../../../contexts/SectionContext';
import taskHelpers from '../../../../../helpers/taskHelpers';

jest.mock('../../../../../contexts/TasksContext', () => ({
    useTasks: jest.fn(),
}));

jest.mock('../../../../../contexts/SectionContext', () => ({
    useSection: jest.fn(),
}));

jest.mock('../../../../../helpers/taskHelpers', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('../task/Task', () => () => <div>Task Component</div>);
jest.mock('../../../../../contexts/CurrentTaskContext', () => ({
    CurrentTaskProvider: (({ children }) => <div>{children}</div>),
}));

describe('TasksList Component', () => {
    const setTasks = jest.fn();
    const getSectionTasks = jest.fn();

    beforeEach(() => {
        useTasks.mockReturnValue({
            tasks: [
                { id: 1, name: 'Task 1', status: 'toDo' },
                { id: 2, name: 'Task 2', status: 'inProgress' },
                { id: 3, name: 'Task 3', status: 'toDo' },
            ],
            setTasks,
        });
        useSection.mockReturnValue({
            sectionId: 'toDo',
        });
        taskHelpers.mockImplementation((tasks, setTasks) => ({
            getSectionTasks,
        }));
        getSectionTasks.mockReturnValue([
            { id: 1, name: 'Task 1', status: 'toDo' },
            { id: 3, name: 'Task 3', status: 'toDo' },
        ]);
    });

    test('Renders TasksList without crashing', () => {
        render(<TasksList />);
        const tasksList = screen.getByTestId('tasks-list');
        expect(tasksList).toBeInTheDocument();
    });

    test('Renders list of tasks for the given sectionId', () => {
        render(<TasksList />);
        const taskComponent = screen.getAllByText('Task Component');
        expect(taskComponent).toHaveLength(2);
    });

    test('Renders correct empty list', () => {
        getSectionTasks.mockReturnValue([]);
        useSection.mockReturnValue({
            sectionId: 'done',
        });

        render(<TasksList />);
        const tasksList = screen.getByTestId('tasks-list');
        expect(tasksList).toBeInTheDocument();

        const taskComponent = screen.queryByText('Task Component');
        expect(taskComponent).not.toBeInTheDocument();
    });

    test('State updates correctly when props change', () => {
        getSectionTasks.mockReturnValueOnce([
            { id: 2, name: 'Task 2', status: 'inProgress' },
        ]);
        useSection.mockReturnValueOnce({
            sectionId: 'inProgress',
        });

        const { rerender } = render(<TasksList />);
        expect(screen.getAllByText('Task Component')).toHaveLength(1);

        getSectionTasks.mockReturnValueOnce([
            { id: 2, name: 'Task 2', status: 'inProgress' },
            { id: 4, name: 'Task 4', status: 'inProgress' },
            { id: 5, name: 'Task 5', status: 'inProgress' },
        ]);
        useSection.mockReturnValueOnce({
            sectionId: 'inProgress',
        });

        rerender(<TasksList />);
        expect(screen.getAllByText('Task Component')).toHaveLength(3);
    });
});