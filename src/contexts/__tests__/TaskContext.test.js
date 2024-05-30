import { render, screen, fireEvent } from '@testing-library/react';
import { TasksProvider, useTasks } from '../TasksContext';

const TestComponent = () => {
    const { tasks, setTasks } = useTasks();
    return (
        <div>
            <ul data-testid="tasksList">
                {tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
            <button onClick={() => setTasks([...tasks, 'New Task'])}>Add Task</button>
        </div>
    );
};

describe('TasksContext', () => {
    test('Provides initial tasks array', () => {
        render(
            <TasksProvider>
                <TestComponent />
            </TasksProvider>
        );

        expect(screen.getByTestId('tasksList')).toBeInTheDocument();
        expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });

    test('Updates tasks array correctly', () => {
        render(
            <TasksProvider>
                <TestComponent />
            </TasksProvider>
        );

        const button = screen.getByText('Add Task');
        fireEvent.click(button);

        expect(screen.queryAllByRole('listitem')).toHaveLength(1);
        expect(screen.getByText('New Task')).toBeInTheDocument();
    });

    test('Handles multiple updates to tasks array', () => {
        render(
            <TasksProvider>
                <TestComponent />
            </TasksProvider>
        );

        const button = screen.getByText('Add Task');
        fireEvent.click(button);
        fireEvent.click(button);

        expect(screen.queryAllByRole('listitem')).toHaveLength(2);
        expect(screen.getAllByText('New Task')).toHaveLength(2);
    });
});