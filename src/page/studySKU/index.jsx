import React, { useEffect } from 'react';
import './index.scss';
import { descartes } from '~';

export default function StudySKU() {
    useEffect(() => {
        const type = ["男裤", "女裤"]
        const color = ["黑色", "白色"]
        const size = ["S", "L"]
        const long = ["短", "长"]
        console.log(descartes([type, color, size, long]));
    }, []);

    return (
        <div>

        </div>
    )
}
