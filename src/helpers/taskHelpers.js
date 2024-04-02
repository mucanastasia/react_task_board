import { updateLocalStorage } from "../services/localStorageService";

export default function taskHelpers(tasks, setTasks) {

    const sortIdOffset = 1000000;

    const getSectionTasks = (sectionId) => {
        return tasks.filter(task => task.status === sectionId).sort((a, b) => a.sortId - b.sortId);
    };

    const getSortIdToAppend = (sectionId) => {
        const sectionTasks = getSectionTasks(sectionId);
        return sectionTasks.length > 0 ? sectionTasks.at([sectionTasks.length - 1]).sortId + sortIdOffset : sortIdOffset;
    };

    const saveTasks = (updatedTasks) => {
        setTasks(updatedTasks);
        updateLocalStorage(updatedTasks);
    };

    const createTask = (sectionId) => {
        const newSortId = getSortIdToAppend(sectionId);
        const newTask = {
            id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
            sortId: newSortId,
            name: '',
            description: '',
            status: sectionId,
            isEditingName: true,
            isEditingDescription: true,
        };
        return newTask;
    };

    const addTask = (sectionId) => {
        const newTask = createTask(sectionId);
        setTasks([...tasks, newTask]);
    };

    const updateTask = (taskId, updatedTaskData) => {
        const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, ...updatedTaskData } : task);
        saveTasks(updatedTasks);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        saveTasks(updatedTasks);
    };

    const countTasksInSection = (sectionId) => {
        return getSectionTasks(sectionId).length;
    };

    const processCheck = (task) => {
        const newStatus = (task.status === 'done') ? 'toDo' : 'done';
        const newSortId = getSortIdToAppend(newStatus);
        updateTask(task.id, { status: newStatus, sortId: newSortId });
    };

    const getSortIdAbove = (draggedTaskId, taskSortId, sectionId, { top, bottom }) => {
        let sortIdAbove = 0;
        if (bottom) {
            sortIdAbove = taskSortId;
        } else if (top) {
            // NOTE: finding sortIdAbove of taskSortId when inserting draggedTaskId above taskSortId
            const tasksAbove = getSectionTasks(sectionId)
                .filter((task) => task.id !== draggedTaskId && task.sortId < taskSortId);
            sortIdAbove = tasksAbove.length > 0 ? tasksAbove.at([tasksAbove.length - 1]).sortId : 0;
        }
        return sortIdAbove;
    };

    const getSortIdBetween = (draggedTaskId, newStatus, sortIdAbove) => {
        const tasksBelow = getSectionTasks(newStatus)
            .filter((task) => task.id !== draggedTaskId && task.sortId > sortIdAbove);
        if (tasksBelow.length === 0) {
            return sortIdAbove + sortIdOffset;
        }
        const sortIdBelow = tasksBelow.at(0).sortId;
        return (sortIdAbove + sortIdBelow) / 2;
    };

    const processDropBetween = (draggedTaskId, newStatus, sortIdAbove) => {
        const newSortId = getSortIdBetween(draggedTaskId, newStatus, sortIdAbove);
        updateTask(draggedTaskId, { sortId: newSortId, status: newStatus });
    };

    const processDropOnSection = (draggedTaskId, { top, bottom, sectionId }) => {
        if (bottom) {
            const sectionTasks = getSectionTasks(sectionId);
            if (sectionTasks.length > 0 && sectionTasks[sectionTasks.length - 1].id === draggedTaskId) {
                // NOTE: fixing increasing sortId when dropping the last task at the bottom of a section (the same position)
                return;
            }
            const newSortId = getSortIdToAppend(sectionId);
            updateTask(draggedTaskId, { sortId: newSortId, status: sectionId });
        } else if (top) {
            const sortIdAbove = 0;
            const newSortId = getSortIdBetween(draggedTaskId, sectionId, sortIdAbove);
            updateTask(draggedTaskId, { sortId: newSortId, status: sectionId });
        }
    };

    return { getSectionTasks, addTask, updateTask, deleteTask, countTasksInSection, processCheck, getSortIdAbove, processDropOnSection, processDropBetween, saveTasks };
}