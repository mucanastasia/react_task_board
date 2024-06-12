import React from 'react';
import Header from '../header/Header';
import PageTransition from '../pageTransition/PageTransition';
import './statistics.css';

export default function Statistics() {

    return (
        <PageTransition keyProp='stats'>
            <Header name='Statistics' />
            <div className='container'>
                <div>
                    <h5>You have so many tasks and some of them are completed!</h5>
                    <p>Just keep going! You're doing great!</p>
                </div>
            </div>
        </PageTransition>
    );
};