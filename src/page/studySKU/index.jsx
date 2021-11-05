import React, { useEffect } from 'react';
import './index.scss';
import { descartes, permutations, combine } from '~';

export default function StudySKU() {
    useEffect(() => {
        const type = ["男裤", "女裤"];
        const color = ["黑色", "白色"];
        const size = ["S", "L"];
        const long = ["短", "长"];
        // console.log(descartes([type, color, size, long]));
        console.log(combine(type, color, size, long));

        const arr = ['A', 'B', 'C', 'D'];
        console.log(permutations(arr));
    }, []);

    return (
        <div>

        </div>
    )
}
