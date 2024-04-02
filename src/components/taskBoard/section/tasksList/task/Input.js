import React from 'react';
import { useTasks } from '../../../../../contexts/TasksContext';
import { useCurrentTask } from '../../../../../contexts/CurrentTaskContext';
import taskHelper from '../../../../../helpers/taskHelpers';

export default function Input({ type, value, placeholder }) {
    const { tasks, setTasks } = useTasks();
    const { updateTask } = taskHelper(tasks, setTasks);
    const { task } = useCurrentTask();

    const handleChange = (e) => {
        type === 'name' && updateTask(task.id, { name: e.target.value });
        type === 'description' && updateTask(task.id, { ...task, description: e.target.value });
    };

    const handleBlur = () => {
        if (type === 'name') {
            if ((task.name?.trim() || '').length > 0) {
                updateTask(task.id, { isEditingName: false });
            }
        }
        if (type === 'description') {
            if ((task.description?.trim() || '').length > 0) {
                updateTask(task.id, { isEditingDescription: false });
            }
        }
    };

    const handleKeyEnter = (e) => {
        if (type === 'name') {
            if (e.key === 'Enter' && (task.name?.trim() || '').length > 0) {
                updateTask(task.id, { isEditingName: false });
            }
        }
        if (type === 'description') {
            if (e.key === 'Enter' && (task.description?.trim() || '').length > 0) {
                updateTask(task.id, { isEditingDescription: false });
            }
        }
    };

    return (
        <input className={type}
            type='text'
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyEnter}
            placeholder={placeholder}
            autoFocus={type === 'name' ? true : false} />
    );
}