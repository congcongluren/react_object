// import { bStr, bObj, bSet, bGet } from './page/grammar/b';
// import { aStr, aSet, aGet } from './a';


// console.log(bObj);
// bObj.b = 0;
// console.log(bObj);



// console.log(bStr);
// bSet('b加点东西')
// console.log(bStr);
// bGet();

// let a = require('./page/grammar/a');
// console.log(a);
// console.log(a.aStr);
// a.aSet('a加点东西');
// console.log(a);
// console.log(a.aStr);
// a.aGet();
// a.aStr = 333;
// console.log(a);
// console.log(a.aStr);


let { aStr, aSet, aGet } = require('./page/grammar/a');
console.log(aStr);
aSet('a加点东西');
console.log(aStr);
aGet();
aStr = 333;
console.log(aStr);