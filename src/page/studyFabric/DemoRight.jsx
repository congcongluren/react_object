import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { fabric } from 'fabric';

let canvas = null
function DemoRight(props, ref) {
    const _ref = useRef({});

    useImperativeHandle(ref, () => ({
        getResultCanvas:  () => _ref.current.resultCanvas,
    }));

    useEffect(() => {
        const resultCanvas = new fabric.StaticCanvas("resultC", {
            imageSmoothingEnabled: false
        });

        const imgElement = document.createElement('img');
        imgElement.src = "img/cut-over.png";

        let scale = 601 / 1000;
        imgElement.onload = (e) => {
            var imgInstance = new fabric.Image(imgElement, {
                left: 0,
                top: 0,
                scaleX: scale,

                scaleY: scale
            });
            resultCanvas.add(imgInstance);
        }

        _ref.current.resultCanvas = resultCanvas;

    }, []);



    return (
        <div className="right">
            <canvas id="resultC" width="601" height="601" />
        </div>
    )
}

export default forwardRef(DemoRight);