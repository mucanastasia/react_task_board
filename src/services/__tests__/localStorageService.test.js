import {
    getBoardsFromLocalStorage,
    setBoardsInLocalStorage,
    deleteBoardFromLocalStorage,
    getTasksFromLocalStorage,
    setTasksInLocalStorage,
    getThemeFromLocalStorage,
    setThemeInLocalStorage,
    getSidebarStatusFromLocalStorage,
    setSidebarStatusInLocalStorage,
} from '../../services/localStorageService';

describe('localStorageService', () => {
    let consoleErrorMock;

    beforeEach(() => {
        localStorage.clear();
        consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleErrorMock.mockRestore();
    });

    // Board methods tests
    test('getBoardsFromLocalStorage returns boards from localStorage', () => {
        const boards = [{ id: 1, name: 'Board 1', path: '/boards/1', isEditing: false }];
        localStorage.setItem('storedBoardsName', JSON.stringify(boards));
        const result = getBoardsFromLocalStorage();
        expect(result).toEqual(boards);
    });

    test('getBoardsFromLocalStorage returns an empty array if there is an error', () => {
        localStorage.setItem('storedBoardsName', 'invalid JSON');
        const result = getBoardsFromLocalStorage();
        expect(result).toEqual([]);
    });

    test('setBoardsInLocalStorage sets valid boards in localStorage', () => {
        const boards = [
            { id: 1, name: 'Board 1', path: '/boards/1', isEditing: false },
            { id: 2, name: '', path: '/boards/2', isEditing: false }
        ];
        setBoardsInLocalStorage(boards);
        const storedBoards = JSON.parse(localStorage.getItem('storedBoardsName'));
        expect(storedBoards).toEqual([{ id: 1, name: 'Board 1', path: '/boards/1', isEditing: false }]);
    });

    test('deleteBoardFromLocalStorage removes a board from localStorage', () => {
        const boardId = 1;
        localStorage.setItem(`board_${boardId}`, JSON.stringify({ id: boardId }));
        deleteBoardFromLocalStorage(boardId);
        const storedBoard = localStorage.getItem(`board_${boardId}`);
        expect(storedBoard).toBeNull();
    });

    // Tasks methods tests
    test('getTasksFromLocalStorage returns tasks from localStorage', () => {
        const tasks = [{ id: 1, name: 'Task 1', description: 'Description 1' }];
        localStorage.setItem('board_1', JSON.stringify(tasks));
        const result = getTasksFromLocalStorage('1');
        expect(result).toEqual(tasks);
    });

    test('getTasksFromLocalStorage returns an empty array if there is an error', () => {
        localStorage.setItem('board_1', 'invalid JSON');
        const result = getTasksFromLocalStorage('1');
        expect(result).toEqual([]);
    });

    test('setTasksInLocalStorage sets valid tasks in localStorage', () => {
        const tasks = [
            { id: 1, name: 'Task 1', description: 'Description 1' },
            { id: 2, name: '', description: 'Description 2' },
            { id: 3, name: 'Task 3', description: '' }
        ];
        setTasksInLocalStorage('1', tasks);
        const storedTasks = JSON.parse(localStorage.getItem('board_1'));
        expect(storedTasks).toEqual([{ id: 1, name: 'Task 1', description: 'Description 1' }]);
    });

    // Theme methods tests
    test('getThemeFromLocalStorage returns the theme from localStorage', () => {
        localStorage.setItem('theme', 'dark');
        const result = getThemeFromLocalStorage();
        expect(result).toBe('dark');
    });

    test('getThemeFromLocalStorage returns default theme if not set', () => {
        const result = getThemeFromLocalStorage();
        expect(result).toBe('light');
    });

    test('setThemeInLocalStorage sets the theme in localStorage', () => {
        setThemeInLocalStorage('dark');
        const storedTheme = localStorage.getItem('theme');
        expect(storedTheme).toBe('dark');
    });

    // Sidebar methods tests
    test('getSidebarStatusFromLocalStorage returns the sidebar status from localStorage', () => {
        localStorage.setItem('isSidebarOpen', JSON.stringify(true));
        const result = getSidebarStatusFromLocalStorage();
        expect(result).toBe(true);
    });

    test('getSidebarStatusFromLocalStorage returns false if there is an error', () => {
        localStorage.setItem('isSidebarOpen', 'invalid JSON');
        const result = getSidebarStatusFromLocalStorage();
        expect(result).toBe(false);
    });

    test('setSidebarStatusInLocalStorage sets the sidebar status in localStorage', () => {
        setSidebarStatusInLocalStorage(true);
        const storedStatus = JSON.parse(localStorage.getItem('isSidebarOpen'));
        expect(storedStatus).toBe(true);
    });
});