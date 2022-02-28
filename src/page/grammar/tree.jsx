import React, { useCallback, useEffect, useState } from 'react';
import { BST, AVLTree } from '~';
import './tree.scss';

export default function Tree() {

    const [tree, setTree] = useState(null);
    const [data, setData] = useState(null);
    const [inputValue, setInputValue] = useState(0);

    useEffect(() => {
        // const bst1 = new BST();
        const bst1 = new AVLTree();
        let t1 = [3, 1, 2, 4, 7, 6, 8, 5];
        let t2 = [3, 2, 1, 4, 0, 0.7, 1.5, 1.7, 1.8, 1.9, 1.91, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 11.5];
        let t3 = [3, 2, 1, 0, 1.5, 4];
        let t4 = [3, 2, 1];
        let t5 = [3, 2, 1, 0, 5, 10, 6, 7, 8];
        t4.forEach(item => {
            bst1.insert(item);
        });
        

        setTree(bst1);
        setData(bst1.root);
    }, []);

    const insertNode = useCallback(() => {
        tree.insert(Number(inputValue));
        setData({ ...tree.root });
    }, [tree, inputValue]);

    return (
        <div className='tree-wrap'>
            <div className='top'>
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => {
                        setInputValue(e.target.value)
                    }}
                />
                <button
                    onClick={insertNode}
                >插入</button>
            </div>
            <div className='tree'>
                {data && renderTree(data)}
            </div>
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
