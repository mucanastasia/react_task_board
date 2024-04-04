import React from 'react';
import './dropPointer.css';

export default function DropPointer({ show }) {
    return (
        <>
            {show && <div className='gap colorGap' />}
        </>
    );
}