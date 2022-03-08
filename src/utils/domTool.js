export function getDomById(id) {
    return document.getElementById(id);
}

export function createElementByName(tagName) {
    return document.createElement(tagName);
}

export function addListener(element, eventName, handler, options) {
    element && element.addEventListener(eventName, handler, options || false);
};

export function removeListener(element, eventName, handler, options) {
    element && element.removeEventListener(eventName, handler, options || false);
};

export function addClass(element, className) {
    if (element && (' ' + element.className + ' ').indexOf(' ' + className + ' ') === -1) {
        element.className += (element.className ? ' ' : '') + className;
    }
};

export function appendChild(targetEl, childEl) {
    targetEl.appendChild(childEl);
};

export function copyCanvasStyle(toEl, fromEl) {
    toEl.style.cssText = fromEl.style.cssText;
};

export function setStyle(element, styles) {
    var elementStyle = element.style;
    if (!elementStyle) {
        return element;
    }
    for (var property in styles) {
        elementStyle[property] = styles[property];
    }
    return element;
};