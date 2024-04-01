import React from 'react';

export default function DropPointer({ show }) {
    return (
        <>
            {show && <div className='gap colorGap' />}
        </>
    );
}