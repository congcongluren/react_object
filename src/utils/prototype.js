
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps); 
    return Constructor;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}

var First = function () {
    function First() {
        _classCallCheck(this, First);

        _defineProperty(this, "name1", 'First');
    }

    _createClass(First, [{
        key: "get",
        value: function get() {
            console.log('First');
        }
    }]);

    return First;
}();


var first = new First();
console.log(first, 777);
console.log(first.__proto__);
console.log(first.prototype);

console.log(Object.__proto__);
console.log(Object.prototype);
for (var i in first) {
    console.log("isaac.".concat(i, " = ").concat(first[i]));
}
