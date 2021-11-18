import { REACT_ELEMENT_TYPE } from "./ReactSymbols";
import { createFiberFromElement } from './ReactFiber';
import { Placement } from './ReactFiberFlags';

function childReconciler(shouldTrackSideEffects) {
    function reconcileSingleElement(returnFiber, currentFirstChild, element) {
        const created = createFiberFromElement(element);//div#title
        created.return = returnFiber;
        return created;
    }
    function placeSingleChild(newFiber) {
        //如果当前需要跟踪父作用，并且当前这个新的fiber它的替身不存在
        if (shouldTrackSideEffects && !newFiber.alternate) {
            //给这个新fiber添加一个副作用，表示在未来提前阶段的DOM操作中会向真实DOM树中添加此节点
            newFiber.flags = Placement;
        }
        return newFiber;
    }
    /**
     * 
     * @param {*} returnFiber 新的父fiber
     * @param {*} currentFirstChild current就是老的意思，老的第一个子fiber
     * @param {*} newChild 新的虚拟DOM
     */
    function reconcileChildFibers(returnFiber, currentFirstChild, newChild) {
        //判断newChild是不是一个对象,如果是的话说明新的虚拟DOM只有一个React元素节点
        const isObject = typeof newChild === 'object' && (newChild);
        //说明新的虚拟DOM是单节点
        if (isObject) {
            switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                    return placeSingleChild(reconcileSingleElement(
                        returnFiber, currentFirstChild, newChild
                    ));
            }
        }
    }
    return reconcileChildFibers;
}

export const reconcileChildFibers = childReconciler(true);
export const mountChildFibers = childReconciler(false);