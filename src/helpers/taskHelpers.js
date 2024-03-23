import { updateLocalstorage } from "../services/localStorageService";

export default function taskHelper(tasks, setTasks) {

    const createTask = (sectionId) => {
        const filteredAndSortedList = tasks.filter((task) => task.status === sectionId).sort((a, b) => a.sortId - b.sortId);
        const newTask = {
            id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
            sortId: tasks.length > 0 ? filteredAndSortedList.at([filteredAndSortedList.length - 1]).sortId + 1000000 : 1000000,
            name: '',
            description: '',
            status: sectionId,
            isEditingName: true,
            isEditingDescription: true,
            done: sectionId === 'done', // NOTE: probably, there is no need for done property.
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
        updateLocalstorage('storedTasks', updatedTasks);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        updateLocalstorage('storedTasks', updatedTasks);
    };

    const countTasksInSection = (sectionId) => {
        let counter = 0;
        const filteredTasks = tasks.filter((task) => task.name && task.description && task.status === sectionId);
        counter = filteredTasks.length;
        return counter;
    };

    const processCheck = (taskId, sectionId) => {
        let lastSortId = 0;
        let newStatus = '';
        (sectionId === 'inProgress' || sectionId === 'toDo') ? newStatus = 'done' : newStatus = 'toDo';
        const filteredAndSortedList = tasks.filter((task) => task.status === newStatus).sort((a, b) => a.sortId - b.sortId);
        lastSortId = filteredAndSortedList.length > 0 ? filteredAndSortedList.at([filteredAndSortedList.length - 1]).sortId : 0;
        /*
        var task = getById(taskId);
        task.status = "done";
        moveToEnd(task);
        updateTasks();
    
        if (task.id === taskId) {
          if (task.done) {
            ...
          } else {
            ...
          }
        }
    
        */
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId && !task.done) {
                return { ...task, done: true, status: 'done', sortId: lastSortId + 1000000, };
            } else if (task.id === taskId && task.done) {
                return { ...task, done: false, status: 'toDo', sortId: lastSortId + 1000000, };
            }
            return task;
        });
        setTasks(updatedTasks);
        updateLocalstorage('storedTasks', updatedTasks);
    };




    return { addTask, updateTask, deleteTask, countTasksInSection, processCheck };
}