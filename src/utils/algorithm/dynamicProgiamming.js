let g= [400, 500, 200, 300, 350 ];
let p= [5, 5, 3, 4, 3];
const getMostGold = (n, w, g, p) => {
    let preRes = [];
    let res = [];
    for (let i = 0; i < w; i++) {
        if (i + 1 < p[0]) {
            preRes[i] = 0;
        } else {
            preRes[i] = g[0];
        }
    }


    for (let i = 1; i < n; i++) {
        for (let j = 0; j < w; j++) {
            if (j + 1 < p[i]) {
                res[j] = preRes[j];
            }else {
                res[j] = Math.max(preRes[j], preRes[j + 1 - p[i]] + g[i]);
            }
        }
        preRes = res;
        
    }


    return res[w - 1];
}

console.log(getMostGold(5, 10, g, p));