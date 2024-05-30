import { render, screen } from '@testing-library/react';
import { CurrentTaskProvider, useCurrentTask } from '../CurrentTaskContext';

const TestComponent = () => {
    const { task } = useCurrentTask();
    return (
        <div>
            <h5>{task.name}</h5>
            <p>{task.description}</p>
        </div>
    );
};

describe('CurrentTaskContext', () => {
    const task = { id: 1, name: 'Test Task', description: 'Test Description' };

    test('Provides task data', () => {
        render(
            <CurrentTaskProvider task={task}>
                <TestComponent />
            </CurrentTaskProvider>
        );

        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
});