import { createElement ,setInitialProperties } from "./ReactDOMComponent";

//如果儿子只是一个数字或者字符串，就设置它的文本内容就行。不需要创建子fiber节点
export function shouldSetTextContent(type, pendingProps) {
    return typeof pendingProps.children === 'string' || typeof pendingProps.children === 'number';
}
export function createInstance(type) {
    return createElement(type);
}

export function finalizeInitialChildren(domElement, type, props) {
    setInitialProperties(domElement, type, props);
}