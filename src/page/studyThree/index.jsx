import React, { useCallback, useEffect, useRef } from 'react';
import './index.scss';
import * as Three from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import bingdundunModel from './models/bingdundun.glb';


export default function index() {
  useEffect(() => {
    container = document.getElementById('container');
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    scene = new THREE.Scene();
    scene.background = new THREE.TextureLoader().load(skyTexture);
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 30, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }, []);

  return (
    <div>
      <div id="container"></div>
      {/* {this.state.loadingProcess === 100 ? '' : (
        <div className="olympic_loading">
          <div className="box">{this.state.loadingProcess} %</div>
        </div>
      )} */}
    </div>
  )
}
