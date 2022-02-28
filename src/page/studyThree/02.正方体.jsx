import React, { useCallback, useEffect, useRef } from 'react';
import './index.scss';
import * as THREE from 'three';


export default function index() {
  const threeRef = useRef(null);

  useEffect(() => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    let cube = getCube();

    // 保存数据
    threeRef.current = {
      renderer,
      scene,
      camera,
      cube
    }

    // 场景添加形状
    scene.add(cube);
    camera.position.z = 5;


    renderer.setSize(500, 500);
    document.getElementById('canvas').appendChild(renderer.domElement);

    animate();
  }, []);

  // 生成正方体
  const getCube = useCallback(() => {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var cube = new THREE.Mesh(geometry, material);
    return cube;
  }, []);


  const animate = useCallback(() => {
    const { renderer, scene, camera, cube } = threeRef.current;
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }, []);

  return (
    <div>
    <div id="canvas"></div>
    </div>
  )
}
