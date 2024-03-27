import React from 'react';
import { useTasks } from '../../../../TasksContext';
import taskHelpers from '../../../../helpers/taskHelpers';

export default function SectionHeader({ sectionId, name }) {
    const { tasks } = useTasks();
    const { countTasksInSection } = taskHelpers(tasks);

    return (
        <div className={`title title_${sectionId}`}>
            {name}
            <span>{countTasksInSection(sectionId)}</span>
        </div>
    );
}