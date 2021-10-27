import React from 'react';
import './index.scss';
export default function StudySvg() {
    return (
        <div className="grid">
            <svg width="750" height="500">
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
                </defs>
                <use href="#leftalign" x="100" y="100"></use>
                <use href="#rightcaret" x="300" y="100"></use>
                <use href="#browser" x="500" y="100"></use>
                <use href="#alert" x="100" y="200" width="100" height="100"></use>
                <use href="#play" x="300" y="200" width="100" height="100"></use>
                <use href="#download" x="500" y="200" width="100" height="100"></use>

            </svg>
        </div>
    )
}
