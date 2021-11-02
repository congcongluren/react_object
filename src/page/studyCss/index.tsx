import React from 'react';
import './index.scss';

export default function index() {
    return (
        <div>
            <img src="img/ps1.jpg" className="mask-image"></img>

            <svg>
                <defs>
                    <mask id="mask" maskContentUnits="objectBoundingBox">
                        <ellipse cx=".5" cy=".5" rx=".4" ry=".2" fill="white"></ellipse>
                        <rect x=".3" y=".1" width=".4" height=".8" rx=".1" ry=".1" fill="white"></rect>
                    </mask>
                </defs>
            </svg>
        </div>
    )
}
