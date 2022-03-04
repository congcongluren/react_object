import React, { useEffect, useRef, useState } from 'react';
import DemoRight from './DemoRight';
import DemoLift from './DeomLeft';

export default function Fabric01() {
  const ref = useRef({});

  const setRef = () => {
    if (!ref.current.resultCanvas) {
      ref.current.resultCanvas = ref.current.getResultCanvas();
    }
  }

  const onDrew = (source, imgShip, cb) => {
    setRef();
    ref.current.resultCanvas.source = source;
    setTimeout(() => {
      
      ref.current.resultCanvas.add(imgShip);
    }, 0);
    cb && cb();
  }

  return (
    <>
      <DemoLift
        onDrew={onDrew}
      
      />
      <DemoRight
        ref = {ref}
      />
    </>
  )
}
