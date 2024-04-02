import React from 'react';
import { useTasks } from '../../../../contexts/TasksContext';
import { useSection } from '../../../../contexts/SectionContext';
import taskHelpers from '../../../../helpers/taskHelpers';

export default function SectionHeader() {
    const { tasks } = useTasks();
    const { countTasksInSection } = taskHelpers(tasks);
    const { sectionId, name } = useSection();

    return (
        <div className={`title title_${sectionId}`}>
            {name}
            <span>{countTasksInSection(sectionId)}</span>
        </div>
    );
}