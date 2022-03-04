import React, { useEffect, useRef } from 'react';
import './imgToCanvas.scss';


let flag = false;
export default function imgToCanvas() {
    const ref = useRef({});
    const ref2 = useRef({});

    useEffect(() => {
        const myCanvas = document.getElementById('canvas');
        const cxt = myCanvas.getContext('2d');

        ref.current.cxt = cxt;
        ref.current.myCanvas = myCanvas;


        const myCanvas2 = document.getElementById('canvas2');
        const cxt2 = myCanvas2.getContext('2d');

        ref.current.cxt2 = cxt2;
        ref.current.myCanvas2 = myCanvas2;

        canvasResize();

        init();

        myCanvas.addEventListener('mousedown', function (e) {
            flag = true;
            drawArc(e) // 绘制
        })
        myCanvas.addEventListener('mousemove', function (e) {
            if (flag) {
                drawArc(e) // 绘制
            }
        })
        myCanvas.addEventListener('mouseup', function () {
            flag = false;
        })
    }, []);

    const canvasResize = () => {
        const { cxt, myCanvas, cxt2, myCanvas2 } = ref.current;
        let tSize = myCanvas.getBoundingClientRect();
        myCanvas.width = tSize.width;
        myCanvas.height = tSize.height;


        let tSize2 = myCanvas2.getBoundingClientRect();
        myCanvas2.width = tSize.width;
        myCanvas2.height = tSize.height;

    }

    const init = () => {
        const { cxt, myCanvas, cxt2, myCanvas2 } = ref.current;

        const img = new Image();
        img.src = "/img/avatar.png";

        img.onload = (e) => {
            cxt.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);
        };


        const img2 = new Image();
        img2.src = "/img/grey-bg.jpg";

        img2.onload = (e) => {
            cxt2.drawImage(img2, 0, 0, myCanvas2.width, myCanvas2.height);
        };


    }


    // 绘画区域
    const drawArc = (e) => {
        const { cxt, myCanvas, cxt2, myCanvas2 } = ref.current;

        var canvasPos = myCanvas2.getBoundingClientRect(); // 获取矩形canvas在页面中的绝对位置
        var pageScrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 获取页面滚动的高度(处理页面下滑后才出现刮奖，计算坐标点)
        var pageScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft; // 同理
        var mouseX = (e.pageX || e.targetTouches[0].pageX) - canvasPos.left - pageScrollLeft; // 点击点坐标的X轴距离 - 矩形左上角X轴距离 - 页面卷出去的X距离
        var mouseY = (e.pageY || e.targetTouches[0].pageY) - canvasPos.top - pageScrollTop; // 同理
        cxt2.globalCompositeOperation = "destination-out"; // 相交部分不显示
        cxt2.beginPath(); // 开始一条路径
        cxt2.fillStyle = "white"; // 白色
        cxt2.moveTo(mouseX, mouseY); // 移动到位置 mouseX,mouseY
        cxt2.arc(mouseX, mouseY, 20, 0, 2 * Math.PI); // 画一个圆 半径为6
        cxt2.fill(); // 填充
    }




    return (
        <div>
            <canvas id="canvas" style={{ width: "100%", height: "100%" }} />
            <canvas id="canvas2" style={{ width: "100%", height: "100%" }} />
            <button onClick={init}>+</button>
        </div>
    )
}


function calcImgSize(imgSize, boxSize) {
    if (!imgSize || !boxSize) return false;
    const { width: mWidth, height: mHeight } = imgSize;
    const { width: tWidth, height: tHeight } = boxSize;

    let scale = tHeight / mHeight;
    if (mWidth / mHeight > tWidth / tHeight) {
        scale = tWidth / mWidth;
    }

    console.log(imgSize, boxSize, scale);

    return {
        width: mHeight * scale,
        height: mWidth * scale,
    }
}