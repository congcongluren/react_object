import React from 'react';
import './index.scss';

export default function index() {
    return (
        <div className="filter-wrap">
            <div className="content">
                <div className="bg"></div>
                <p>

            Unique Gradient Generator 是一个独特的渐变背景产生器，跟一般 CSS 渐层背景语法功能不同，透过这项服务可以从网站提供的免费图库来挑照片，或是自己上传，选择要模糊显示范围。因为是放大显示，仅会提取图片上非常小的区域，将它扩展到 100% 大小，利用浏览器图片平滑算法来产生最佳效果。
                </p>
            </div>
        </div>
        // <div>
        //     <img src="img/ps1.jpg" className="mask-image"></img>

        //     <svg>
        //         <defs>
        //             <mask id="mask" maskContentUnits="objectBoundingBox">
        //                 <ellipse cx=".5" cy=".5" rx=".4" ry=".2" fill="white"></ellipse>
        //                 <rect x=".3" y=".1" width=".4" height=".8" rx=".1" ry=".1" fill="white"></rect>
        //             </mask>
        //         </defs>
        //     </svg>
        // </div>
    )
}
