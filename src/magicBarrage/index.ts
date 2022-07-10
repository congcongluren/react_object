import { initBulletAnimate, createBarrageItem, getContainer } from "./helper";

import { optsType, ItrackStatus, Barrage } from "./type";

// 基础配置
const defaultOptions: optsType = {
  trackHeight: 50, // 跑道高度
  pauseOnHover: false,
  pauseOnClick: false,
  onStart: null,
  onEnd: null,
  duration: "10s",
  speed: 100, // 100px/s
  dataList: [],
  space: 20, // 弹幕间距
};

export default class MagicBarrage {
  ele: string | HTMLElement;
  options: optsType;
  targetPos: DOMRect;
  tempContanier: HTMLElement = null; // 临时弹幕容器
  targetW: number = 0; // 舞台宽度

  target: HTMLElement = null; // 弹幕容器
  tracks: ItrackStatus[] = []; // 轨道列表
  queues: Barrage[] = []; // 弹幕列表


  constructor(ele: string | HTMLElement, option: optsType = {}) {
    this.ele = ele;
    this.options = Object.assign(defaultOptions, option);

    // 设置容器
    this.initScreen();

    // 参数配置
    this.initOpt();

    // 设置弹幕容器
    this.initTempContainer();

    // 初始化弹幕队列
    this.initQueues();

    // 播放弹幕
    this.initPlay();
  }

  // 设置弹幕容器
  private initScreen() {
    if (typeof this.ele === "string") {
      this.target = document.querySelector(this.ele);
      if (!this.target) throw new Error("The display target does not exist");
    } else if (this.ele instanceof HTMLElement) {
      this.target = this.ele;
    } else {
      throw new Error("The display target of the barrage must be set");
    }
  }

  // 初始化一个弹幕临时容器，为后期获取高度
  private initTempContainer() {
    this.tempContanier = document.createElement("div");
    this.tempContanier.classList.add("bullet-temp-container");
    this.target.appendChild(this.tempContanier);
  }

  // 初始化配置
  private initOpt() {
    const { trackHeight } = this.options;
    this.targetPos = this.target.getBoundingClientRect();
    const trackNum: number = Math.floor(this.targetPos.height / trackHeight);
    this.tracks = new Array(trackNum).fill("free");
    this.targetW = this.targetPos.width;

    // 屏幕目标必须具备的CSS样式
    const { position } = getComputedStyle(this.target);
    if (position === "static") {
      this.target.style.position = "relative";
      this.target.style.overflow = "hidden";
    }
    // 插入css animation
    initBulletAnimate(this.targetW);
  }

  // 初始化弹幕队列
  private initQueues() {
    const { dataList } = this.options;
    this.queues = dataList.map(createBarrageItem);
  }

  // 初始播放弹幕列表
  private initPlay() {
    let spaceTrack = this.getSpaceTrack();
    while (spaceTrack.length > 0 && this.queues.length > 0) {
      let barrage = this.getBarrageAttr(this.queues.pop());
      this.render(barrage, spaceTrack.pop());
      this.addEvent(barrage);
    }
  }

  // 添加一条弹幕
  push(text) {
    this.queues.push(createBarrageItem(text));
  }

  // 初始播放弹幕列表
  private autoPlay(trackIndex = -1) {
    if (trackIndex >= 0 && this.queues.length > 0) {
      let barrage = this.getBarrageAttr(this.queues.pop());

      this.render(barrage, trackIndex);
      this.addEvent(barrage);
    }
  }

  // 获取弹幕参数
  private getBarrageAttr(barrage: Barrage): Barrage {
    const { speed, space } = this.options;

    if (barrage.state === "perfect") {
      let bulletEle = getContainer(barrage);
      bulletEle.innerHTML = barrage.content;
      return {
        ...barrage,
        bulletEle: bulletEle,
      };
    }

    // 生成一条弹幕容器
    const bulletEle = getContainer({ duration: "3" });
    // 放入内容
    bulletEle.innerHTML = barrage.content;
    // 为了获取当前弹幕的宽度，故必须要将其先插入到document中
    this.tempContanier.appendChild(bulletEle);
    // 弹幕实际宽度
    let barrageWidth = bulletEle.offsetWidth;
    barrageWidth = barrageWidth < 20 ? 20 : barrageWidth;

    // 弹幕动画时间 = ( 弹幕间距 + 弹幕宽度 ) / 速度；
    const distanceAll = this.targetW + barrageWidth;
    let duration = distanceAll / speed;

    // 释放弹幕轨道时间 = ( 屏幕宽度 + 弹幕宽度 ) / 速度；
    const releaseTime =
      ((space + barrageWidth) / distanceAll) * duration * 1000;

    // 根据speed给弹幕对象设置 duration 属性
    bulletEle.style.animationDuration = duration + "s";

    // 删除临时存储弹幕容器里的弹幕
    bulletEle.remove();

    return {
      ...barrage,
      state: "perfect",
      duration,
      width: barrageWidth,
      releaseTime,
      bulletEle,
    };
  }

  // 渲染一条弹幕
  private render(barrage: Barrage, trackIndex: number) {
    const { bulletEle } = barrage;

    // 没有动画时长，渲染出去，循环播放会有问题
    if (!bulletEle.style.animationDuration) return;

    bulletEle.dataset.track = trackIndex + "";
    bulletEle.style.top = trackIndex * this.options.trackHeight + "px";

    barrage.trackIndex = trackIndex;
    this.tracks[trackIndex] = "running";

    this.target.appendChild(bulletEle);
  }

  // 绑定事件
  private addEvent(barrage: Barrage) {
    const { bulletEle, releaseTime, trackIndex } = barrage;
    const that = this;

    // 监听弹幕开始的事件
    bulletEle.addEventListener("animationstart", () => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          that.tracks[trackIndex] = "space";
          that.autoPlay(trackIndex);
        });
      }, releaseTime);
    });

    // 监听弹幕完成的事件
    bulletEle.addEventListener("animationend", () => {
      // 从集合中剔除已经结束的动画
      bulletEle.remove();
      requestAnimationFrame(() => {
        barrage.bulletEle = null;
        that.queues.unshift(barrage);
        that.initPlay();
      });
    });
  }

  // 获取空闲轨道
  private getSpaceTrack() {
    return this.tracks.reduce((pre, item, i) => {
      if (item === "free" || item === "space") pre.push(i);
      return pre;
    }, []);
  }
}
