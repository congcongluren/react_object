import React, { useEffect } from 'react';
import * as THREE from 'three';


export default function index() {

    useEffect(() => {
    }, []);
    const scene = new THREE.Scene();
    /**
     * 花瓣分组
     */
    const petal = new THREE.Group();

    const width = window.innerWidth;
    const height = window.innerHeight;
    //窗口宽高比
    const k = width / height;
    //三维场景的显示的上下范围
    const s = 200;
    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);

    const renderer = new THREE.WebGLRenderer();

    create()
    render()
    function create() {
        //设置相机位置
        camera.position.set(0, 200, 500)
        camera.lookAt(scene.position)

        //设置渲染区域尺寸
        renderer.setSize(width, height)
        //设置背景颜色
        renderer.setClearColor(0xFFFFFF, 1)
        //body元素中插入canvas对象
        document.body.appendChild(renderer.domElement)

        // const axisHelper = new THREE.AxisHelper(1000);
        // scene.add(axisHelper)

        var textureTree1 = new THREE.TextureLoader().load("img/star.svg");
        var textureTree2 = new THREE.TextureLoader().load("img/star.svg");
        var textureTree3 = new THREE.TextureLoader().load("img/star.svg");
        var textureTree4 = new THREE.TextureLoader().load("img/star.svg");
        var textureTree5 = new THREE.TextureLoader().load("img/star.svg");
        var imageList = [textureTree1, textureTree2, textureTree3, textureTree4, textureTree5];

        for (let i = 0; i < 400; i++) {
            var spriteMaterial = new THREE.SpriteMaterial({
                map: imageList[Math.floor(Math.random() * imageList.length)],//设置精灵纹理贴图
            });
            var sprite = new THREE.Sprite(spriteMaterial);
            petal.add(sprite);

            sprite.scale.set(40, 50, 1);
            sprite.position.set(2000 * (Math.random() - 0.5), 2000 * Math.random(), 0)
        }
        scene.add(petal)
    }
    function render() {
        petal.children.forEach(sprite => {
            sprite.position.y -= 1;
            sprite.position.x += 0.5;
            if (sprite.position.y < -400) {
                sprite.position.y = 800;
            }
            if (sprite.position.x > 1000) {
                sprite.position.x = -1000
            }
        });

        document.getElementById('app').appendChild(renderer.domElement)
        renderer.render(scene, camera)

        // requestAnimationFrame(render)
    }
    return (
        <div>

        </div>
    )
}
