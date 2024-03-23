import React, { useState } from 'react';
import { useTasks } from '../../../TasksContext';
import { updateLocalstorage } from '../../../services/localStorageService.js';
// import taskHelper from '../../../helpers/taskHelper.js';
import Container from './container/Container.js';
import HeaderOfSection from './sectionHeader/SectionHeader.js';
import ListOfTasks from './listOfTasks/ListOfTasks.js';

export default function Section({ sectionId, name }) {
    const { tasks, setTasks } = useTasks();
    // const { addTask } = taskHelper(tasks, setTasks);
    //
    // const [showColorGap, setShowColorGap] = useState({ section: '', top: false, bottom: false, });
    //
    const [isOverContainer, setIsOverContainer] = useState({ yes: false, section: '', });
    let sortIdAbove = 0;

    const processDrop = (e, newStatus) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('text/plain');
        let sortIdBelow = 0;
        const tasksBelow = tasks.filter((task) => task.status === newStatus && task.sortId > sortIdAbove)
            .sort((a, b) => a.sortId - b.sortId);

        if (isOverContainer.yes && isOverContainer.section === newStatus && sortIdAbove === 0) {
            sortIdBelow = tasksBelow.length > 0 ? tasksBelow[tasksBelow.length - 1].sortId * 2 + 2000000 : 2000000;
        } else {
            sortIdBelow = tasksBelow.length > 0 ? tasksBelow.at(0).sortId : sortIdAbove + 2000000;
        }
        const updatedTasks = tasks.map((task) => {
            if (task.id === +taskId) {
                if (sortIdAbove === task.sortId && task.status === newStatus) {
                    return task;
                } else {
                    return { ...task, sortId: (sortIdAbove + sortIdBelow) / 2, status: newStatus, done: newStatus === 'done' };
                }
            }
            return task;
        });
        setTasks(updatedTasks);
        updateLocalstorage('storedTasks', updatedTasks);
    };

    return (
        <Container sectionId={sectionId} setIsOverContainer={setIsOverContainer} processDrop={processDrop}>
            <HeaderOfSection sectionId={sectionId} name={name} />
            <ListOfTasks sectionId={sectionId} sortIdAbove={sortIdAbove} />
        </Container>
    );
};