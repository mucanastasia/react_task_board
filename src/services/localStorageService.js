export const getTasksFromLocalstorage = (key) => {
    return JSON.parse(localStorage.getItem(key) || '[]');
};

export const updateLocalstorage = (key, updatedTasks) => {
    const filteredUpdatedTasks = updatedTasks.filter((task) => (task.name?.trim() || '').length > 0 && (task.description?.trim() || '').length > 0);
    localStorage.setItem(key, JSON.stringify(filteredUpdatedTasks));
};