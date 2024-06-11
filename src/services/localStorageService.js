// Board methods

export const getBoardsFromLocalStorage = () => {
    try {
        const storedBoards = JSON.parse(localStorage.getItem('storedBoardsName') || '[]');
        return storedBoards;
    } catch (error) {
        console.error('Error parsing stored boards data:', error);
        return [];
    }
};

export const setBoardsInLocalStorage = (updatedBoards) => {
    const filteredUpdatedBoards = updatedBoards.filter((board) => (board.name?.trim() || '').length > 0);
    localStorage.setItem('storedBoardsName', JSON.stringify(filteredUpdatedBoards));
};

export const deleteBoardFromLocalStorage = (boardId) => {
    localStorage.removeItem(boardId);
};

// Tasks methods

export const getTasksFromLocalStorage = (boardId) => {
    try {
        const storedTasks = JSON.parse(localStorage.getItem(boardId) || '[]');
        return storedTasks;
    } catch (error) {
        console.error('Error parsing stored tasks:', error);
        return [];
    }
};

export const setTasksInLocalStorage = (boardId, updatedTasks) => {
    const filteredUpdatedTasks = updatedTasks.filter((task) => (task.name?.trim() || '').length > 0 && (task.description?.trim() || '').length > 0);
    localStorage.setItem(boardId, JSON.stringify(filteredUpdatedTasks));
};

// Theme methods

export const getThemeFromLocalStorage = () => {
    return localStorage.getItem('theme') || 'light';
};

export const setThemeInLocalStorage = (theme) => {
    localStorage.setItem('theme', theme);
};

// Sidebar methods

export const getSidebarStatusFromLocalStorage = () => {
    try {
        const storedIsOpen = JSON.parse(localStorage.getItem('isSidebarOpen')) || false;
        return storedIsOpen;
    } catch (error) {
        console.error('Error parsing stored isSidebarOpen:', error);
        return false;
    }
};

export const setSidebarStatusInLocalStorage = (isOpen) => {
    localStorage.setItem('isSidebarOpen', JSON.stringify(isOpen));
};