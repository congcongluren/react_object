import { cloneTwo } from '~'
/**
 * @param {Array} maps 所有得质数集合，每个质数代表一个规格ID
 * @param {*} openWay 可用的 SKU 组合
 */
export class PathFinder {
  constructor(maps, openWay) {
    this.maps = maps; // 二维质数数组
    this.openWay = openWay; // 可选sku 乘积数组
    this._way = {}; // 质数坐标， 二维数组
    this.light = []; // 每个规格状态 0 1 2
    this.selected = [];
    this.init();
  }

  /**
   * 初始化，格式需要对比数据，并进行初始化是否可选计算
   */
  init() {
    this.light = cloneTwo(this.maps, true);
    const light = this.light;

    // 默认每个规则都可以选中，即赋值为1
    for (let i = 0; i < light.length; i++) {
      const l = light[i];
      for (let j = 0; j < l.length; j++) {
        this._way[l[j]] = [i, j];
        l[j] = 1;
      }
    }


    // 得到每个可操作的 SKU 质数的集合
    for (let i = 0; i < this.openWay.length; i++) {
      // eslint-disable-next-line no-eval
      this.openWay[i] = eval(this.openWay[i].join('*'));
    }
    // return 初始化得到规格位置，规格默认可选处理，可选 SKU 的规格对应的质数合集
    this._check();
  }

  /**
   * 选中结果处理
   * @param {Boolean} isAdd 是否新增状态
   * @returns
   */
  _check(isAdd) {
    const light = this.light;
    const maps = this.maps;

    for (let i = 0; i < light.length; i++) {
      const li = light[i];
      const selected = this._getSelected(i);
      for (let j = 0; j < li.length; j++) {
        // 判断一个规格是否选中
        if (li[j] !== 2) {
          // 如果是加一个条件，只在是light值为1的点进行选择
          if (isAdd) {
            if (li[j]) {
              light[i][j] = this._checkItem(maps[i][j], selected);
            }
          } else {
            light[i][j] = this._checkItem(maps[i][j], selected);
          }
        }
      }
    }
    return this.light;
  }
  /**
   * 检查是否可选内容
   * @param {Int} item 当前规格质数
   * @param {Array} selected
   * @returns
   */
  _checkItem(item, selected) {
    // 拿到可以选择的 SKU 内容集合
    const openWay = this.openWay;
    const val = item * selected;
    // 拿到已经选中规格集合*此规格集合值
    // 可选 SKU 集合反除，查询是否可选
    for (let i = 0; i < openWay.length; i++) {
      if (openWay[i] % val === 0) {
        return 1;
      }
    }
    return 0;
  }

  /**
   * 组合中已选内容，初始化后无内容
   * @param {Index} xpath
   * @returns
   */
  _getSelected(xpath) {
    const selected = this.selected;
    const _way = this._way;
    const retArr = [];
    let ret = 1;

    if (selected.length) {
      for (let j = 0; j < selected.length; j++) {
        const s = selected[j];
        // xpath表示同一行，当已经被选择的和当前检测的项目再同一行的时候
        // 需要忽略。
        // 必须选择了 [1, 2],检测的项目是[1, 3]，不可能存在[1, 2]和[1, 3]
        // 的组合，他们在同一行
        if (_way[s][0] !== xpath) {
          ret *= s;
          retArr.push(s);
        }
      }
    }

    return ret;
  }

  /** 选择可选规格后处理
   * @param {array} point [x, y]
   */
  add(point) {
    point = point instanceof Array ? point : this._way[point];
    const val = this.maps[point[0]][point[1]];

    // 检查是否可选中
    if (!this.light[point[0]][point[1]]) {
      throw new Error(
        'this point [' + point + '] is no availabe, place choose an other'
      );
    }

    if (val in this.selected) return;

    const isAdd = this._dealChange(point, val);
    this.selected.push(val);
    this.light[point[0]][point[1]] = 2;
    this._check(!isAdd);
  }

  /**
   * 判断是否同行选中
   * @param {Array} point 选中内容坐标
   * @returns
   */
  _dealChange(point) {
    const selected = this.selected;
    // 遍历处理选中内容
    for (let i = 0; i < selected.length; i++) {
      // 获取刚刚选中内容的坐标，属于同一行内容
      const line = this._way[selected[i]];
      if (line[0] === point[0]) {
        this.light[line[0]][line[1]] = 1;
        selected.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  /**
   * 移除已选规格
   * @param {Array} point
   */
  remove(point) {
    point = point instanceof Array ? point : this._way[point];
    const val = this.maps[point[0]][point[1]];
    if (!val) {
      return;
    }

    if (val) {
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i] === val) {
          const line = this._way[this.selected[i]];
          this.light[line[0]][line[1]] = 1;
          this.selected.splice(i, 1);
        }
      }

      this._check();
    }
  }
  /**
   * 获取当前可用数据
   * @returns []
   */
  getWay() {
    const light = this.light;
    const way = cloneTwo(light);
    for (let i = 0; i < light.length; i++) {
      const line = light[i];
      for (let j = 0; j < line.length; j++) {
        if (line[j]) way[i][j] = this.maps[i][j];
      }
    }
    return way;
  }
}
