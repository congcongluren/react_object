
const Placement = 0b10;//2 添加 或者说创建 挂载
const Update = 0b100;//4  更新
let workInProgress = { flags: 0 };
workInProgress.flags |= Placement;
console.log(workInProgress.flags);
workInProgress.flags |= Update;
console.log(workInProgress.flags);//0b110