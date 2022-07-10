// 项目参数
export interface optsType {
  trackHeight?: number;
  pauseOnHover?: boolean;
  pauseOnClick?: boolean;
  onStart?: Function | null;
  onEnd?: Function | null;
  duration?: string;
  speed?: number;
  loop?: boolean;
  dataList?: string[];
  space?: number;
}

// 轨道的状态
export type ItrackStatus = "free" | "space" | "running";

// 弹幕对象
export interface Barrage {
  content?: string;
  state?: "init" | "perfect";
  duration?: number | string;
  width?: number;
  releaseTime?: number;
  bulletEle?: HTMLElement;
  trackIndex?: number; // 当前所在的轨道
}
