import React from 'react';

export default function DeveloperToolsTaskBoard({ tasks, setTasks }) {
    const handleAutoFillTasks = () => {
        const autoFillTasks = [
            {
                id: 1,
                sortId: 1000000,
                name: 'Define Objectives',
                description: 'Identify specific objectives to guide the research process.',
                status: 'done',
                isEditingName: false,
                isEditingDescription: false,
                done: true,
            },
            {
                id: 2,
                sortId: 2000000,
                name: 'Gather Data',
                description: 'Collect existing data and information related to the project.',
                status: 'done',
                isEditingName: false,
                isEditingDescription: false,
                done: true,
            },
            {
                id: 3,
                sortId: 3000000,
                name: 'Market Analysis',
                description: 'Analyze market trends, competitors, and opportunities.',
                status: 'inProgress',
                isEditingName: false,
                isEditingDescription: false,
                done: false,
            },
            {
                id: 4,
                sortId: 4000000,
                name: 'Identify Audience',
                description: 'Define target audience characteristics and preferences.',
                status: 'inProgress',
                isEditingName: false,
                isEditingDescription: false,
                done: false,
            },
            {
                id: 5,
                sortId: 5000000,
                name: 'User Interviews',
                description: 'Engage with potential users to gather insights and needs.',
                status: 'inProgress',
                isEditingName: false,
                isEditingDescription: false,
                done: false,
            },
            {
                id: 6,
                sortId: 6000000,
                name: 'Create Research Plan',
                description: 'Develop a plan outlining methodologies, timeline, and resources.',
                status: 'done',
                isEditingName: false,
                isEditingDescription: false,
                done: true,
            },
            {
                id: 7,
                sortId: 7000000,
                name: 'Literature Review',
                description: 'Examine relevant literature and studies.',
                status: 'toDo',
                isEditingName: false,
                isEditingDescription: false,
                done: false,
            },
            {
                id: 8,
                sortId: 8000000,
                name: 'Analyze Findings',
                description: 'Synthesize data and extract insights.',
                status: 'toDo',
                isEditingName: false,
                isEditingDescription: false,
                done: false,
            },
            {
                id: 9,
                sortId: 9000000,
                name: 'Validate Results',
                description: 'Verify the accuracy and reliability of findings.',
                status: 'toDo',
                isEditingName: false,
                isEditingDescription: false,
                done: false,
            },
            {
                id: 10,
                sortId: 10000000,
                name: 'Finalize Report',
                description: 'Compile findings and recommendations into a report.',
                status: 'toDo',
                isEditingName: false,
                isEditingDescription: false,
                done: false,
            },
        ];

        setTasks(autoFillTasks);
        localStorage.setItem('storedTasks', JSON.stringify(autoFillTasks));
    };

    const handleDeleteAll = () => {
        setTasks([]);
        localStorage.setItem('storedTasks', JSON.stringify([]));
    };

    return (
        <div className='containerButtons'>
            {tasks.length === 0 ? <button className='btnScnd autoFill' onClick={handleAutoFillTasks}>Auto fill task board</button> : <button className='btnScnd deleteAll' onClick={handleDeleteAll}>Delete all tasks</button>}
        </div>
    );
};