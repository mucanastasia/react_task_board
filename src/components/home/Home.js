import React from 'react';
import PageTransition from '../pageTransition/PageTransition';
import './home.css';

export default function Home() {

    return (
        <PageTransition className='wave-header' keyProp='home'>
            <div className='inner-header flex'>
                <h2 className='textContainer'>Welcome to the Task Board Application</h2>
                <h3 className='textCopyright'>© 2024 <a href='https://github.com/mucanastasia'>mucanastasia</a></h3>
            </div>

            <div>
                <svg
                    className='waves'
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    viewBox='0 24 150 28'
                    preserveAspectRatio='none'
                    shapeRendering='auto'
                >
                    <defs>
                        <path id='gentle-wave' d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z' />
                    </defs>
                    <g className='parallax'>
                        <use xlinkHref='#gentle-wave' x='48' y='0' fill='rgba(255,255,255,0.5)' />
                        <use xlinkHref='#gentle-wave' x='48' y='3' fill='rgba(255,255,255,0.3)' />
                        <use xlinkHref='#gentle-wave' x='48' y='5' fill='rgba(255,255,255,0.1)' />
                        <use xlinkHref='#gentle-wave' x='48' y='7' fill='rgba(255,255,255,0.7)' />
                    </g>
                </svg>
            </div>
        </PageTransition>
    );
};