import React from 'react';
import { useBoard } from '../../../contexts/BoardContext';
import { useSection } from '../../../contexts/SectionContext';
import taskHelpers from '../../../helpers/taskHelpers';
import './sectionHeader.css';

export default function SectionHeader() {
    const { tasks } = useBoard();
    const { countTasksInSection } = taskHelpers(tasks);
    const { sectionId, name } = useSection();

    return (
        <div className={`title title_${sectionId}`}>
            {name}
            <span>{countTasksInSection(sectionId)}</span>
        </div>
    );
}