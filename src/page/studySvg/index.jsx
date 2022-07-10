import React from 'react';
import './index.scss';
export default function StudySvg() {
    // new RegExp()
    return (
        <div className="grid">
            <svg width="0" height="0">
                <defs>
                    <g id="leftalign">
                        <line x1="3" y1="3" x2="48" y2="3"></line>
                        <line x1="3" y1="19" x2="65" y2="19"></line>
                        <line x1="3" y1="35" x2="48" y2="35"></line>
                        <line x1="3" y1="51" x2="65" y2="51"></line>
                    </g>


                    <g id="rightcaret">
                        <polyline points=" 3 3, 30 28, 3 53"></polyline>
                    </g>

                    <g id="browser">
                        <rect x="3" y="3" width="80" height="60"></rect>
                        <line x1="3" y1="19" x2="83" y2="19"></line>
                        <line x1="20" y1="3" x2="20" y2="17"></line>
                    </g>



                    <symbol id="alert" viewBox="0 0 86 86">
                        <ellipse cx="43" cy="43" rx="40" ry="40"></ellipse>
                        <ellipse style={{ fill: "black" }} cx="43" cy="65" rx="5" ry="5"></ellipse>
                        <line style={{ strokeWidth: 8 }} x1="43" y1="19" x2="43" y2="48"></line>
                    </symbol>


                    <symbol id="play" viewBox="0 0 86 86">
                        <ellipse cx="43" cy="43" rx="40" ry="40"></ellipse>
                        <polygon points="35 23, 60 43, 35 63" />
                    </symbol>


                    <symbol id="download" viewBox="0 0 64 71">
                        <path d=" M 18 3,L 46 3, L 46 40, L 61 40, L 32 68, L 3 40, L 18 40, Z "></path>
                    </symbol>

                    <symbol id="rect2" viewBox="0 0 100 100">
                        <rect x="3" y="3" width="94" height="94" rx="20" ry="20" fill="yellow" style={{ filter: "url(#Gaussian_Blur)" }} ></rect>
                    </symbol>

                    <symbol id="test" viewBox="0 0 400 400">
                    </symbol>
                    <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="100%">
                        <stop offset="0%" style={{ stopColor: "rgb(255,255,0)" }} />
                        <stop offset="100%" style={{ stopColor: "rgb(255,0,0)" }} />
                    </linearGradient>
                    <radialGradient id="bg2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" style={{ stopColor: "green" }} />
                        <stop offset="50%" style={{ stopColor: "red" }} />
                        <stop offset="100%" style={{ stopColor: "blue" }} />
                    </radialGradient>
                    <filter id="Gaussian_Blur">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
                    </filter>
                </defs>
                {/* <use href="#leftalign" x="100" y="100"></use>
                <use href="#rightcaret" x="300" y="100"></use>
                <use href="#browser" x="500" y="100"></use>
                <use href="#alert" x="100" y="200" width="100" height="100"></use>
                <use href="#play" x="300" y="200" width="100" height="100"></use>
                <use href="#download" x="500" y="200" width="100" height="100"></use>
                <use href="#rect2" x="100" y="300" width="100" height="100"></use> */}
                {/* <use href="#rect2" x="000" y="000" width="400" height="400"></use> */}
            </svg>
        </div>
    )
}
