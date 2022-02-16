class TreeNode {
    constructor(val) {
        this.data = val; // 存储数据
        this.bf = 0; // 平衡因子 balance factor
        this.left = null; // 左子节点
        this.right = null; // 右子节点
    }
}

export class AVLTree {
    constructor() {
        this.root = null;
    }

    insert(val) {
        let node = new TreeNode(val);
        if (this.root === null) {
            this.root = node
        } else {
            this.insertVal(this.root, node);
        }
    }

    insertVal(tree, newNode) {
        if (tree.data === newNode.data) {
            // 相等不插入
            return null;
        }else if (tree.data > newNode.data) {
            // 向左插入
            if (tree.left === null) {
                tree.left = newNode
            } else {
                this.insertVal(tree.left, newNode);
            }
        } else {
            // 向右插入
            if (tree.right === null) {
                tree.right = newNode
            } else {
                this.insertVal(tree.right, newNode)
            }
        }

    }

}

let t = new AVLTree();

t.insert(3);
t.insert(2);

console.log(t);