import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { CanvasHelp, Color, Vector, GObject, Vertex, Mesh } from './canvasHelp';

export default function DemoA() {
    const canvasRef = useRef(null);
    useLayoutEffect(() => {
        let canvas = document.getElementById("canvas_a");
        const canvasHA =  new CanvasHelp(canvas);
        canvasRef.current = { canvasHA };
    }, []);

    useEffect(() => {
        const { canvasHA } = canvasRef.current;
        // canvasHA.drawline(Vector.new(50, 50), Vector.new(100, 100), Color.green())
        // // console.log(Mesh.new(), 777);
        // let meshC = Mesh.new();
        // console.log(meshC, 777);
        // canvasHA.drawMesh(meshC.cube());

      
        // setInterval(() => {
        //   canvas.clear()
        //   mesh.rotate(new Vector(0.005, 0.008, 0))
        //   console.log('r', mesh.rotation)
        //   canvas.drawMesh(mesh, 3)
        // }, 20)
    }, []);
    
    return (
        <div className="canvas-wrap">
            <canvas id="canvas_a" width="600" height="600">
                你的浏览器不支持canvas!
            </canvas>
        </div>
    )
}
