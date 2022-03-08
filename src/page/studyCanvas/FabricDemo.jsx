import React, { useEffect } from 'react';
import drawing from './drawing';

export default function FabricDemo() {
    useEffect(() => {
        let canvas = new drawing("c", {
            showCursorPoint: true,
            showCursor: false,
        });
    }, []);

    return (
        <div className='grid-img'>
            <canvas id="c" width='601' height='601' />
        </div>
    )
}
