import React from 'react';
import TaskCard from './TaskCard';
import TaskContent from './TaskContent';

export default function Task({ task, handleDropOverTask, id }) {
    return (
        <TaskCard task={task} handleDropOverTask={handleDropOverTask}>
            <TaskContent task={task} id={id} />
        </TaskCard>
    );
}