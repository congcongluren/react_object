import React, { useEffect } from 'react';
import { BulletJs } from '../../bullet';
import MagicBarrage from '../../magicBarrage';
import './index.scss';

let mb;
export default function BulletView() {
  const danmuList = [
    "你好科比布莱恩特",
    "这个老哥的评论说的很对啊，这都能被违规隐藏？是戳痛到某些人了吗。",
    "rip....",
    "resepct",
    "😂❤️😍😒👌☺️☺️😊😭😩😩😔😏😁👍🏿😁😏😏😔💕😭😘😊❤️😍",
    "圣何塞-穆里尼奥",
    "泰伦卢，泰伦卢，泰伦卢，泰伦卢",
    "勒布朗-詹姆斯",
    "emoji",
    "湖人阵容也不是特别豪华为什么能打到西部第一？ 由高田大叔 发表在篮球·湿乎乎的话题-说的很对啊，很对啊",
    "----huhuh---hahahha---",
    "😂❤️😍😒👌☺️☺️😊😭😩😩😔😏😁👍🏿😁😏😏😔💕😭😘😊❤️😍"
  ]


  useEffect(() => {
    mb = new MagicBarrage(".screen", {
      dataList: danmuList,
      loop: true,
    });
  }, []);

  const handleClick = () => {
    let input = document.getElementById("d-input");
    console.log(input.value);
    mb.push(input.value);
  }

  return (
    <div className="buttlet-wrap">
      <div className="screen">

      </div>

      <div className="opeate">
        <button id="pauseAll">暂停全部</button>
        <button id="continueAll">继续全部</button>
      </div>
      <div className="opeate">
        <button className="close-time">暂停计时器</button>
        <button className="open-time">继续计时器</button>
      </div>
      <div className="opeate">
        <input id="d-input" type="text" placeholder="手动发送的弹幕" />
        <button id="sendDanmu" onClick={handleClick}>发送弹幕</button>
      </div>
    </div>
  )
}
