import React from 'react';
import { useTasks } from '../../../../../TasksContext';
import taskHelper from '../../../../../helpers/taskHelpers';
import Input from './Input';

export default function TaskContent({ task, id }) {
    const { tasks, setTasks } = useTasks();
    const { updateTask, deleteTask, processCheck } = taskHelper(tasks, setTasks);

    const handleEdit = () => {
        updateTask(id, { ...task, isEditingName: true, isEditingDescription: true });
    };

    return (
        <>
            <div className='taskTitle'>
                <button className={`btnIco ${task.done ? 'btnDone' : 'btnCheck'}`} onClick={() => processCheck(task)} />
                {
                    task.isEditingName
                        ? <Input type='name' id={id} task={task} value={task.name} placeholder='Add a task name here' />
                        : <h5>{task.name}</h5>
                }
                <button className='btnIco btnEdit' onClick={handleEdit} />
                <button className='btnIco btnDelete' onClick={() => deleteTask(task.id)} />
            </div>

            {
                task.isEditingDescription
                    ? <Input type='description' id={id} task={task} value={task.description} placeholder='Add a description here' />
                    : <p>{task.description}</p>
            }
        </>
    );
}