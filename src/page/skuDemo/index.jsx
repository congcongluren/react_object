import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { getPrime, descartes } from '~';
import { PathFinder } from './sku';

export default function SkuDemo() {
    // 规格
    const [typeTable, setTypeTable] = useState([]);
    // 规格质数映射表
    const [valueInLabel, setValueInLabel] = useState({});
    // 可选sku
    const [canUseSku, setCanUseSku] = useState([]);

    const [selected, setSelected] = useState([]);
    const [unDisabled, setUnDisabled] = useState([]);

    const pathFinder = useRef(null);

    useEffect(() => {
        /**
         * 规格表
         */
        let typeTable = [
            ['男裤', '女裤', '中性'],
            ['黑色', '白色', '绿色'],
            ['S', 'L', 'X', 'M', 'XL'],
            // ['布料', '塑料'],
            // ['长', '短'],
        ]


        /**
         * 生成规格质数
         */
        const types = typeTable.flat();
        const prime = getPrime(types.length);
        // 质数对应规格数 枚举值处理
        const valueInLabel = {};
        types.forEach((item, index) => {
            valueInLabel[item] = prime[index];
        });


        /**
         * 模拟生成可选sku
        */
        const sku = descartes(typeTable).map((item) => {
            return {
                // 随机库存内容
                stock: Math.floor(Math.random() * 10) > 5 ? 0 : 1,
                // 规格名
                skuName: item,
                // 规格对应质数
                skuPrime: item.map(ii => valueInLabel[ii]),
            };
        });

        let testData = [
            {
                skuName: ['男裤', '黑色', 'S'],
                skuPrime: [2, 4, 7],
                stock: 1,
            },
            {
                skuName: ['女裤', '黑色', 'L'],
                skuPrime: [3, 4, 11],
                stock: 1,
            },
            {
                skuName: ['女裤', '黑色', 'S'],
                skuPrime: [3, 4, 7],
                stock: 1,
            }
        ]
        // 筛选可选的 SKU
        const canUseSku = sku.filter(item => item.stock);

        setCanUseSku(canUseSku);
        setTypeTable(typeTable);
        setValueInLabel(valueInLabel);
    }, []);

    useEffect(() => {
        if (
            typeTable.length === 0 || valueInLabel.length === 0 || canUseSku.length === 0
        ) return;

        // 根据规格坐标，排序质数坐标
        const way = typeTable.map((i) => {
            return i.map(ii => valueInLabel[ii]);
        });

        // 初始化规格展示内容
        pathFinder.current = new PathFinder(way, canUseSku.map(item => item.skuPrime));
        // 获取不可选规格内容
        const unDisabled = pathFinder.current.getWay().flat();

        setUnDisabled(unDisabled);

    }, [typeTable, valueInLabel, canUseSku]);

    const onClickSelType = useCallback((type, prime, primeIndex) => {
        // 获取已经选中的规格,质数，规格枚举值,以及原本规格名称
        const stateType = typeTable;
        const _pathFinder = pathFinder.current;

        // 检查此次选择是否在已选内容中
        const index = selected.indexOf(type);
        // 获取已经有的矩阵值
        const light = _pathFinder.light;

        // 如果未选中则提供选中，如果选中移除
        if (index > -1) {
            _pathFinder.remove(prime);
            selected.splice(index, 1);
        } else if (light[primeIndex].includes(2)) {
            // 如果同规格中，有选中，则先移除选中，
            // 获取需要移除的同行规格
            const removeType = stateType[primeIndex][light[primeIndex].indexOf(2)];
            // 获取需要提出的同行规格质数
            const removePrime = valueInLabel[removeType];
            // 移除
            _pathFinder.remove(removePrime)
            selected.splice(selected.indexOf(removeType), 1);
            //移除同行后，添加当前选择规格
            _pathFinder.add(prime)
            selected.push(type);
        } else {
            _pathFinder.add(prime);
            selected.push(type);
        }

        // 更新不可选规格
        const unDisabled = _pathFinder.getWay().flat();

        setSelected(selected);
        setUnDisabled(unDisabled);
    }, [selected, valueInLabel, typeTable]);

    return (
        <div>
            <h3>React SKU 展示模版</h3>
            {/* 此处引入设计的业务组件 */}
            <div>
                规格：
                <TypeBtns
                    typeTable={typeTable}
                    selected={selected}
                    unDisabled={unDisabled}
                    valueInLabel={valueInLabel}
                    onClickSelType={onClickSelType}
                />
                可选的SKU：
                <CanUseSkuNode
                    canUseSku={canUseSku}
                />
            </div>
        </div>
    )
}


function TypeBtns(props) {
    const { typeTable, selected, valueInLabel, unDisabled, onClickSelType } = props;
    return (
        <div>
            {
                typeTable.map((item, index) => {
                    return (
                        <div style={{ margin: 10 }} key={index}>
                            {
                                item.map((btn, i) => {
                                    return (
                                        <Button style={{ margin: '0 10px' }}
                                            key={i}
                                            type={selected.includes(btn) ? 'primary' : ''}
                                            disabled={!unDisabled.includes(valueInLabel[btn])}
                                            onClick={() => {
                                                onClickSelType(btn, valueInLabel[btn], index);
                                            }}
                                        >{btn}
                                        </Button>
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
        </div>

    )
}

function CanUseSkuNode(props) {
    const { canUseSku } = props;
    return (
        <div>
            {
                canUseSku.map((item, i) => {
                    return (
                        <Button style={{ margin: '0 10px' }} key={i}>{item.skuName}</Button>
                    );
                })
            }
        </div>
    )
}