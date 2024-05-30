import { updateLocalStorage } from "../../services/localStorageService";
import taskHelpers from "../taskHelpers";

// Mock the updateLocalStorage function
jest.mock('../../services/localStorageService');

describe('taskHelpers', () => {
    let tasks, setTasks, helpers;

    beforeEach(() => {
        tasks = [
            { id: 1, sortId: 1000000, status: 'toDo' },
            { id: 2, sortId: 2000000, status: 'done' },
            { id: 3, sortId: 3000000, status: 'done' }
        ];
        setTasks = jest.fn();
        helpers = taskHelpers(tasks, setTasks);
    });

    test('1 - getSectionTasks returns tasks for a section sorted by sortId', () => {
        const result = helpers.getSectionTasks('toDo');
        expect(result).toEqual([{ id: 1, sortId: 1000000, status: 'toDo' }]);
    });

    test('2 - getSortIdToAppend returns correct sortId to append', () => {
        const result = helpers.getSortIdToAppend('toDo');
        expect(result).toBe(2000000);
    });

    test('3 - saveTasks calls setTasks and updateLocalStorage', () => {
        const newTasks = [...tasks, { id: 4, sortId: 2000000, status: 'toDo' }];
        helpers.saveTasks(newTasks);
        expect(setTasks).toHaveBeenCalledWith(newTasks);
        expect(updateLocalStorage).toHaveBeenCalledWith(newTasks);
    });

    test('4 - createTask creates a new task with incremented id and sortId', () => {
        const result = helpers.createTask('toDo');
        expect(result).toEqual({
            id: 4,
            sortId: 2000000,
            name: '',
            description: '',
            status: 'toDo',
            isEditingName: true,
            isEditingDescription: true,
        });
    });

    test('5 - addTask adds a new task', () => {
        helpers.addTask('toDo');
        expect(setTasks).toHaveBeenCalledWith([
            ...tasks,
            expect.objectContaining({ id: 4, sortId: 2000000, status: 'toDo' })
        ]);
    });

    test('6 - updateTask updates a task', () => {
        const updatedTaskData = { name: 'Updated Task' };
        helpers.updateTask(1, updatedTaskData);
        expect(setTasks).toHaveBeenCalledWith([
            { id: 1, sortId: 1000000, status: 'toDo', name: 'Updated Task' },
            tasks[1],
            tasks[2]
        ]);
    });

    test('7 - deleteTask deletes a task', () => {
        helpers.deleteTask(1);
        expect(setTasks).toHaveBeenCalledWith([tasks[1], tasks[2]]);
    });

    test('8 - countTasksInSection returns the number of tasks in a section', () => {
        const result = helpers.countTasksInSection('toDo');
        expect(result).toBe(1);
    });

    test('9 - processCheck changes the task status and updates sortId', () => {
        helpers.processCheck(tasks[0]);
        expect(setTasks).toHaveBeenCalledWith(expect.any(Array));
    });

    test('10 - getSortIdAbove returns the sortId above the given task', () => {
        // Case 1: No tasks above (the task is at the top)
        const result1 = helpers.getSortIdAbove(2, 2000000, 'done', { top: true, bottom: false });
        expect(result1).toBe(0);

        // Case 2: Task is in the middle
        const result2 = helpers.getSortIdAbove(3, 3000000, 'done', { top: true, bottom: false });
        expect(result2).toBe(2000000);

        // Case 3: Task is at the bottom
        const result3 = helpers.getSortIdAbove(3, 3000000, 'done', { top: false, bottom: true });
        expect(result3).toBe(3000000);

        // Case 4: Task is not in the specified section
        const result4 = helpers.getSortIdAbove(1, 1000000, 'done', { top: true, bottom: false });
        expect(result4).toBe(0);

        // Case 5: No tasks in the section
        const result5 = helpers.getSortIdAbove(1, 1000000, 'nonexistent', { top: true, bottom: false });
        expect(result5).toBe(0);
    });

    test('11 - getSortIdBetween returns the correct sortId between two tasks', () => {
        // Case 1: No tasks below (assign new sortId)
        const result1 = helpers.getSortIdBetween(1, 'done', 3000000);
        expect(result1).toBe(4000000);  // No tasks below, should return 3000000 + 1000000

        // Case 2: Task in the middle
        const result2 = helpers.getSortIdBetween(2, 'done', 2000000);
        expect(result2).toBe(2500000);  // Average of 2000000 and 3000000

        // Case 3: Task at the top (above all other tasks)
        const result3 = helpers.getSortIdBetween(1, 'done', 1000000);
        expect(result3).toBe(1500000);  // Average of 1000000 and 2000000

        // Case 4: Section is empty
        const result4 = helpers.getSortIdBetween(1, 'empty', 1000000);
        expect(result4).toBe(2000000);  // First task in section, should be sortId above + offset
    });

    test('12 - processDropBetween updates the task with new sortId and status', () => {
        helpers.processDropBetween(1, 'done', 1000000);
        expect(setTasks).toHaveBeenCalledWith(expect.any(Array));
    });

    test('13 - processDropOnSection processes drop on section correctly', () => {
        helpers.processDropOnSection(1, { top: false, bottom: true, sectionId: 'done' });
        expect(setTasks).toHaveBeenCalledWith(expect.any(Array));
    });
});