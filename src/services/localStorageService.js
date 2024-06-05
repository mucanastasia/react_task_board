const key = 'storedTasks';

export const getTasksFromLocalStorage = () => {
    try {
        const storedTasks = JSON.parse(localStorage.getItem(key) || '[]');
        return storedTasks;
    } catch (error) {
        console.error('Error parsing stored tasks:', error);
        return [];
    }
};

export const updateLocalStorage = (updatedTasks) => {
    const filteredUpdatedTasks = updatedTasks.filter((task) => (task.name?.trim() || '').length > 0 && (task.description?.trim() || '').length > 0);
    localStorage.setItem(key, JSON.stringify(filteredUpdatedTasks));
};

export const getBoardNameFromLocalStorage = () => {
    try {
        const storedBoardName = JSON.parse(localStorage.getItem('boardName')) || { name: 'Untitled task board', isEditing: false };
        return storedBoardName;
    } catch (error) {
        console.error('Error parsing stored boardName:', error);
        return { name: 'Untitled task board', isEditing: false };
    }
};

export const setBoardNameInLocalStorage = (boardName) => {
    if (!boardName.isEditing) {
        localStorage.setItem('boardName', JSON.stringify(boardName));
    }
};

export const getThemeFromLocalStorage = () => {
    return localStorage.getItem('theme') || 'light';
};

export const setThemeInLocalStorage = (theme) => {
    localStorage.setItem('theme', theme);
};

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