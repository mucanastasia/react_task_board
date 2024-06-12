import React, { useEffect } from 'react';
import { useBoard } from '../../contexts/BoardContext.js';
import { getTasksFromLocalStorage } from '../../services/localStorageService';
import { SectionProvider } from '../../contexts/SectionContext.js';
import { CurrentBoardProvider } from '../../contexts/CurrentBoardContext.js';
import BoardHeader from '../header/BoardHeader.js';
import Section from './section/Section.js';
import PageTransition from '../pageTransition/PageTransition.js';
import './taskBoard.css';

export default function TaskBoard({ board }) {
    const { setTasks, setCurrentBoardId } = useBoard();

    useEffect(() => {
        const storedTasks = getTasksFromLocalStorage(board.id);
        setTasks(storedTasks);
        setCurrentBoardId(board.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PageTransition keyProp={board.id}>
            <CurrentBoardProvider board={board} >
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
            </CurrentBoardProvider>
        </PageTransition>
    );
}