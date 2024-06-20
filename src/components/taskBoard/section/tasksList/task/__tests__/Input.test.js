import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';
import { useBoard } from '../../../../../../contexts/BoardContext';
import { useCurrentTask } from '../../../../../../contexts/CurrentTaskContext';
import taskHelper from '../../../../../../helpers/taskHelpers';
import userEvent from '@testing-library/user-event';

jest.mock('../../../../../../contexts/BoardContext', () => ({
    useBoard: jest.fn(),
}));

jest.mock('../../../../../../contexts/CurrentTaskContext', () => ({
    useCurrentTask: jest.fn(),
}));

jest.mock('../../../../../../helpers/taskHelpers', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('Input Component', () => {
    const setTasks = jest.fn();
    const updateTask = jest.fn();

    beforeEach(() => {
        useBoard.mockReturnValue({
            tasks: [],
            setTasks,
        });
        useCurrentTask.mockReturnValue({
            task: { id: 1, name: 'Test Task', description: 'Test Description' },
        });
        taskHelper.mockImplementation(() => ({
            updateTask,
        }));
    });

    test('Renders Name Input without crashing', () => {
        render(<Input type='name' value='Test Task' placeholder='Enter task name' />);
        const inputName = screen.getByPlaceholderText('Enter task name');
        expect(inputName).toBeInTheDocument();
    });

    test('Calls updateTask on change for Name Input', () => {
        render(<Input type='name' value='Test Task' placeholder='Enter task name' />);
        const inputName = screen.getByPlaceholderText('Enter task name');
        fireEvent.change(inputName, { target: { value: 'Updated Task' } });
        expect(updateTask).toHaveBeenCalledWith(1, { name: 'Updated Task' });
    });

    test('Handles blur event for Name Input', () => {
        render(<Input type='name' value='Test Task' placeholder='Enter task name' />);
        const inputName = screen.getByPlaceholderText('Enter task name');
        fireEvent.blur(inputName);
        expect(updateTask).toHaveBeenCalledWith(1, { isEditingName: false });
    });

    test('Handles clear Name Input', () => {
        render(<Input type='name' value='Test Task' placeholder='Enter task name' />);
        const inputName = screen.getByPlaceholderText('Enter task name');
        userEvent.clear(inputName);
        expect(updateTask).toHaveBeenCalledWith(1, { name: '' });
    });

    test('Handles Enter key press for Name Input', () => {
        render(<Input type='name' value='Test Task' placeholder='Enter task name' />);
        const inputName = screen.getByPlaceholderText('Enter task name');
        fireEvent.keyDown(inputName, { key: 'Enter', code: 'Enter', charCode: 13 });
        expect(updateTask).toHaveBeenCalledWith(1, { isEditingName: false });
    });

    test('Handles change for Description Input', () => {
        render(<Input type='description' value='Test Description' placeholder='Enter task description' />);
        const inputDescription = screen.getByPlaceholderText('Enter task description');
        fireEvent.change(inputDescription, { target: { value: 'Updated Description' } });
        expect(updateTask).toHaveBeenCalledWith(1, { ...useCurrentTask().task, description: 'Updated Description' });
    });

    test('Handles blur for Description Input', () => {
        render(<Input type='description' value='Test Description' placeholder='Enter task description' />);
        const inputDescription = screen.getByPlaceholderText('Enter task description');
        fireEvent.blur(inputDescription);
        expect(updateTask).toHaveBeenCalledWith(1, { isEditingDescription: false });
    });

    test('Handles clear Description Input', () => {
        render(<Input type='description' value='Test Task' placeholder='Enter task description' />);
        const inputDescription = screen.getByPlaceholderText('Enter task description');
        userEvent.clear(inputDescription);
        expect(updateTask).toHaveBeenCalledWith(1, { ...useCurrentTask().task, description: '' });
    });

    test('Handles Enter key press for Description Input', () => {
        render(<Input type='description' value='Test Description' placeholder='Enter task description' />);
        const inputDescription = screen.getByPlaceholderText('Enter task description');
        fireEvent.keyDown(inputDescription, { key: 'Enter', code: 'Enter', charCode: 13 });
        expect(updateTask).toHaveBeenCalledWith(1, { isEditingDescription: false });
    });

    test('Input element has autofocus when type is Name', () => {
        render(<Input type='name' value='Test Task' placeholder='Enter task name' />);
        const inputName = screen.getByPlaceholderText('Enter task name');
        expect(inputName).toHaveFocus();
    });

    test('Input element does NOT have autofocus when type is Description', () => {
        render(<Input type='description' value='Test Description' placeholder='Enter task description' />);
        const inputDescription = screen.getByPlaceholderText('Enter task description');
        expect(inputDescription).not.toHaveFocus();
    });
});
