import React, { useEffect } from 'react';
import { useTasks } from '../../TasksContext';
import { getTasksFromLocalstorage } from '../../services/localStorageService';
import Section from './section/Section.js';
import DeveloperToolsTaskBoard from './DeveloperToolsTaskBoard';

export default function TaskBoard() {
    const { setTasks } = useTasks();

    useEffect(() => {
        const storedTasks = getTasksFromLocalstorage('storedTasks');
        setTasks(storedTasks);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className='container'>
                <Section sectionId='toDo' name='To do' />
                <Section sectionId='inProgress' name='In progress' />
                <Section sectionId='done' name='Done' />
            </div>
            <DeveloperToolsTaskBoard />
        </>
    );
}