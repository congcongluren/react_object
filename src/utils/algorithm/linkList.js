class Node {
    constructor(value, next = null) {
        this.next = next;
        this.value = value;
    }
}

class LinkedList {
    constructor(val) {
        this.head = new Node(val);
    }

    find(val) {
        let current = this.head;
        while (current !== null && current.value !== val) {
            current = current.next;
        }
        return current || -1;
    }

    findPre(val) {
        let current = this.head;
        if (current.value === val) {
            return -1
        }
        while (current !== null && current.next !== null && current.next.value !== val) {
            current = current.next;
        }

        return current || -1;
    }

    insertBefore(newVal, pre) {
        if (this.head.value === pre) {
            this.head = new Node(newVal, this.head);
            return this.head;
        }

        const findNode = this.findPre(pre);
        if (findNode === -1) return;
        findNode.next = new Node(newVal, findNode.next);
        return findNode.next;
    }

    print() {
        let arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }

    remove(val) {
        let current = this.head;
        let pre = this.head;

        while (current !== null && current.value !== val) {
            pre = current;
            current = current.next;
        }

        if (current === null) {
            return -1;
        } else if (current.next === null && current !== this.head) {
            pre.next = null;
        } else if (current.next === null && current === this.head) {
            return -1
        } else if (current === this.head) {
            this.head = this.head.next;
        } else {
            pre.next = current.next;
            current.next = null;
            return current;
        }

        return current;
    }

    removeNthFromEnd(nth) {
        let cur = this.head,
            target,
            numFlag,
            temp;

        target = cur;
        targetPre = cur;
        numFlag = 0;

        while (cur) {
            if (numFlag >= nth) {
                targetPre = target;
                target = target.next;
            }

            numFlag++;
            cur = cur.next;
        }

        if (numFlag > nth) {
            temp = targetPre.next;
            targetPre.next = temp.next;
            temp.next = null;
            return temp;
        } else if (numFlag === nth) {
            temp = this.head;
            this.head = this.head.next;
            temp.next = null;
            return temp;
        } else {
            return -1
        }

    }

    push(val) {
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = new Node(val);
    }

    unshift(val) {
        this.head = new Node(val, this.head);
    }

    reverse() {
        let cur = this.head.next;
        let pre = this.head;
        let temp;

        pre.next = null;
        while (cur !== null) {
            temp = cur.next;
            cur.next = pre;
            pre = cur;
            cur = temp;
        }
        this.head = pre;
    }

    reverseBase(leftNode, endNode) {
        if (leftNode === endNode) return leftNode;

        let res = this.reverse2(leftNode.next, g);
        leftNode.next.next = leftNode;
        leftNode.next = null;
    }

    reverse2(node = this.head) {
        if (node.next === null) {
            this.head = node;
            return node;
        };

        let res = this.reverse2(node.next);
        node.next.next = node;
        node.next = null;
    }

    reverse3(left, right) {
        let leftPreNode, rightNode, rightAfterNode, leftNode;
        let pre, cur = this.head, temp;

        let beginFlag = false;
        let i = 0;

        while (cur !== null || i < right + 1) {
            switch (i) {
                case left - 1:
                    leftPreNode = cur;
                    break;
                case right + 1:
                    beginFlag = false;
                    break;
                case left + 1:
                    beginFlag = true;
                    break;
                case left:
                    leftNode = cur;
                    break;
                case right:
                    rightAfterNode = cur.next;
                    rightNode = cur;
                    break;
                default:
                    break;
            }

            temp = cur.next
            if (beginFlag) {
                cur.next = pre;
            }


            pre = cur;
            cur = temp;
            i++;
        }

        leftNode.next = rightAfterNode;
        leftPreNode.next = rightNode;
    }

    rotate(k) {
        let cur = this.head;
        let end, len = 1;
        while (cur.next) {
            len++;
            cur = cur.next;
        }

        end = cur;
        cur.next = this.head;

        for (let i = 0; i < len - k; i++) {
            end = end.next;
        }

        this.head = end.next;
        end.next = null;
    }

    swapPairs() {
        function fun(node) {
            if (!node?.next?.next) return node;

            let nextNode = fun(node.next.next);

            let temp = node.next;
            node.next = nextNode;
            temp.next = node;

            return temp;
        }

        this.head = fun(this.head);
    }

    swapPairs2() {
        let nextNode = cur = this.head, temp, pre;

        while (!!cur?.next?.next) {
            nextNode = nextNode.next.next;

            temp = cur.next;
            cur.next = nextNode;
            temp.next = cur;

            if (pre) {
                pre.next = temp;
            } else {
                this.head = temp;
            }

            pre = cur;
            cur = nextNode;
        }
    }

}

const linked1 = new LinkedList('head');
linked1.push("1111");
linked1.push("2222");
linked1.push("3333");
linked1.push("4444");
linked1.push("5555");
linked1.push("6666");

console.log(linked1.print());

linked1.removeNthFromEnd(7);

console.log(linked1.print());
// console.log(linked1);
