import React, { useCallback, useEffect, useState } from 'react'
import './index.scss';

export default function StudyRegExp() {
    const [txt, setTxt] = useState('');
    const [regTxt, setRegTxt] = useState('');
    const [reg, setReg] = useState(new RegExp(""));
    const [regTxtO, setRegTxtO] = useState('');
    const [res, setRes] = useState('');
    const [type, setType] = useState(0);

    useEffect(() => {
        let obj = JSON.parse(localStorage.getItem('StudyRegExp') || {});
        setRegTxt(obj.regTxt);
        setTxt(obj.txt);
        setRegTxtO(obj.regTxtO);
        setType(obj.type);
    }, []);

    /**
     * 值改变
    */
    const handleTxtChange = useCallback((val) => {
        let _val = val.target.value;
        setTxt(_val);
    }, []);
    const handleRegTxtChange = useCallback((val) => {
        let _val = val.target.value;
        setRegTxt(_val);
    }, []);
    const handleRegTxtOChange = useCallback((val) => {
        let _val = val.target.value;
        setRegTxtO(_val);
    }, []);


    /**
     * 事件
    */
    const handleTestClick = useCallback(() => {
        setType(1)
    }, [regTxt, txt, regTxtO, reg]);
    const handleMatchClick = useCallback(() => {
        setType(2);
    }, [regTxt, txt, regTxtO, reg]);
    const handleExecClick = useCallback(() => {
        setType(3);
    }, [regTxt, txt, regTxtO, reg]);
    const handleReplaceClick = useCallback(() => {
        setType(4);
    }, [regTxt, txt, regTxtO, reg]);



    useEffect(() => {
        localStorage.setItem("StudyRegExp", JSON.stringify({
            regTxt,
            txt,
            regTxtO,
            type
        }));
        let reg;
        try{
            reg = new RegExp(`${regTxt}`, regTxtO);
            setReg(reg);
        } catch(err) {
            setRes('不合规正则');
            return;
        }
        try {
            switch (type) {
                case 1:
                    setRes(reg.test(txt));
                    break;

                case 2:
                    setRes(JSON.stringify(txt.match(reg)));
                    break;

                case 3:
                    setRes(JSON.stringify(reg.exec(txt)));
                    break;

                case 4:
                    setRes(txt.replace(reg, '❤️'));
                    break;

                default:
                    setRes(reg.test(txt));
                    break;
            }
        } catch (err) {
            setRes('方法报错');
        }
    }, [regTxt, txt, regTxtO, type]);


    return (
        <div className="study-regexp">
            <p>{res.toString()}</p>
            <input type="text" value={txt} onChange={handleTxtChange} className="text" />

            <div className="reg">
                <input type="text" value={regTxt} onChange={handleRegTxtChange} />
                <input type="text" value={regTxtO} onChange={handleRegTxtOChange} className="reg-other" />
            </div>
            <div className="button-group">
                <button onClick={handleTestClick}>test</button>
                <button onClick={handleReplaceClick}>replace</button>
                <button onClick={handleMatchClick}>match</button>
                <button onClick={handleExecClick}>exec</button>
            </div>
        </div>
    )
}
