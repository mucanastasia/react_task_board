import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart({ dataStats, theme }) {
    const lightBackgroundColor = [
        '#C9C4FF',
        '#D7DAE2',
        '#A9DCFF',
        '#9AF1CD'
    ];

    const darkBackgroundColor = [
        '#8B61FF',
        '#595E61',
        '#0097FF',
        '#22A06B'
    ];

    const labels = ['Total', 'To do', 'In progress', 'Done'];
    const data = {
        labels: labels,
        datasets: [{
            data: dataStats,
            label: 'Tasks',
            backgroundColor: theme === 'light' ? lightBackgroundColor : darkBackgroundColor,
            hoverBackgroundColor: theme === 'light' ? lightBackgroundColor : darkBackgroundColor,
            maxBarThickness: 100,
            skipNull: true,
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: theme === 'light' ? '#666666' : '#EDEDED'
                },
                grid: {
                    color: theme === 'light' ? '#DDDDDD' : '#444444'
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: theme === 'light' ? '#666666' : '#EDEDED'
                },
                grid: {
                    color: theme === 'light' ? '#DDDDDD' : '#444444'
                }
            }
        }
    };

    return (
        <div className='chart-container'>
            <Bar data={data} options={options} />
        </div>
    );
};