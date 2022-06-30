export default {
    load(callback) {
        if (window.AMap) {
            callback()
        } else {
            // 载入高德地图和UI组件      
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = 'https://webapi.amap.com/maps?v=1.4.4&key=****************&callback=initAmap'
            document.body.appendChild(script)
            window.initAmap = () => {
                callback()
            }
        }
    }, 
    defaultOption: { panel: 'panel' }
}