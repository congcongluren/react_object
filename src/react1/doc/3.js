const Placement = 0b000000000000000010;//2 添加 或者说创建 挂载
function collectEffectList(returnFiber, completedWork) {
    //如果父亲 没有effectList,那就让父亲 的firstEffect链表头指向自己的头
    if (!returnFiber.firstEffect) {
        returnFiber.firstEffect = completedWork.firstEffect;
    }
    //如果自己有链表尾
    if (completedWork.lastEffect) {
        //并且父亲也有链表尾
        if (returnFiber.lastEffect) {
            //把自己身上的effectlist挂接到父亲的链表尾部
            returnFiber.lastEffect.nextEffect = completedWork.firstEffect;
        }
        returnFiber.lastEffect = completedWork.lastEffect;
    }
    const flags = completedWork.flags;
    //如果此完成的fiber有副使用，那么就需要添加到effectList里
    if (flags) {
        //如果父fiber有lastEffect的话，说明父fiber已经有effect链表
        if (returnFiber.lastEffect) {
            returnFiber.lastEffect.nextEffect = completedWork;
        } else {
            returnFiber.firstEffect = completedWork;
        }

        returnFiber.lastEffect = completedWork;
    }
}

let rootFiber = { key: 'rootFiber' };
let fiberA = { key: 'A', flags: Placement };
let fiberB = { key: 'B', flags: Placement };
let fiberC = { key: 'C', flags: Placement };
//rootFiber->A-BC 
//B把自己的fiber给A
collectEffectList(fiberA, fiberB);
collectEffectList(fiberA, fiberC);
collectEffectList(rootFiber, fiberA);
let effectList = '';
let nextEffect = rootFiber.firstEffect;
while (nextEffect) {
    effectList += `${nextEffect.key}=>`;
    nextEffect = nextEffect.nextEffect;
}
effectList += 'null';
console.log(effectList);