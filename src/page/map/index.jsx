import React, { useEffect, useState } from 'react';
import "./index.scss";

export default function Map() {
    const [map, setMap] = useState(null);
    const [aMap, setAMap] = useState(null);
    const [curPoint, setCurPoint] = useState(null);

    useEffect(() => {
        var n = navigator.geolocation.getCurrentPosition(
            function (res) {
                console.log(res); // 需要的坐标地址就在res中
                console.log(res.coords.latitude, res.coords.longitude);
                setCurPoint([res.coords.longitude, res.coords.latitude] )
            },
            function (err) {
                console.log(err)
            }
        );


        AMapLoader.load({
            "key": "32cb5c48af6b98fb8a9a7ce92391040b",              // 申请好的Web端开发者Key，首次调用 load 时必填
            "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            "AMapUI": {             // 是否加载 AMapUI，缺省不加载
                "version": '1.1',   // AMapUI 版本
                "plugins": ['overlay/SimpleMarker'],       // 需要加载的 AMapUI ui插件
            },
            "Loca": {                // 是否加载 Loca， 缺省不加载
                "version": '2.0'  // Loca 版本
            },
        }).then((AMap) => {
            var map = new AMap.Map('container', {
                zoom: 6,//级别
                center: [116.397428, 39.90923],//中心点坐标
            });
            setMap(map);
        }).catch((e) => {
            console.error(e);  //加载错误提示
        });


    }, []);

    useEffect(() => {
        if (!map) return;
        AMap.plugin('AMap.ToolBar', function () {//异步加载插件
            var toolbar = new AMap.ToolBar();
            map.addControl(toolbar);
        });
        AMap.plugin('AMap.Geolocation', function () {//异步加载插件
            var Geolocation = new AMap.Geolocation();
            map.addControl(Geolocation);
        });

        map.setCenter(curPoint);

    }, [map]);
    return (
        <div id="container"></div>
    )
}
