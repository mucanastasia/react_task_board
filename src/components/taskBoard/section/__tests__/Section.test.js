import { render, screen, fireEvent } from '@testing-library/react';
import Section from '../Section';
import { useTasks } from '../../../../contexts/TasksContext';
import { useSection } from '../../../../contexts/SectionContext';
import { useTheme } from '../../../../contexts/ThemeContext';
import taskHelpers from '../../../../helpers/taskHelpers';

jest.mock('../../../../contexts/TasksContext', () => ({
    useTasks: jest.fn(),
}));

jest.mock('../../../../contexts/SectionContext', () => ({
    useSection: jest.fn(),
}));

jest.mock('../../../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

jest.mock('../../../../helpers/taskHelpers', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('../SectionHeader', () => () => <div>SectionHeader Component</div>);
jest.mock('../../DropPointer', () => ({ show }) => show ? <div>DropPointer Component</div> : null);
jest.mock('../tasksList/TasksList', () => () => <div>TasksList Component</div>);

describe('Section Component', () => {
    const setTasks = jest.fn();
    const addTask = jest.fn();
    const processDropOnSection = jest.fn();

    beforeEach(() => {
        useTasks.mockReturnValue({
            tasks: [],
            setTasks,
        });
        useSection.mockReturnValue({
            sectionId: 'toDo',
        });
        useTheme.mockReturnValue({
            theme: 'light',
        });
        taskHelpers.mockImplementation((tasks, setTasks) => ({
            addTask,
            processDropOnSection,
        }));
    });

    const createBubbledEvent = (type, props = {}) => {
        const event = new Event(type, { bubbles: true });
        Object.assign(event, props);
        return event;
    };

    test('Renders Section without crashing', () => {
        render(<Section />);
        expect(screen.getByText('SectionHeader Component')).toBeInTheDocument();
        expect(screen.getByText('TasksList Component')).toBeInTheDocument();
        expect(screen.getByText('Add a task')).toBeInTheDocument();
    });

    test('Handles Add Task button click', () => {
        render(<Section />);
        const addButton = screen.getByText('Add a task');
        fireEvent.click(addButton);
        expect(addTask).toHaveBeenCalledWith('toDo');
    });

    test('Handles Drag Over at Top', () => {
        render(<Section />);
        const sectionDiv = screen.getByTitle('toDo');
        const containerRect = {
            bottom: 646.1171875,
            height: 549,
            left: 23.1171875,
            right: 403.1171875,
            top: 97.1171875,
            width: 380,
            x: 23.1171875,
            y: 97.1171875,
        };

        sectionDiv.getBoundingClientRect = () => containerRect;

        fireEvent(sectionDiv, createBubbledEvent('dragover', {
            clientY: containerRect.top + 50
        }));

        expect(screen.getByText('DropPointer Component')).toBeInTheDocument();
    });

    test('Handles Drop at Top', () => {
        render(<Section />);
        const sectionDiv = screen.getByTitle('toDo');
        const containerRect = {
            bottom: 646.1171875,
            height: 549,
            left: 23.1171875,
            right: 403.1171875,
            top: 97.1171875,
            width: 380,
            x: 23.1171875,
            y: 97.1171875,
        };

        sectionDiv.getBoundingClientRect = () => containerRect;

        fireEvent(sectionDiv, createBubbledEvent('dragover', {
            clientY: containerRect.top + 50
        }));

        expect(screen.getByText('DropPointer Component')).toBeInTheDocument();

        const dataTransfer = {
            getData: jest.fn().mockReturnValue('1'),
            setData: jest.fn(),
            dropEffect: 'move'
        };

        fireEvent(sectionDiv, createBubbledEvent('drop', {
            dataTransfer,
            clientY: containerRect.top + 50
        }));

        expect(processDropOnSection).toHaveBeenCalledWith(1, { top: true, bottom: false, sectionId: 'toDo' });
    });

    test('Handles Drop at Bottom', () => {
        render(<Section />);
        const sectionDiv = screen.getByTitle('toDo');
        const containerRect = {
            bottom: 646.1171875,
            height: 549,
            left: 23.1171875,
            right: 403.1171875,
            top: 97.1171875,
            width: 380,
            x: 23.1171875,
            y: 97.1171875,
        };

        sectionDiv.getBoundingClientRect = () => containerRect;

        fireEvent(sectionDiv, createBubbledEvent('dragover', {
            clientY: containerRect.bottom - 20
        }));

        expect(screen.getByText('DropPointer Component')).toBeInTheDocument();

        const dataTransfer = {
            getData: jest.fn().mockReturnValue('1'),
            setData: jest.fn(),
            dropEffect: 'move'
        };

        fireEvent(sectionDiv, createBubbledEvent('drop', {
            dataTransfer,
            clientY: containerRect.bottom - 20
        }));

        expect(processDropOnSection).toHaveBeenCalledWith(1, { top: false, bottom: true, sectionId: 'toDo' });
    });

    test('Handles Drag Leave', () => {
        render(<Section />);
        const sectionDiv = screen.getByTitle('toDo');

        fireEvent(sectionDiv, createBubbledEvent('dragover', {
            clientY: 120
        }));

        expect(screen.getByText('DropPointer Component')).toBeInTheDocument();

        fireEvent(sectionDiv, createBubbledEvent('dragleave'));

        expect(screen.queryByText('DropPointer Component')).not.toBeInTheDocument();
    });
});