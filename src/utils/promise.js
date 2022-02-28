
function resolvePromise(promise2, x, resolve, reject) {
    //判断x是不是promise
    //规范中规定：我们允许别人乱写，这个代码可以实现我们的promise和别人的promise 进行交互
    if (promise2 === x) {//不能自己等待自己完成
        return reject(new TypeError('循环引用'));
    };
    // x是除了null以外的对象或者函数
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        let called;//防止成功后调用失败
        try {//防止取then是出现异常  object.defineProperty
            let then = x.then;//取x的then方法 {then:{}}
            if (typeof then === 'function') {//如果then是函数就认为他是promise
                //call第一个参数是this，后面的是成功的回调和失败的回调
                then.call(x, y => {//如果Y是promise就继续递归promise
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)
                }, r => { //只要失败了就失败了
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else {//then是一个普通对象，就直接成功即可
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e)
        }
    } else {//x = 123 x就是一个普通值 作为下个then成功的参数
        resolve(x)
    }

}

class Promise1 {
    constructor(cb) {
        this.status = "pending"; // pending fulfilled rejected
        this.value = null;
        this.fulfilledCb = [];
        this.rejectedCb = [];


        function onFulfilled(res) {
            if (this.status !== "pending") throw new Error();

            this.status = "fulfilled";

            this.value = res;

            for (let i = 0; i < this.fulfilledCb.length; i++) {
                const onFuiFilled = this.fulfilledCb[i];
                onFuiFilled(res);
            }

        }

        function onRejected(res) {
            if (this.status !== "pending") throw new Error();

            this.status = "rejected";

            this.value = res;
        }


        cb(onFulfilled.bind(this), onRejected.bind(this));
    }

    then(onFuiFilled, onRejected) {
        let promise2;

        if (this.status === "fulfilled") {
            promise2 = new Promise1((resolve, reject) => {
                setTimeout(() => {
                    try{

                        let x = onFuiFilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            })
        } 
        if (this.status === "rejected") {
            // this.fulfilledCb.push(onRejected);
        }


        if(this.status === 'pending'){
            promise2 = new Promise1((resolve, reject) => {
                this.fulfilledCb.push(() => {
                    setTimeout(() => {
                        try{
                            let x = onFuiFilled(this.value);
                            resolvePromise(promise2,x,resolve,reject);
                        } catch(e) {
                            reject(e);
                        }
                    }, 0)
                })
            })
        }

        return promise2;
    }
    catch(cb) {
        this.rejectedCb.push(cb);
    }
}



let p1 = new Promise1((resolve, reject) => {
    setTimeout(() => {
        resolve(111);
    }, 1000);
})

p1.then(res => {
    console.log(res, 777);
    return new Promise1((resolve, reject) => {
        setTimeout(() => {
            resolve(2222);
        }, 1000);
    })
}).then(res => {
    console.log(res, 888);
})

