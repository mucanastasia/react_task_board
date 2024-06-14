import React from 'react';
import { useBoard } from '../../../../contexts/BoardContext.js';
import { useSection } from '../../../../contexts/SectionContext.js';
import { CurrentTaskProvider } from '../../../../contexts/CurrentTaskContext.js';
import taskHelpers from '../../../../helpers/taskHelpers.js';
import Task from './task/Task.js';
import { AnimatePresence } from 'framer-motion';

export default function TasksList() {
    const { tasks, setTasks, currentBoardId } = useBoard();
    const { getSectionTasks } = taskHelpers(tasks, setTasks, currentBoardId);
    const { sectionId } = useSection();

    const renderList = (sectionId) => {
        const list = getSectionTasks(sectionId)
            .map((task) => (
                <CurrentTaskProvider key={`${currentBoardId}_${task.id}`} task={task}>
                    <Task key={`${currentBoardId}_${task.id}`} />
                </CurrentTaskProvider >
            ));
        return list;
    };

    return (

        <div data-testid='tasks-list'>
            <AnimatePresence key={`${currentBoardId}_${sectionId}`}>
                {renderList(sectionId)}
            </AnimatePresence>
        </div>

    );
}