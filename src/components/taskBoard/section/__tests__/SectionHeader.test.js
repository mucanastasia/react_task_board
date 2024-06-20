import { render, screen } from '@testing-library/react';
import SectionHeader from '../SectionHeader';
import { useBoard } from '../../../../contexts/BoardContext';
import { useSection } from '../../../../contexts/SectionContext';
import taskHelpers from '../../../../helpers/taskHelpers';

jest.mock('../../../../contexts/BoardContext', () => ({
    useBoard: jest.fn(),
}));

jest.mock('../../../../contexts/SectionContext', () => ({
    useSection: jest.fn(),
}));

jest.mock('../../../../helpers/taskHelpers', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('SectionHeader Component', () => {
    beforeEach(() => {
        useBoard.mockReturnValue({ tasks: [] });
        useSection.mockReturnValue({ sectionId: 'toDo', name: 'To do' });
        taskHelpers.mockImplementation((tasks) => ({
            countTasksInSection: (sectionId) => tasks.filter(task => task.status === sectionId).length,
        }));
    });

    test('Renders SectionHeader without crashing', () => {
        render(<SectionHeader />);
        expect(screen.getByText('To do')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('Displays correct task count', () => {
        const tasks = [
            { id: 1, name: 'Task 1', status: 'toDo' },
            { id: 2, name: 'Task 2', status: 'toDo' },
            { id: 3, name: 'Task 3', status: 'done' },
        ];
        useBoard.mockReturnValue({ tasks });
        render(<SectionHeader />);
        expect(screen.getByText('2')).toBeInTheDocument(); // 2 tasks in 'toDo' section
    });

    test('Applies correct class based on sectionId', () => {
        useSection.mockReturnValue({ sectionId: 'inProgress', name: 'In Progress' });
        render(<SectionHeader />);
        const titleElement = screen.getByText('In Progress');
        expect(titleElement).toHaveClass('title_inProgress');
    });
});