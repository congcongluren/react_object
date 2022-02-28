import React, { useCallback, useEffect, useRef } from 'react';
import './index.scss';
import * as THREE from 'three';


export default function index() {
  const threeRef = useRef(null);

  useEffect(() => {
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, 1, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    var renderer = new THREE.WebGLRenderer();
    let line = getLine();

    // 保存数据
    threeRef.current = {
      renderer,
      scene,
      camera,
      line
    }

    // 场景添加形状
    scene.add(line);
    // camera.position.z = 5;
    
    renderer.setSize(500, 500);
    document.getElementById('canvas').appendChild(renderer.domElement);
    
    renderer.render( scene, camera );
    // animate();
  }, []);

  // 生成正方体
  const getLine = useCallback(() => {
    var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    var geometry = new THREE.BufferGeometry();

    let arr = [];
    arr.push(0, 0, 0);
    arr.push(-10, 0, 0);
    arr.push(0, 10, 0);
    arr.push(10, 0, 0);
    arr.push(0, -10, 0);

    console.log(arr);
    const vertices = new Float32Array(arr);//得写arr赋值后面？之前写前面咋没事！
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    var line = new THREE.Line(geometry, material);
    return line;
  }, []);


  const animate = useCallback(() => {
    // const { renderer, scene, camera, line } = threeRef.current;
    // requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // renderer.render(scene, camera);
  }, []);

  return (
    <div>
      <div id="canvas"></div>
    </div>
  )
}
