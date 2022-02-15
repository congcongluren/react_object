let bStr = 'b 模块的变量';

function bGet(params) {
    console.log( 'b 介绍一下： ', bStr);
}


function bSet(params) {
    bStr = 'b 模块的变量' + params
}

let bObj = {
    b: 1
}


export {
    bStr,
    bSet,
    bGet,
    bObj
}