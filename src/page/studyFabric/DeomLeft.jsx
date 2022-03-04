import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

import './DemoLeft.scss';

let base64 = ""
export default function DemoLift(props) {
    const { onDrew } = props;



    const ref = useRef({});
    const [undolist, setUndolist] = useState([]);
    const [redolist, setRedolist] = useState([]);

    useEffect(() => {
        toBase64(() => {
            drawBgcanvas();
            drawPathCanvas();
        })
    }, []);

    const toBase64 = (cb) => {
        const bgCanvas = new fabric.StaticCanvas("bg");
        const imgElement = document.createElement('img');
        imgElement.src = "img/cut-pre.jpg";
        let scale = 601 / 2000;
        imgElement.onload = (e) => {
            var imgInstance = new fabric.Image(imgElement, {
                left: 0,
                top: 0,
                scaleX: scale,
                scaleY: scale
            });

            ref.current.imgBg = imgInstance;
            bgCanvas.add(imgInstance);

            base64 = bgCanvas.toDataURL('image/jpg');
            // console.log(base64);
            cb();
        }
    }
    const drawBgcanvas = () => {
        const bgCanvas = new fabric.StaticCanvas("bgC");
        const imgElement = document.createElement('img');
        imgElement.src = "img/cut-pre.jpg";
        let scale = 601 / 2000;
        imgElement.onload = (e) => {
            var imgInstance = new fabric.Image(imgElement, {
                left: 0,
                top: 0,
                scaleX: scale,
                scaleY: scale
            });

            ref.current.imgBg = imgInstance;
            bgCanvas.add(imgInstance);

            // base64 = bgCanvas.toDataURL('image/jpg');
            // console.log(base64);
        }
        ref.current.imgElement = imgElement;
        ref.current.bgCanvas = bgCanvas;
    }
    const drawPathCanvas = () => {
        const pathCanvas = new fabric.Canvas("pathC", {
            isDrawingMode: true, // 开启绘图模式
            imageSmoothingEnabled: false
        });
        // pathCanvas.imageSmoothingEnabled = false;

        var img = document.createElement('img');
        img.src = base64;
        base64 = "";
        // let scale = 601 / 2000;
        // img.width = 1125 * scale;
        // img.height = 2000 * scale;
        // img.scale = scale;
        // img.onload = e => {
        //     // console.log(img.width, img.height);
            var texturePatternBrush = new fabric.PatternBrush(pathCanvas);
            texturePatternBrush.source = ref.current.imgElement;
        //     texturePatternBrush.limitedToCanvasSize= true;
            pathCanvas.freeDrawingBrush = texturePatternBrush;
            
        // }

        pathCanvas.on("before:path:created", function (obj) {
            onDrew(ref.current.imgElement, obj.path)
        })
    }

    const onMouseMove = (e) => {
        console.log(e.absolutePointer.x, e.absolutePointer.y);
        const clipPath = new fabric.Circle({
            radius: 1000,
            left: -1000,
            top: -1000
        })

        let scale = 601 / 2000;

        const imgInstance = new fabric.Image(ref.current.imgElement, {
            left: 0,
            top: 0,
            scaleX: scale,
            scaleY: scale
        });

        imgInstance.clipPath = clipPath;

        onDrew(imgInstance, () => {
            // ref.current.imgBg.clipPath = null;
        });
        // ref.current.bgCanvas.add(ref.current.imgBg);
    }


    return (
        <div className="left">
            <canvas id="bgC" className='bgC' width="601" height="601" />
            <canvas id="pathC" className='pathC' width="601" height="601" />
            <canvas id="bg" className='pathC' width="601" height="601" />
        </div>
    )
}
