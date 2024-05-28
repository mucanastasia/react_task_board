import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DeveloperToolsTaskBoard from '../DeveloperToolsTaskBoard';
import { useTasks } from '../../../contexts/TasksContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { useBoardName } from '../../../contexts/BoardNameContext';
import taskHelpers from '../../../helpers/taskHelpers';
import { exampleTasks, exampleBoardName } from '../../../helpers/exampleTasks';

jest.mock('../../../contexts/TasksContext', () => ({
    useTasks: jest.fn(),
}));

jest.mock('../../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

jest.mock('../../../contexts/BoardNameContext', () => ({
    useBoardName: jest.fn(),
}));

jest.mock('../../../helpers/taskHelpers', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('DeveloperToolsTaskBoard Component', () => {
    beforeEach(() => {
        useTheme.mockReturnValue({ theme: 'light' });
        useBoardName.mockReturnValue({ setBoardName: jest.fn() });
        useTasks.mockReturnValue({ tasks: [], setTasks: jest.fn() });

        taskHelpers.mockReturnValue({
            saveTasks: jest.fn(),
        });
    });

    test('Renders DeveloperToolsTaskBoard without crashing', () => {
        render(<DeveloperToolsTaskBoard />);
        expect(screen.getByText('Auto fill task board')).toBeInTheDocument();
    });

    test('Handles Auto Fill button click', () => {
        const saveTasks = jest.fn();
        const setBoardName = jest.fn();

        useTasks.mockReturnValue({ tasks: [], setTasks: jest.fn() });
        useBoardName.mockReturnValue({ setBoardName });
        taskHelpers.mockReturnValue({ saveTasks });

        render(<DeveloperToolsTaskBoard />);
        const autoFillButton = screen.getByText('Auto fill task board');
        userEvent.click(autoFillButton);

        expect(saveTasks).toHaveBeenCalledWith(exampleTasks);
        expect(setBoardName).toHaveBeenCalledWith(exampleBoardName);
    });

    test('Handles Delete All button click', () => {
        const saveTasks = jest.fn();
        const setBoardName = jest.fn();

        useTasks.mockReturnValue({ tasks: exampleTasks, setTasks: jest.fn() });
        useBoardName.mockReturnValue({ setBoardName });
        taskHelpers.mockReturnValue({ saveTasks });

        render(<DeveloperToolsTaskBoard />);
        const deleteAllButton = screen.getByText('Delete all tasks');
        userEvent.click(deleteAllButton);

        expect(saveTasks).toHaveBeenCalledWith([]);
        expect(setBoardName).toHaveBeenCalledWith({ name: 'Untitled task board', isEditing: false });
    });
});
