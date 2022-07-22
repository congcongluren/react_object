// function Person() {
//     this.name = 'isaac'
// }
// Person.prototype = {
//     constructor: Person,
//     job: 'programmer'
// }
 
// var isaac = new Person()
// Object.defineProperty(
//     isaac,
//     'sex',
//     {
//         value: 'male',
//         enumerable: false // 不可枚举
//     }
// )

// for (var i in isaac) {
//     console.log(`isaac.${i} = ${isaac[i]}`)
// }


class First {
    name1 ='First';
    get() {
        console.log('First');
    }
}

// class Second extends First {
//     name2 = 'Second';
//     get() {
//         console.log('Second');
//     }
// }

// class Third extends Second {
//     name3 = 'Third';
//     get() {
//         console.log('Third');
//     }
// }

// let third = new Third();
// let second = new Second();
let first = new First();

console.log(first, 777);
for (var i in first) {
    console.log(`isaac.${i} = ${first[i]}`)
}
