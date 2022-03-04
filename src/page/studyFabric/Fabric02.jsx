import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

let draw = false;

export default function Fabric01() {
  const ref = useRef({});
  const [undolist, setUndolist] = useState([]);
  const [redolist, setRedolist] = useState([]);

  useEffect(() => {
    const canvas = new fabric.Canvas('c', {
      isDrawingMode: true, // 开启绘图模式
    });
    // 创建一个长方形
    const rect = new fabric.Rect({
      top: 30, // 距离容器顶部 30px
      left: 30, // 距离容器左侧 30px
      width: 100, // 宽 100px
      height: 60, // 高 60px
      fill: 'red' // 填充 红色
    });

    // 设置画笔颜色
    canvas.freeDrawingBrush.color = 'rgba(0,0,0,0)'

    // 设置画笔粗细
    canvas.freeDrawingBrush.width = 10

    // 在canvas画布中加入矩形（rect）。add是“添加”的意思
    canvas.add(rect)
    setUndolist([...canvas._objects]);

    ref.current.canvas = canvas;


  }, []);

  const updateQueue = () => {
    const { canvas } = ref.current;
    setUndolist([...canvas._objects]);
  }

  const add = () => {
    const { canvas } = ref.current;

    // 创建一个长方形
    const rect = new fabric.Rect({
      top: 200, // 距离容器顶部 30px
      left: 200, // 距离容器左侧 30px
      width: 100, // 宽 100px
      height: 60, // 高 60px
      fill: 'red' // 填充 红色
    })

    // 在canvas画布中加入矩形（rect）。add是“添加”的意思
    canvas.add(rect)
    updateQueue();
  }

  const undo = () => {
    const { canvas } = ref.current;

    setRedolist([...redolist, canvas._objects.pop()]);
    updateQueue();
    canvas.renderAll();
  }
  const redo = () => {
    const { canvas } = ref.current;
    canvas.add(redolist.pop());
    setRedolist([...redolist]);
    updateQueue();
    canvas.renderAll();
  }


  const onMove = (e) => {
    console.log(e);
  }

  return (
    <div
      onClick={() => {
        console.log(1);
      }}
      onMouseDown={() => {
        draw = true;
      }}
      onMouseMove={(e) => {
        if (!draw) return;
        onMove(e)
      }}
      onMouseUp={() => {
        draw = false
      }}

    >
      <canvas id="c" width="601" height="601"

      />

      <button onClick={add}>添加</button>
      <button onClick={() => {
        console.log(ref.current.canvas.getObjects());
      }}>查看</button>
      {
        undolist.length > 0 ?
          <button onClick={undo}>上一步</button>
          : ''
      }
      {
        redolist.length > 0 ?
          <button onClick={redo}>下一步</button>
          : ''
      }

    </div>
  )
}
