import React, { useEffect } from 'react';
import { bStr, bSet, bGet } from './b';
// import { aStr, aSet, aGet } from './a';



export default function Index() {

    // useEffect(() => {
    //     console.log(bStr);
    //     bSet('b加点东西')
    //     console.log(bStr);
    //     bGet();
    // });
    useEffect(() => {
        let a = require('./a');

        console.log(a);
        a.aSet('a加点东西');
        console.log(a);
        a.aGet();
        a.aStr = 333;
        console.log(a);
    });

    return <div>11</div>;
}
