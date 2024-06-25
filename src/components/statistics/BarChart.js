import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart({ dataStats }) {
    const labels = ['Total', 'To do', 'In progress', 'Done'];
    const data = {
        labels: labels,
        datasets: [{
            data: dataStats,
            label: 'Tasks',
            backgroundColor: [
                '#EBE9FE',
                '#ECEDF0',
                '#DFF2FF',
                '#DDF5EB'
            ],
            hoverBackgroundColor: [
                '#EBE9FE',
                '#ECEDF0',
                '#DFF2FF',
                '#DDF5EB'
            ],
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
            },
            y: {
                beginAtZero: true,
            }
        }
    };

    return (
        <div className='chart-container'>
            <Bar data={data} options={options} />
        </div>
    );
};