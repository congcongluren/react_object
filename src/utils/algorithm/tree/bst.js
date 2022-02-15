class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left || null;
        this.right = right || null;
    }
}
export class BST {
    constructor(root) {
        this.root = root || null;
    }

    insert(val) {
        if (val === undefined) {
            return;
        }
        let newNode = new Node(val);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode, compare) {
        if (newNode.data === node.data) {
            return null;
        } else if (newNode.data < node.data) {
            // 如果新节点值小于当前节点值，则插入左子节点
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            // 如果新节点值大于当前节点值，则插入右子节点
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    inOrderTraverse(cb) {
        this.inOrderTraverseNode(this.root, cb)
    }

    inOrderTraverseNode(node, cb) {
        if (node !== null) {
            this.inOrderTraverseNode(node.left, cb);
            cb && cb(node.data);
            this.inOrderTraverseNode(node.right, cb);
        }
    }


    preOrderTraverse(cb) {
        this.preOrderTraverseNode(this.root, cb)
    }
    preOrderTraverseNode(node, cb) {
        if (node !== null) {
            cb && cb(node.data);
            this.preOrderTraverseNode(node.left, cb);
            this.preOrderTraverseNode(node.right, cb);
        }
    }


    postOrderTraverse(cb) {
        this.postOrderTraverseNode(this.root, cb)
    }
    postOrderTraverseNode(node, cb) {
        if (node !== null) {
            this.postOrderTraverseNode(node.left, cb);
            this.postOrderTraverseNode(node.right, cb);
            cb && cb(node.data);
        }
    }

    search(data) {
        return this.searchNode(this.root, data)
    }
    searchNode(node, data) {
        if (node === null) {
            return false;
        }

        if (node.data > data) {
            return this.searchNode(node.left, data);
        } else if (node.data < data) {
            return this.searchNode(node.right, data);
        } else {
            return node;
        }
    }

    remove(data) {
        this.root = this.removeNode(this.root, data)
    }
    removeNode(node, data) {
        if (node === null) {
            return null
        }
        if (data < node.data) {
            node.left = this.removeNode(node.left, data)
            return node
        } else if (data > node.data) {
            node.right = this.removeNode(node.right, data)
            return node
        } else {
            // 一个叶节点
            if (node.left === null && node.right === null) {
                node = null;
                return node
            }
            // 只有一个子节点的节点
            if (node.left === null) {
                node = node.right;
                return node
            } else if (node.right === null) {
                node = node.left;
                return node
            }
            // 有两个子节点的节点情况
            let aux = this.findMinNode(node.right);
            node.data = aux.data;
            node.right = this.removeNode(node.right, aux.key);
            return node
        }
    }

    findMinNode(node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left;
            }
            return node
        }
        return null
    }
}

const bst1 = new BST();
// [3,4,5,1,2,-1,0,23,-67,20,10,34,56,78]

[3, 1, 2, 3, 4, 5, 6].forEach(item => {
    bst1.insert(item);
});

function levelOrder(tree) {
    let queue = [tree, -1];
    let res = [[tree.data]];
    let num = 1;
    while (true) {
        while (queue[0] !== -1) {
            if (queue[0].left) {
                queue.push(queue[0].left);
            }
            if (queue[0].right) {
                queue.push(queue[0].right);
            }
            queue.shift();
        }
        queue.shift();
        if (queue.length === 0) {
            return res;
        } else {
            queue.push(-1);
            res.push([]);
        }

        for (let i = 0; i < queue.length - 1; i++) {
            res[res.length - 1].push(queue[i].data);
        }

    }
}


var levelOrder2 = function (root) {
    if (!root) return [];
    const queue = [root];
    const res = []; // 存放遍历结果
    let level = 0; // 代表当前层数
    while (queue.length) {
        res[level] = []; // 第level层的遍历结果

        let levelNum = queue.length; // 第level层的节点数量
        while (levelNum--) {
            const front = queue.shift();
            res[level].push(front.data);
            if (front.left) queue.push(front.left);
            if (front.right) queue.push(front.right);
        }

        level++;
    }
    return res;
};


// console.log(bst1.root);
// console.log(levelOrder2(bst1.root));

// console.log(bst1.search(4));

// bst1.inOrderTraverse((val) => {
//     console.log(val);
// })
// bst1.preOrderTraverse((val) => {
//     console.log(val);
// })
// bst1.postOrderTraverse((val) => {
//     console.log(val);
// })
// console.log();

