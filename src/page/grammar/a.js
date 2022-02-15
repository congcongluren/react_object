let aStr = 'a 模块的变量';

let aObj = {
    w: 11
};

function aGet(params) {
    console.log( 'a 介绍一下： ', aStr);
}


function aSet(params) {
    // console.log(params);
    aStr = 'a 模块的变量' + params
    // console.log(aStr);
    // console.log('------------');
}



// module.exports = aObj;
// module = aObj;
// console.log(module, 777);
module.exports = {
    aStr,
    aSet,
    aGet
}