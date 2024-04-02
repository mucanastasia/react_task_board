import React from 'react';
import { useTasks } from '../../../../../TasksContext';
import taskHelper from '../../../../../helpers/taskHelpers';
import Input from './Input';

export default function TaskContent({ task }) {
    const { tasks, setTasks } = useTasks();
    const { updateTask, deleteTask, processCheck } = taskHelper(tasks, setTasks);

    const handleEdit = () => {
        updateTask(task.id, { ...task, isEditingName: true, isEditingDescription: true });
    };
    const handleDelete = () => {
        deleteTask(task.id);
    };

    return (
        <>
            <div className='taskTitle'>
                <button className={`btnIco ${task.status === 'done' ? 'btnDone' : 'btnCheck'}`} onClick={() => processCheck(task)} />
                {
                    task.isEditingName
                        ? <Input type='name' task={task} value={task.name} placeholder='Add a task name here' />
                        : <h5>{task.name}</h5>
                }
                <button className='btnIco btnEdit' onClick={handleEdit} />
                <button className='btnIco btnDelete' onClick={handleDelete} />
            </div>

            {
                task.isEditingDescription
                    ? <Input type='description' task={task} value={task.description} placeholder='Add a description here' />
                    : <p>{task.description}</p>
            }
        </>
    );
}