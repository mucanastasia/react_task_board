import { updateLocalstorage } from "../services/localStorageService";

export default function taskHelpers(tasks, setTasks) {

    const getFilteredAndSortedList = (sectionId) => {
        return tasks.filter(task => task.status === sectionId).sort((a, b) => a.sortId - b.sortId);
    };

    const getSortIdToAppend = (sectionId) => {
        const filteredAndSortedList = getFilteredAndSortedList(sectionId);
        return filteredAndSortedList.length > 0 ? filteredAndSortedList.at([filteredAndSortedList.length - 1]).sortId + 1000000 : 1000000
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
        setTasks(updatedTasks);
        updateLocalstorage(updatedTasks);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        updateLocalstorage(updatedTasks);
    };

    const countTasksInSection = (sectionId) => {
        return getFilteredAndSortedList(sectionId).length;
    };

    const processCheck = (task) => {
        const newStatus = (task.status === 'done') ? 'toDo' : 'done';
        const newSortId = getSortIdToAppend(newStatus);
        updateTask(task.id, { ...task, done: !task.done, status: newStatus, sortId: newSortId });
    };

    const getSortIdAbove = (taskSortId, sectionId, position) => {
        let sortIdAbove = 0;
        // console.log('Task, where the task were droped {sortId}: ', overSortId);
        if (position.bottom && !position.top) {
            sortIdAbove = taskSortId;
            // console.log('bottom');
        } else if (position.top && !position.bottom) {
            const tasksAbove = getFilteredAndSortedList(sectionId)
                .filter((task) => task.status === sectionId && task.sortId < taskSortId);
            // console.log(tasksAbove);
            sortIdAbove = tasksAbove.length > 0 ? tasksAbove.at([tasksAbove.length - 1]).sortId : 0;
            // console.log('top');
        }
        return sortIdAbove;
    };

    const getSortIdToInsertBetween = (tasksBelow, sortIdAbove) => {
        return tasksBelow.length > 0 ? tasksBelow.at(0).sortId : sortIdAbove + 2000000;
    };

    const updateDroppedTask = (e, newStatus, sortIdAbove, sortIdBelow) => {
        const taskId = e.dataTransfer.getData('text/plain');
        const updatedTasks = tasks.map((task) => {
            if (task.id === +taskId) {
                if ((sortIdAbove === task.sortId || task.sortId === sortIdBelow) && task.status === newStatus) {
                    return task;
                } else {
                    return { ...task, sortId: (sortIdAbove + sortIdBelow) / 2, status: newStatus, done: newStatus === 'done' };
                }
            }
            return task;
        });
        setTasks(updatedTasks);
        updateLocalstorage(updatedTasks);
    };

    const processDropBetween = (e, newStatus, sortIdAbove) => {
        const tasksBelow = getFilteredAndSortedList(newStatus)
            .filter((task) => task.status === newStatus && task.sortId > sortIdAbove);
        const sortIdBelow = getSortIdToInsertBetween(tasksBelow, sortIdAbove);
        updateDroppedTask(e, newStatus, sortIdAbove, sortIdBelow);
    };

    const processDropOnSection = (e, newStatus, isOverContainer) => {
        const tasksBelow = getFilteredAndSortedList(newStatus);

        if (isOverContainer.bottom && isOverContainer.section === newStatus) {
            const sortIdBelow = getSortIdToAppend(newStatus);
            updateDroppedTask(e, newStatus, sortIdBelow, sortIdBelow);

        } else if (isOverContainer.top && isOverContainer.section === newStatus) {
            const sortIdAbove = 0;
            const sortIdBelow = getSortIdToInsertBetween(tasksBelow, sortIdAbove);
            updateDroppedTask(e, newStatus, sortIdAbove, sortIdBelow);
        }
    };

    return { getFilteredAndSortedList, addTask, updateTask, deleteTask, countTasksInSection, processCheck, getSortIdAbove, processDropOnSection, processDropBetween };
}