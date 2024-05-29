import React from 'react';
import { useTasks } from '../../../../contexts/TasksContext.js';
import { useSection } from '../../../../contexts/SectionContext.js';
import { CurrentTaskProvider } from '../../../../contexts/CurrentTaskContext.js';
import taskHelpers from '../../../../helpers/taskHelpers.js';
import Task from './task/Task.js';

export default function TasksList() {
    const { tasks, setTasks } = useTasks();
    const { getSectionTasks } = taskHelpers(tasks, setTasks);
    const { sectionId } = useSection();

    const renderList = (sectionId) => {
        const list = getSectionTasks(sectionId)
            .map((task) => (
                <CurrentTaskProvider key={task.id} task={task}>
                    <Task />
                </CurrentTaskProvider>
            ));
        return list;
    };

    return (
        <div data-testid='tasks-list'>
            {renderList(sectionId)}
        </div>
    );
}