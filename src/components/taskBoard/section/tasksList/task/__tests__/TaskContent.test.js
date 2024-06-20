import { render, screen, fireEvent } from '@testing-library/react';
import TaskContent from '../TaskContent';
import { useBoard } from '../../../../../../contexts/BoardContext';
import { useCurrentTask } from '../../../../../../contexts/CurrentTaskContext';
import { useTheme } from '../../../../../../contexts/ThemeContext';
import taskHelper from '../../../../../../helpers/taskHelpers';

jest.mock('../../../../../../contexts/BoardContext', () => ({
    useBoard: jest.fn(),
}));

jest.mock('../../../../../../contexts/CurrentTaskContext', () => ({
    useCurrentTask: jest.fn(),
}));

jest.mock('../../../../../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

jest.mock('../../../../../../helpers/taskHelpers', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('../Input', () => ({ type, value, placeholder }) => (
    <input type={type} defaultValue={value} placeholder={placeholder} />
));

describe('TaskContent Component', () => {
    const setTasks = jest.fn();
    const updateTask = jest.fn();
    const deleteTask = jest.fn();
    const processCheck = jest.fn();

    beforeEach(() => {
        useBoard.mockReturnValue({
            tasks: [],
            setTasks,
        });
        useCurrentTask.mockReturnValue({
            task: { id: 1, name: 'Test Task', description: 'Test Description', status: 'toDo', isEditingName: false, isEditingDescription: false },
        });
        useTheme.mockReturnValue({
            theme: 'light',
        });
        taskHelper.mockImplementation(() => ({
            updateTask,
            deleteTask,
            processCheck,
        }));
        setTasks.mockClear();
        updateTask.mockClear();
        deleteTask.mockClear();
        processCheck.mockClear();
    });

    const renderComponent = (taskOverrides = {}) => {
        useCurrentTask.mockReturnValue({
            task: { id: 1, name: 'Test Task', description: 'Test Description', status: 'toDo', isEditingName: false, isEditingDescription: false, ...taskOverrides },
        });
        render(<TaskContent />);
    };

    test('Renders TaskContent without crashing', () => {
        renderComponent();
        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    test('Handles Edit button click', () => {
        renderComponent();
        const editButton = screen.getByLabelText('edit');
        fireEvent.click(editButton);
        expect(updateTask).toHaveBeenCalledWith(1, { id: 1, name: 'Test Task', description: 'Test Description', status: 'toDo', isEditingName: true, isEditingDescription: true });
    });

    test('Handles Delete button click', () => {
        renderComponent();
        const deleteButton = screen.getByLabelText('delete');
        fireEvent.click(deleteButton);
        expect(deleteTask).toHaveBeenCalledWith(1);
    });

    test('Handles Check button click', () => {
        renderComponent();
        const checkButton = screen.getByLabelText('check');
        fireEvent.click(checkButton);
        expect(processCheck).toHaveBeenCalledWith({ id: 1, name: 'Test Task', description: 'Test Description', status: 'toDo', isEditingName: false, isEditingDescription: false });
    });

    test('Renders input fields when editing', () => {
        renderComponent({ isEditingName: true, isEditingDescription: true });
        expect(screen.getByPlaceholderText('Add a task name here')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Add a description here')).toBeInTheDocument();
    });

    test('Displays name as text when not editing', () => {
        renderComponent({ isEditingName: false });
        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Add a task name here')).not.toBeInTheDocument();
    });

    test('Displays description as text when not editing', () => {
        renderComponent({ isEditingDescription: false });
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Add a description here')).not.toBeInTheDocument();
    });
});