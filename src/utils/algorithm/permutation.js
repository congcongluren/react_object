export function permutations(arr) {
    let len = arr.length;
    let res = [];
    let temp;


    const fun = (container, right) => {
        if (container.length === len) {
            res.push(container.join(''));
        } else {
            right.forEach((item, i) => {
                temp = [].concat(right);
                temp.splice(i, 1);
                fun(container.concat(item), temp);
            });
        }
    }

    fun([], arr);


    return res;
}