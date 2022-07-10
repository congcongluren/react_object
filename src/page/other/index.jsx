import React, { useEffect } from 'react';
import axios from 'axios';
import doc from './doc.json';

export default function index() {
    useEffect(() => {
        axios({
            method: 'post',
            url: '/exportImage',
            // headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            // },
            data: {
                width: 100,
                height: 100,
                doc: JSON.stringify(doc),
                params: JSON.stringify({ 'canvas_scale': 1 })
            }
        }).then(res => {
            console.log(`状态码: ${res.statusCode}`)
            console.log(res)
        }).catch(error => {
            console.error(error)
        })

    }, []);

    return (
        <div>index</div>
    )
}
