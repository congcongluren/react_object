import React, { useEffect, useRef, useState } from 'react';

let isAltDown = false;
let isMouseDown = false;
let self = {};
export default function Fabric01() {
  const ref = useRef({});
  const [undolist, setUndolist] = useState([]);
  const [redolist, setRedolist] = useState([]);

  useEffect(() => {
    const myCanvas = document.getElementById('c');
    const ctx = myCanvas.getContext('2d');

    //画笔笔触颜色
    ctx.strokeStyle = "red";

    ref.current.ctx = ctx;
    ref.current.myCanvas = myCanvas;


    const img = new Image();
    img.src = "/img/avatar.png";



    const img2 = new Image();
    img2.src = "/img/grey-bg.jpg";

    img2.onload = (e) => {
      ctx.drawImage(img2, 0, 0, 300, 300);

    };


    //判断是否键盘alt键被按下
    document.onkeydown = function (event) {
      if (event.key == "Alt") {
        isAltDown = true;
      }
    }
    //判断是否键盘alt键被放开
    document.onkeyup = function (event) {
      if (event.key == "Alt") {
        isAltDown = false;
      }
    }


    function eventDown(event) {
      console.log(event, 777);
      //判断鼠标左键
      if (event.button == 0) {
        //获取鼠标光标当前所在点
        var mouseX = event.pageX - this.offsetLeft;
        var mouseY = event.pageY - this.offsetTop;

        //alt键按下

        //记录鼠标左键按下
        isMouseDown = true;
        //判断是否存在可以绘制图像

      }
    }


    function eventMove(event) {

      //获取鼠标光标当前所在点
      // var mouseX = event.pageX - this.offsetLeft;
      // var mouseY = event.pageY - this.offsetTop;
      var mouseX = event.offsetX;
      var mouseY = event.offsetY;
      //判断鼠标是否按下
      if (isMouseDown) {
        //more point
        if (event.changedTouches) {
          event = event.changedTouches[0];
        }

        // ctx.arc(100, 100, 75, 0, Math.PI * 2, false);
        // let ship = ctx.clip();
        // console.log(ship);
        let ship = ctx.getImageData(mouseX - 10, mouseY - 10, 20, 20);
        //绘制图像
        ctx.arc(100, 100, 75, 0, Math.PI * 2, false);
        ctx.putImageData(ship, mouseX + 300, mouseY + 300);
      }
    }


    function eventUp(event) {
      event.preventDefault();
      if (isAltDown) {
        return;
      }
      isMouseDown = false;
      ctx.save();
    }

    //鼠标移动
    myCanvas.addEventListener("mousemove", eventMove, false);
    //鼠标按下
    myCanvas.addEventListener("mousedown", eventDown, false);
    //鼠标松开
    myCanvas.addEventListener("mouseup", eventUp, false);
    // //鼠标进入canvas区域
    // myCanvas.addEventListener("mouseenter", eventEnter, false);
    // //鼠标离开canvas区域
    // myCanvas.addEventListener("mouseleave", eventLeave, false);
  }, []);

  return (
    <div>
      <canvas id="c" width="601" height="601"

      />
    </div>
  )
}
