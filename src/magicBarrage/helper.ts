import { Barrage } from './type';

/**
 * 插入样式
 * @param {*} width
 */
export const initBulletAnimate = (width: number): void => {
  let style = document.createElement("style");
  const animateClass = "BULLET_ANIMATE";
  style.classList.add(animateClass);

  let from = `from { visibility: visible; transform: translateX(${width}px); }`;
  let to = `to { visibility: visible; transform: translateX(-100%); }`;

  const animateString = `@keyframes RightToLeft { ${from} ${to} }`;

  const bulletContainer = `
    .bullet-item-style {
		cursor: pointer;
		position: absolute;
		left: 0;
		animation-name: RightToLeft;
		animation-timing-function: linear;
		will-change: transform;
		overflow: hidden;
		display: inline-block;
		word-break: keep-all;
		white-space: nowrap;
	}
	`;

  const bulletTempContainer = `
	.bullet-temp-container {
		position: absolute;
		right: 999999;
    visibility: hidden;
	}
	`;
  style.innerHTML = animateString + bulletContainer + bulletTempContainer;
  document.head.appendChild(style);
};

export const getContainer = (barrage: Barrage): HTMLElement => {
  const { duration } = barrage;
  // 创建单条弹幕的容器
  const bulletContainer = document.createElement("div");
  bulletContainer.id = Math.random().toString(36).substring(2);
  bulletContainer.classList.add("bullet-item-style");
  bulletContainer.style.animationDuration = duration + 's';

  return bulletContainer;
};

/**
 * 获取 [min, max] 的随机数
 * @param {*} min
 * @param {*} max
 */
export const getRandom = (min: number, max: number): number =>
  parseInt(Math.random() * (max - min + 1) as any) + min;

/**
 * 创建弹幕对象
 * @param params 弹幕文本
 * @returns 
 */
export function createBarrageItem(params:string):Barrage {
  return {
    content: params,
    state: 'init'
  }
}
