
addMethods = function (klass, source, parent) {
    for (var property in source) {

        if (property in klass.prototype &&
            typeof klass.prototype[property] === 'function' &&
            (source[property] + '').indexOf('callSuper') > -1) {

            klass.prototype[property] = (function (property) {
                return function () {

                    var superclass = this.constructor.superclass;
                    this.constructor.superclass = parent;
                    var returnValue = source[property].apply(this, arguments);
                    this.constructor.superclass = superclass;

                    if (property !== 'initialize') {
                        return returnValue;
                    }
                };
            })(property);
        }
        else {
            klass.prototype[property] = source[property];
        }

        if (IS_DONTENUM_BUGGY) {
            if (source.toString !== Object.prototype.toString) {
                klass.prototype.toString = source.toString;
            }
            if (source.valueOf !== Object.prototype.valueOf) {
                klass.prototype.valueOf = source.valueOf;
            }
        }
    }
};

function Subclass() { }

function callSuper(methodName) {
    var parentMethod = null,
        _this = this;

    // climb prototype chain to find method not equal to callee's method
    while (_this.constructor.superclass) {
        var superClassMethod = _this.constructor.superclass.prototype[methodName];
        if (_this[methodName] !== superClassMethod) {
            parentMethod = superClassMethod;
            break;
        }
        // eslint-disable-next-line
        _this = _this.constructor.superclass.prototype;
    }

    if (!parentMethod) {
        return console.log('tried to callSuper ' + methodName + ', method not found in prototype chain', this);
    }

    return (arguments.length > 1)
        ? parentMethod.apply(this, slice.call(arguments, 1))
        : parentMethod.call(this);
}


function createClass() {



    var parent = null,
        properties = slice.call(arguments, 0);

    // 第一个是不是函数?
    if (typeof properties[0] === 'function') {
        parent = properties.shift();
    }
    function klass() {
        // 初始化类
        this.initialize.apply(this, arguments);
    }

    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
        Subclass.prototype = parent.prototype;
        klass.prototype = new Subclass();
        parent.subclasses.push(klass);
    }
    for (var i = 0, length = properties.length; i < length; i++) {
        addMethods(klass, properties[i], parent);
    }
    if (!klass.prototype.initialize) {
        klass.prototype.initialize = () => { };
    }
    klass.prototype.constructor = klass;
    klass.prototype.callSuper = callSuper;
    return klass;
}
function _removeEventListener(eventName, handler) {
    if (!this.__eventListeners[eventName]) {
        return;
    }
    var eventListener = this.__eventListeners[eventName];
    if (handler) {
        eventListener[eventListener.indexOf(handler)] = false;
    }
    else {
        fabric.util.array.fill(eventListener, false);
    }
}

function on(eventName, handler) {
    if (!this.__eventListeners) {
        this.__eventListeners = {};
    }
    // one object with key/value pairs was passed
    if (arguments.length === 1) {
        for (var prop in eventName) {
            this.on(prop, eventName[prop]);
        }
    }
    else {
        if (!this.__eventListeners[eventName]) {
            this.__eventListeners[eventName] = [];
        }
        this.__eventListeners[eventName].push(handler);
    }
    return this;
}

function _once(eventName, handler) {
    var _handler = function () {
        handler.apply(this, arguments);
        this.off(eventName, _handler);
    }.bind(this);
    this.on(eventName, _handler);
}

function once(eventName, handler) {
    // one object with key/value pairs was passed
    if (arguments.length === 1) {
        for (var prop in eventName) {
            _once.call(this, prop, eventName[prop]);
        }
    }
    else {
        _once.call(this, eventName, handler);
    }
    return this;
}

function off(eventName, handler) {
    if (!this.__eventListeners) {
        return this;
    }

    // remove all key/value pairs (event name -> event handler)
    if (arguments.length === 0) {
        for (eventName in this.__eventListeners) {
            _removeEventListener.call(this, eventName);
        }
    }
    // one object with key/value pairs was passed
    else if (arguments.length === 1 && typeof arguments[0] === 'object') {
        for (var prop in eventName) {
            _removeEventListener.call(this, prop, eventName[prop]);
        }
    }
    else {
        _removeEventListener.call(this, eventName, handler);
    }
    return this;
}


function fire(eventName, options) {
    if (!this.__eventListeners) {
        return this;
    }

    var listenersForEvent = this.__eventListeners[eventName];
    if (!listenersForEvent) {
        return this;
    }

    for (var i = 0, len = listenersForEvent.length; i < len; i++) {
        listenersForEvent[i] && listenersForEvent[i].call(this, options || {});
    }
    this.__eventListeners[eventName] = listenersForEvent.filter(function (value) {
        return value !== false;
    });
    return this;
}

fabric.Observable = {
    fire: fire,
    on: on,
    once: once,
    off: off,
};



