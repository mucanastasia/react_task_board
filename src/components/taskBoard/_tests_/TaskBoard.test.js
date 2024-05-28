import { render, screen } from '@testing-library/react';
import TaskBoard from '../TaskBoard';
import { useTasks } from '../../../contexts/TasksContext';
import { getTasksFromLocalStorage } from '../../../services/localStorageService';

jest.mock('../../../contexts/TasksContext', () => ({
    useTasks: jest.fn(),
}));

jest.mock('../../../services/localStorageService', () => ({
    getTasksFromLocalStorage: jest.fn(),
}));

jest.mock('../section/Section', () => () => <div>Section Component</div>);
jest.mock('../DeveloperToolsTaskBoard', () => () => <div>DeveloperToolsTaskBoard Component</div>);

describe('TaskBoard Component', () => {
    beforeEach(() => {
        useTasks.mockReturnValue({
            setTasks: jest.fn(),
        });
        getTasksFromLocalStorage.mockReturnValue([]);
    });

    test('Renders TaskBoard without crashing', () => {
        render(<TaskBoard />);

        const sections = screen.getAllByText('Section Component');
        expect(sections).toHaveLength(3);

        const devToolsTaskBoard = screen.getByText('DeveloperToolsTaskBoard Component');
        expect(devToolsTaskBoard).toBeInTheDocument();
    });

    test('Loads tasks from local storage on mount', () => {
        const setTasks = jest.fn();
        useTasks.mockReturnValue({ setTasks });
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

        render(<TaskBoard />);

        expect(setTasks).toHaveBeenCalledWith(storedTasks);
    });
});