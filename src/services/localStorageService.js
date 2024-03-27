const key = 'storedTasks';

export const getTasksFromLocalstorage = () => {
    try {
        const storedTasks = JSON.parse(localStorage.getItem(key) || '[]');
        return storedTasks;
    } catch (error) {
        console.error('Error parsing stored tasks:', error);
        return [];
    }
};

export const updateLocalstorage = (updatedTasks) => {
    const filteredUpdatedTasks = updatedTasks.filter((task) => (task.name?.trim() || '').length > 0 && (task.description?.trim() || '').length > 0);
    localStorage.setItem(key, JSON.stringify(filteredUpdatedTasks));
};