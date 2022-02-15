import React, { useEffect, useState } from 'react';
import { BST } from '~';
import './tree.scss';

export default function Tree() {

    const [tree, setTree] = useState(null);

    useEffect(() => {
        const bst1 = new BST();
        let t1 = [3, 1, 2, 4, 7, 6, 8, 5];
        let t2 = [1, 3, 2];
        t2.forEach(item => {
            bst1.insert(item);
        });

        setTree(bst1.root);
    }, []);

    return (
        <div className='tree-wrap'>
            {tree && renderTree(tree)}
        </div>
    )
}


function renderTree(data) {
    if (!data) {
        return <div className="node null"></div>
    }
    return (
        <div className='node-wrap'>
            <div className="node">{data?.data}</div>
            {
                (data.left || data.right) &&
                <div className="child">
                    {renderTree(data.left)}
                    {renderTree(data.right)}
                </div >
            }

        </div >
    )
}
