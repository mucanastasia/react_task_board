import {
    getTasksFromLocalStorage,
    updateLocalStorage,
    getBoardNameFromLocalStorage,
    setBoardNameInLocalStorage,
    getThemeFromLocalStorage,
    setThemeInLocalStorage
} from '../localStorageService';

describe('localStorageService', () => {
    const key = 'storedTasks';
    const boardNameKey = 'boardName';
    const themeKey = 'theme';
    let consoleErrorMock;

    beforeEach(() => {
        localStorage.clear();
        consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleErrorMock.mockRestore();
    });

    test('getTasksFromLocalStorage returns tasks from localStorage', () => {
        const tasks = [{ id: 1, name: 'Task 1', description: 'Description 1' }];
        localStorage.setItem(key, JSON.stringify(tasks));
        const result = getTasksFromLocalStorage();
        expect(result).toEqual(tasks);
    });

    test('getTasksFromLocalStorage returns an empty array if there is an error', () => {
        localStorage.setItem(key, 'invalid JSON');
        const result = getTasksFromLocalStorage();
        expect(result).toEqual([]);
    });

    test('updateLocalStorage updates localStorage with valid tasks', () => {
        const tasks = [
            { id: 1, name: 'Task 1', description: 'Description 1' },
            { id: 2, name: '', description: 'Description 2' },
            { id: 3, name: 'Task 3', description: '' }
        ];
        updateLocalStorage(tasks);
        const storedTasks = JSON.parse(localStorage.getItem(key));
        expect(storedTasks).toEqual([{ id: 1, name: 'Task 1', description: 'Description 1' }]);
    });

    test('getBoardNameFromLocalStorage returns the board name from localStorage', () => {
        const boardName = { name: 'My Board', isEditing: false };
        localStorage.setItem(boardNameKey, JSON.stringify(boardName));
        const result = getBoardNameFromLocalStorage();
        expect(result).toEqual(boardName);
    });

    test('getBoardNameFromLocalStorage returns a default board name if there is an error', () => {
        localStorage.setItem(boardNameKey, 'invalid JSON');
        const result = getBoardNameFromLocalStorage();
        expect(result).toEqual({ name: 'Untitled task board', isEditing: false });
    });

    test('setBoardNameInLocalStorage sets the board name in localStorage if not editing', () => {
        const boardName = { name: 'My Board', isEditing: false };
        setBoardNameInLocalStorage(boardName);
        const storedBoardName = JSON.parse(localStorage.getItem(boardNameKey));
        expect(storedBoardName).toEqual(boardName);
    });

    test('setBoardNameInLocalStorage does not set the board name in localStorage if editing', () => {
        const boardName = { name: 'My Board', isEditing: true };
        setBoardNameInLocalStorage(boardName);
        const storedBoardName = localStorage.getItem(boardNameKey);
        expect(storedBoardName).toBeNull();
    });

    test('getThemeFromLocalStorage returns the theme from localStorage', () => {
        localStorage.setItem(themeKey, 'dark');
        const result = getThemeFromLocalStorage();
        expect(result).toBe('dark');
    });

    test('getThemeFromLocalStorage returns default theme if not set', () => {
        const result = getThemeFromLocalStorage();
        expect(result).toBe('light');
    });

    test('setThemeInLocalStorage sets the theme in localStorage', () => {
        setThemeInLocalStorage('dark');
        const storedTheme = localStorage.getItem(themeKey);
        expect(storedTheme).toBe('dark');
    });
});