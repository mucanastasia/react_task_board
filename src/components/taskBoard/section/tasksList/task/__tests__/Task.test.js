import { render, screen, fireEvent } from '@testing-library/react';
import Task from '../Task';
import { useBoard } from '../../../../../../contexts/BoardContext';
import { useCurrentTask } from '../../../../../../contexts/CurrentTaskContext';
import { useTheme } from '../../../../../../contexts/ThemeContext';
import taskHelpers from '../../../../../../helpers/taskHelpers';
import { createDragImage } from '../../../../../../helpers/dragHelpers';

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

jest.mock('../../../../../../helpers/dragHelpers', () => ({
    createDragImage: jest.fn(),
}));

jest.mock('../TaskContent', () => () => <div>TaskContent Component</div>);
jest.mock('../../../../DropPointer', () => ({ show, 'data-testid': dataTestId }) => show ? <div data-testid={dataTestId}>DropPointer Component</div> : null);

describe('Task Component', () => {
    const setTasks = jest.fn();
    const getSortIdAbove = jest.fn();
    const processDropBetween = jest.fn();
    const containerRect = {
        bottom: 260.1171875,
        height: 110,
        left: 437.1171875,
        right: 785.1171875,
        top: 150.1171875,
        width: 348,
        x: 437.1171875,
        y: 150.1171875,
    }; // Mock realistic dimensions

    beforeEach(() => {
        useBoard.mockReturnValue({
            tasks: [],
            setTasks,
        });
        useCurrentTask.mockReturnValue({
            task: { id: 1, name: 'Test Task', description: 'Test Description', sortId: 1, status: 'toDo', isEditingName: false, isEditingDescription: false },
        });
        useTheme.mockReturnValue({
            theme: 'light',
        });
        taskHelpers.mockImplementation(() => ({
            getSortIdAbove,
            processDropBetween,
        }));
        getSortIdAbove.mockClear();
        processDropBetween.mockClear();
        setTasks.mockClear();
        createDragImage.mockClear();
    });

    const createBubbledEvent = (type, props = {}) => {
        const event = new Event(type, { bubbles: true });
        Object.assign(event, props);
        return event;
    };

    test('Renders Task without crashing', () => {
        render(<Task />);
        expect(screen.getByText('TaskContent Component')).toBeInTheDocument();
        expect(screen.getByTestId('task')).toBeInTheDocument();
    });

    test('Handles drag start', () => {
        render(<Task />);
        const taskDiv = screen.getByTestId('task');
        fireEvent(taskDiv, createBubbledEvent('dragstart', {
            dataTransfer: { setData: jest.fn() },
        }));

        expect(createDragImage).toHaveBeenCalled();
        setTimeout(() => {
            expect(taskDiv).toHaveClass('grabbing', 'taskMoving');
        }, 50);
    });

    test('Handles drag end', () => {
        render(<Task />);
        const taskDiv = screen.getByTestId('task');
        fireEvent(taskDiv, createBubbledEvent('dragend', {
            dataTransfer: { clearData: jest.fn() },
        }));

        expect(taskDiv).not.toHaveClass('grabbing', 'taskMoving');
    });

    test('Handles drag over in top half', () => {
        render(<Task />);
        const taskDiv = screen.getByTestId('task');
        taskDiv.getBoundingClientRect = jest.fn(() => containerRect);

        fireEvent(taskDiv, createBubbledEvent('dragover', { clientY: containerRect.top + (containerRect.height / 4) }));

        expect(screen.getByTestId('drop-pointer-top')).toBeInTheDocument();
        expect(screen.queryByTestId('drop-pointer-bottom')).not.toBeInTheDocument();
    });

    test('Handles drag over in bottom half', () => {
        render(<Task />);
        const taskDiv = screen.getByTestId('task');
        taskDiv.getBoundingClientRect = jest.fn(() => containerRect);

        fireEvent(taskDiv, createBubbledEvent('dragover', { clientY: containerRect.bottom - (containerRect.height / 4) }));

        expect(screen.getByTestId('drop-pointer-bottom')).toBeInTheDocument();
        expect(screen.queryByTestId('drop-pointer-top')).not.toBeInTheDocument();
    });

    test('Handles drop', () => {
        render(<Task />);
        const taskDiv = screen.getByTestId('task');
        taskDiv.getBoundingClientRect = jest.fn(() => containerRect);

        fireEvent(taskDiv, createBubbledEvent('dragover', { clientY: containerRect.top + (containerRect.height / 4) }));
        fireEvent(taskDiv, createBubbledEvent('drop', {
            dataTransfer: { getData: jest.fn().mockReturnValue('2') },
        }));

        expect(processDropBetween).toHaveBeenCalled();
        expect(screen.queryByTestId('drop-pointer-top')).not.toBeInTheDocument();
        expect(screen.queryByTestId('drop-pointer-bottom')).not.toBeInTheDocument();
    });

    test('Handles drag leave', () => {
        render(<Task />);
        const taskDiv = screen.getByTestId('task');
        taskDiv.getBoundingClientRect = jest.fn(() => containerRect);

        fireEvent(taskDiv, createBubbledEvent('dragover', { clientY: containerRect.bottom - (containerRect.height / 4) }));
        expect(screen.getByTestId('drop-pointer-bottom')).toBeInTheDocument();

        fireEvent(taskDiv, createBubbledEvent('dragleave'));
        expect(screen.queryByTestId('drop-pointer-top')).not.toBeInTheDocument();
        expect(screen.queryByTestId('drop-pointer-bottom')).not.toBeInTheDocument();
    });
});