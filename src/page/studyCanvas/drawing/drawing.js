import {
    getDomById, addListener, removeListener,
    createElementByName, appendChild,
    addClass, copyCanvasStyle, setStyle,
} from '~';
import Point from './point';

class Drawing {
    constructor(id, option = {}) {
        this.id = id;
        this._initParam(option);
        this._initCanvas();
        this._createUpperCanvas();
        this._eventListenerForDom();
    }


    // 初始化默认参数
    _initParam(option) {

        // canvas 对象
        this.lowerCtx = this.lowerCtx || null;
        this.lowerCanvasEl = this.lowerCanvasEl || null;
        this.upperCtx = this.upperCtx || null;
        this.upperCanvasEl = this.upperCanvasEl || null;


        // 是否可已绘制
        this.drawing = true;
        // 元素的定位
        this.offect = {
            left: 0,
            top: 0
        };
        // 是否展示光标
        this.showCursorPoint = false;
        // 正在渲染
        this.isRendering = false;
        // 展示鼠标
        this.showCursor = true;
        // 鼠标在我上面
        this.mouseOver = true;

        // 外层dom样式
        this.wrapClass = 'canvas-container';

        // 外放参数
        for (let key in option) {
            this[key] = option[key];
        }


        // 初始化辅助光标对象
        if (this.showCursorPoint) {
            this.cursorPoint = new Point(-10, -10, 10);
        }
    }

    // 初始化canvas
    _initCanvas() {
        const lowerCanvasEl = getDomById(this.id);

        // 下层canvas赋值
        this.lowerCtx = lowerCanvasEl.getContext('2d');
        this.lowerCanvasEl = lowerCanvasEl;

        // 定位参数
        this.offect.left = lowerCanvasEl.offsetLeft;
        this.offect.top = lowerCanvasEl.offsetTop;
        this.width = lowerCanvasEl.clientWidth;
        this.height = lowerCanvasEl.clientHeight;

        // 光标样式
        if (!this.showCursor) {
            lowerCanvasEl.style.cursor = 'none';
        }
    }

    // 整理canvas dom
    _createUpperCanvas() {
        const upperCanvasEl = createElementByName('canvas');
        const wrapEl = createElementByName('div');
        const lowerCanvasEl = this.lowerCanvasEl;

        addClass(upperCanvasEl, this.wrapClass);
        appendChild(wrapEl, upperCanvasEl);

        this.contextTop = upperCanvasEl.getContext('2d');

        copyCanvasStyle(upperCanvasEl, lowerCanvasEl);
        this._applyCanvasStyle(upperCanvasEl);

        this.upperCanvasEl = upperCanvasEl;
        this.wrapEl = wrapEl;
    }

    // 添加canvas样式
    _applyCanvasStyle(element) {
        var width = this.width || element.width,
            height = this.height || element.height;

        setStyle(element, {
            position: 'absolute',
            width: width + 'px',
            height: height + 'px',
            left: 0,
            top: 0,
            'touch-action': 'none',
            '-ms-touch-action': 'none'
        });
        element.width = width;
        element.height = height;
    }

    // 初始化外层dom
    _initWrapperElement() {
        const wrapEl = createElementByName('div');
        addClass(wrapEl, 'upper-canvas ');
        fabric.util.setStyle(this.wrapperEl, {
            width: this.width + 'px',
            height: this.height + 'px',
            position: 'relative'
        });
        fabric.util.makeElementUnselectable(this.wrapperEl);
    }

    // 初始化事件绑定
    _eventListenerForDom() {
        addListener(this.lowerCanvasEl, 'mousedown', this._onMouseDown.bind(this));
        addListener(this.lowerCanvasEl, 'mousemove', this._onMouseMove.bind(this));
        addListener(this.lowerCanvasEl, 'mouseup', this._onMouseUp.bind(this));
        addListener(this.lowerCanvasEl, 'mouseenter', this._onMouseEntry.bind(this));
        addListener(this.lowerCanvasEl, 'mouseleave', this._onMouseLeave.bind(this));
    }

    _onMouseEntry(e) {
        this.mouseOver = true;
    }

    _onMouseLeave(e) {
        this.mouseOver = false;
        cancelAnimationFrame(this.isRendering);
        this.isRendering = false;
        this.cursorPoint && this.cursorPoint._clear(this.lowerCtx);
    }

    _onMouseDown(e) {
        // const x = e.offsetX - this.offect.left;
        // const y = e.offsetY - this.offect.top;
    }

    _onMouseUp(e) {
        // const x = e.offsetX - this.offect.left;
        // const y = e.offsetY - this.offect.top;
    }

    _onMouseMove(e) {
        const x = e.offsetX - this.offect.left;
        const y = e.offsetY - this.offect.top;

        // 如果开启了辅助光标 && 没有在渲染 && 鼠标在画布上
        if (this.showCursorPoint && !this.isRendering && this.mouseOver) {
            this.cursorPoint._clear(this.lowerCtx);
            this.cursorPoint._set({ x, y });
            this.isRendering = requestAnimFrame(() => {
                this.cursorPoint._renderArc(this.lowerCtx);
                cancelAnimationFrame(this.isRendering);
                this.isRendering = false;
            });
        }
    }

    // 渲染辅助光标
    _renderHelpCursor() {

    }

    // 清除整个画布
    _clearAll() {
        this.lowerCtx.clearRect(0, 0, this.width, this.height);
    }


}

export default Drawing