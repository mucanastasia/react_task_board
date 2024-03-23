import React from 'react';
import { useTasks } from '../../../../TasksContext';
import taskHelper from '../../../../helpers/taskHelpers';

export default function SectionHeader({ sectionId, name }) {
    const { tasks } = useTasks();
    const { countTasksInSection } = taskHelper(tasks);

    return (
        <div className={`title title_${sectionId}`}>
            {name}
            <span>{countTasksInSection(sectionId)}</span>
        </div>
    );
}