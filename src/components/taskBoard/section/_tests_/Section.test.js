import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
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

    test('Handles Drag Over', () => {
        render(<Section />);
        const sectionDiv = screen.getByTitle('toDo');

        fireEvent.dragOver(sectionDiv); // It drags over somewhere at the bottom
        expect(screen.getByText('DropPointer Component')).toBeInTheDocument();
    });

    test('Handles Drop', () => {
        render(<Section />);
        const sectionDiv = screen.getByTitle('toDo');
        fireEvent.dragOver(sectionDiv); // It drags over somewhere at the bottom

        expect(screen.getByText('DropPointer Component')).toBeInTheDocument();

        fireEvent.drop(sectionDiv, {
            dataTransfer: { getData: () => '1' },
        });

        expect(screen.queryByText('DropPointer Component')).not.toBeInTheDocument();
        expect(processDropOnSection).toHaveBeenCalledWith(1, { top: false, bottom: true, sectionId: 'toDo' });
    });

    test('Handles Drag Leave', () => {
        render(<Section />);
        const sectionDiv = screen.getByTitle('toDo');

        fireEvent.dragOver(sectionDiv); // It drags over somewhere at the bottom
        expect(screen.getByText('DropPointer Component')).toBeInTheDocument();

        fireEvent.dragLeave(sectionDiv);
        expect(screen.queryByText('DropPointer Component')).not.toBeInTheDocument();
    });
});
