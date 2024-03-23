import React from 'react';
import { useTasks } from '../../../../../TasksContext';
import taskHelper from '../../../../../helpers/taskHelpers';

export default function Input({ task, id, type, value, placeholder }) {
    const { tasks, setTasks } = useTasks();
    const { updateTask } = taskHelper(tasks, setTasks);

    const handleChange = (e) => {
        type === 'name' && updateTask(id, { ...task, name: e.target.value });
        type === 'description' && updateTask(id, { ...task, description: e.target.value });
    };

    const handleBlur = () => {
        if (type === 'name') {
            if ((task.name?.trim() || '').length > 0) {
                updateTask(id, { ...task, isEditingName: false });
            }
        }
        if (type === 'description') {
            if ((task.description?.trim() || '').length > 0) {
                updateTask(id, { ...task, isEditingDescription: false });
            }
        }
    };

    const handleKeyEnter = (e) => {
        if (type === 'name') {
            if (e.key === 'Enter' && (task.name?.trim() || '').length > 0) {
                updateTask(id, { ...task, isEditingName: false });
            }
        }
        if (type === 'description') {
            if (e.key === 'Enter' && (task.description?.trim() || '').length > 0) {
                updateTask(id, { ...task, isEditingDescription: false });
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