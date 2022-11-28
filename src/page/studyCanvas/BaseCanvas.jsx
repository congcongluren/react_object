import React, { useEffect, useRef } from 'react';

export default function BaseCanvas() {
    const canvas = useRef(null);
    const ctx = useRef(null);
    useEffect(() => {
        const context = ctx.current = canvas.current.getContext('2d');
        const canvasDom = context.canvas;
        // 渐变
        // const gradient = context.createLinearGradient(0, 0, 300, 0);
        // gradient.addColorStop(0, 'red');
        // gradient.addColorStop(1, 'green');
        // context.fillStyle = gradient;

        // context.fillRect(10, 10, 160, 60)

        // 原型链
        // CanvasRenderingContext2D.prototype.fullCircle = function (style) {
        //     // 反向获取当前上下文源Canavs元素
        //     var canvas = this.canvas;
        //     // 获取最短边半径
        //     var minRadius = Math.min(canvas.width, canvas.height) / 2;
        //     // 使用arc() API绘制圆
        //     this.fillStyle = style || '#000';
        //     // 绘制
        //     this.beginPath();
        //     this.arc(canvas.width / 2, canvas.height / 2, minRadius, 0, 2 * Math.PI);
        //     this.fill();
        // };
        // context.fullCircle('#9f9')


        // 填充
        // context.fillStyle = '#020';
        // context.beginPath();
        // context.fillRect(10, 10, 20, 20);

        // context.fillStyle = '#9f9';
        // context.beginPath();
        // context.fillRect(100, 100, 20, 20);


        // 字体
        // context.font = '24px sans-serif SimSun, Songti SC';
        // context.fillText('24px的宋体呈现', 20, 50);

        // 透明度
        // context.globalAlpha = 0.5;
        // // 绘制一个方块
        // context.fillStyle = 'blue';
        // context.fillRect(10, 10, 100, 100);
        // // 设置一个范围外的透明度
        // context.globalAlpha = 1.5;
        // context.fillStyle = 'red';
        // context.fillRect(80, 40, 100, 100);


        // 混合模式
        // context.globalCompositeOperation = "copy";

        // context.beginPath();
        // context.fillStyle="rgb(255, 0, 255)"
        // context.arc(0, 0, 50, 0, 2 * Math.PI);
        // context.fill();

        // context.beginPath();
        // context.fillStyle="rgb(0, 255, 255)"
        // context.arc(125, 200, 50, 0, 2 * Math.PI);
        // context.fill();

        // context.beginPath();
        // context.fillStyle="rgb(255, 255, 0)"
        // context.arc(175, 200, 50, 0, 2 * Math.PI);
        // context.fill();

        // let imagePattern  = document.createElement('img');
        // imagePattern.onload = (e) => {
        //     console.log(e);
        //     context.drawImage(imagePattern, 0, 0, 300, 200);
        //     // 改变混合方式
        //     context.globalCompositeOperation = 'destination-out';
        //     // 绘制文本
        //     context.font = 'bold 120px SimHei, STHeiti';
        //     context.fillText('镂空', 25, 140);
        //     // 登录状态下不会出现这行文字，点击页面右上角一键登录
        // }
        // imagePattern.src = "img/1.jpg"


        // 虚线偏移大小
        // var offset = 0;
        // // 绘制
        // var draw = function () {
        //     context.clearRect(0, 0, canvasDom.width, canvasDom.height);
        //     context.setLineDash([8, 4]);
        //     context.lineDashOffset = offset;
        //     context.strokeRect(2, 2, 236, 116);
        // }

        // var run = function () {
        //     offset += 0.5;
        //     if (offset > 24) {
        //         offset = 0;
        //     }
        //     draw();
        //     // 继续绘制
        //     requestAnimationFrame(run);
        // }

        // run();


    }, []);

    return (
        <div>
            <canvas width={601} height={601} ref={canvas}></canvas>
        </div>
    )
}
