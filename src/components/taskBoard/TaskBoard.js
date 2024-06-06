import React, { useEffect } from 'react';
import { useTasks } from '../../contexts/TasksContext.js';
import { getTasksFromLocalStorage } from '../../services/localStorageService';
import { SectionProvider } from '../../contexts/SectionContext.js';
import BoardHeader from '../header/BoardHeader.js';
import Section from './section/Section.js';
import DeveloperToolsTaskBoard from './DeveloperToolsTaskBoard';
import './taskBoard.css';

export default function TaskBoard() {
    const { setTasks } = useTasks();

    useEffect(() => {
        const storedTasks = getTasksFromLocalStorage();
        setTasks(storedTasks);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <BoardHeader />
            <div className='container'>
                <SectionProvider sectionId='toDo' name='To do' >
                    <Section />
                </SectionProvider>

                <SectionProvider sectionId='inProgress' name='In progress' >
                    <Section />
                </SectionProvider>

                <SectionProvider sectionId='done' name='Done' >
                    <Section />
                </SectionProvider>
            </div>
            <DeveloperToolsTaskBoard />
        </>
    );
}