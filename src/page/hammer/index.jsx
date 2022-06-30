import React, { useEffect } from 'react';
import Hammer from '../../hammer/main';
import './index.scss';

export default function HummerTest() {

  useEffect(() => {

    const app = document.querySelector('#hammer-dom');
    const hammertime = new Hammer(app);
    hammertime.get('tap').set({ enable: true });
    hammertime.get('press').set({ enable: false });
    hammertime.get('pan').set({ enable: false });
    hammertime.get('swipe').set({ enable: false });
    hammertime.get('pinch').set({ enable: true });
    hammertime.get('doubletap').set({ enable: false });
    hammertime.on('pinchstart', ev => {
      console.log(ev, 777);
      this.isPinch = !0;
    });
    hammertime.on('tap', ev => {
      console.log(ev, 777);
    })
  }, []);
  return (
    <div id="hammer-dom">

    </div>
  )
}
