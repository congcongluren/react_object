let bStr = 'b 模块的变量';

function bGet(params) {
    console.log( 'b 介绍一下： ', bStr);
}


function bSet(params) {
    bStr = 'b 模块的变量' + params
}



export {
    bStr,
    bSet,
    bGet
}