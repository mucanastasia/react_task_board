import { updateLocalstorage } from "../services/localStorageService";

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
        updateLocalstorage(updatedTasks);
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
            done: sectionId === 'done',
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
        updateTask(task.id, { ...task, done: !task.done, status: newStatus, sortId: newSortId });
    };

    const getSortIdAbove = (draggedTaskId, taskSortId, sectionId, { top, bottom }) => {
        let sortIdAbove = 0;
        // console.log('Task, where the task were droped {sortId}: ', overSortId);
        if (bottom) {
            sortIdAbove = taskSortId;
            // console.log('bottom');
        } else if (top) {
            const tasksAbove = getSectionTasks(sectionId)
                .filter((task) => task.id !== draggedTaskId && task.sortId < taskSortId);
            // console.log(tasksAbove);
            sortIdAbove = tasksAbove.length > 0 ? tasksAbove.at([tasksAbove.length - 1]).sortId : 0;
            // console.log('top');
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
        updateTask(draggedTaskId, { sortId: newSortId, status: newStatus, done: newStatus === 'done' });
    };

    const processDropOnSection = (draggedTaskId, { top, bottom, sectionId }) => {
        if (bottom) {
            const sectionTasks = getSectionTasks(sectionId);
            if (sectionTasks.length === 0 || sectionTasks[sectionTasks.length - 1].id !== draggedTaskId) {
                const newSortId = getSortIdToAppend(sectionId);
                updateTask(draggedTaskId, { sortId: newSortId, status: sectionId, done: sectionId === 'done' });
            }
        } else if (top) {
            const sortIdAbove = 0;
            const newSortId = getSortIdBetween(draggedTaskId, sectionId, sortIdAbove);
            updateTask(draggedTaskId, { sortId: newSortId, status: sectionId, done: sectionId === 'done' });
        }
    };

    return { getSectionTasks, addTask, updateTask, deleteTask, countTasksInSection, processCheck, getSortIdAbove, processDropOnSection, processDropBetween, saveTasks };
}