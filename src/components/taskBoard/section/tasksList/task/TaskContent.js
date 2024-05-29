import React from 'react';
import { useTasks } from '../../../../../contexts/TasksContext';
import { useCurrentTask } from '../../../../../contexts/CurrentTaskContext';
import taskHelper from '../../../../../helpers/taskHelpers';
import Input from './Input';
import './taskContent.css';
import { useTheme } from '../../../../../contexts/ThemeContext';

export default function TaskContent() {
    const { tasks, setTasks } = useTasks();
    const { updateTask, deleteTask, processCheck } = taskHelper(tasks, setTasks);
    const { task } = useCurrentTask();
    const { theme } = useTheme();

    const handleEdit = () => {
        updateTask(task.id, { ...task, isEditingName: true, isEditingDescription: true });
    };

    const handleDelete = () => {
        deleteTask(task.id);
    };

    const handleClick = () => {
        processCheck(task);
    };

    return (
        <>
            <div className='taskTitle'>
                <button className={`btnIco ${task.status === 'done' ? 'btnDone' : 'btnCheck'} ${theme}`} onClick={handleClick} aria-label='check' />
                {
                    task.isEditingName
                        ? <Input type='name' value={task.name} placeholder='Add a task name here' />
                        : <h5>{task.name}</h5>
                }
                <button className={`btnIco btnEdit ${theme}`} onClick={handleEdit} aria-label='edit' />
                <button className={`btnIco btnDelete ${theme}`} onClick={handleDelete} aria-label='delete' />
            </div>

            {
                task.isEditingDescription
                    ? <Input type='description' value={task.description} placeholder='Add a description here' />
                    : <p>{task.description}</p>
            }
        </>
    );
}