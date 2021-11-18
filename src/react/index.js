import React from './react';
import ReactDom from './react-dom';

let element = (
    <div key="title" id="title">title</div>
)

ReactDom.render(element, document.getElementById('app'));