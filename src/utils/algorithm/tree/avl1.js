class TreeNode {
    constructor(key) {
        this.data = key; // 存储数据
        this.bf = 0; // 平衡因子 balance factor
        this.left = null; // 左子节点
        this.right = null; // 右子节点
    }
}

var taller = false;
var temp = null;
export class Avl {
    constructor(node) {
        this.root = node || null;
    }

    insert(key) {
        if (!this.root) {
            this.root = new TreeNode(key);
        } else {
            temp = this.insertAvl(this.root, key);
            if (temp !== 0) {
                this.root = temp;
            }
        }
    }
    insertAvl(node, key) {
        if (node === null) {
            taller = true;
            return new TreeNode(key);
        }
        if (key === node.data) {
            return 0;
        }
        if (key < node.data) {
            temp = this.insertAvl(node.left, key); //进行节点的左子树搜索
            if (temp === 0) return 0;
            node.left = temp;
            if (taller) {
                switch (node.bf) {
                    case 1:
                        node = this.leftBalance(node);
                        taller = false;
                        break;
                    case 0:
                        node.bf = 1;
                        taller = true;
                        break;
                    case -1:
                        node.bf = 0;
                        taller = false;
                        break;
                }
            }
        } else {
            temp = this.insertAvl(node.right, key); // 进行节点的右子树搜索
            if (temp === 0) return 0;
            node.right = temp;
            if (taller) {
                switch (node.bf) {
                    case 1:
                        node.bf = 0;
                        taller = false;
                        break;
                    case 0:
                        node.bf = -1;
                        taller = true;
                        break;
                    case -1:
                        node = this.rightBalance(node);
                        taller = false;
                        break;
                }
            }
        }

        return node;
    }

    leftBalance(node) {
        let lc = node.left;
        switch (lc.bf) {
            case 1:
                lc.bf = 0;
                node.bf = 0;
                return this.RightRotate(node);
            case -1:
                let rd = lc.right;
                switch (rd.bf) {
                    case 1:
                        lc.bf = 0;
                        node.bf = -1;
                        break;
                    case -1:
                        lc.bf = 1;
                        node.bf = 0;
                        break;
                    case 0:
                        lc.bf = 0;
                        node.bf = 0;
                        break;
                }
                rd.bf = 0;
                node.left = this.LeftRotate(node.left);
                return this.RightRotate(node);
        }
    }

    rightBalance(node) {
        let rc = node.right;
        switch (rc.bf) {
            case -1:
                rc.bf = 0;
                node.bf = 0;
                return this.LeftRotate(node);
            case 1:
                let ld = rc.left;
                switch (ld.bf) {
                    case 1:
                        rc.bf = -1;
                        node.bf = 0;
                        break;
                    case -1:
                        rc.bf = 0;
                        node.bf = 1;
                        break;
                    case 0:
                        rc.bf = 0;
                        node.bf = 0;
                        break;
                }
                ld.bf = 0;
                node.right = this.RightRotate(node.right);
                return this.LeftRotate(node);
        }
    }
    

    // 左旋操作
    LeftRotate(node) {
        let newNode = node.right;
        node.right = newNode.left;
        newNode.left = node;
        return newNode;
    }

    // 右旋操作
    RightRotate(node) {
        let newNode = node.left;
        node.left = newNode.right;
        newNode.right = node;
        return newNode;
    }

}