import React, { useState, useEffect, ChangeEvent } from 'react';
import { Input, Button, message, Tabs } from 'antd';
import { geUserInfoList, confirmPay } from '../../api/index';
import './index.css';
import { withRouter } from 'react-router';

interface userInfo {
    id: string,
    name: string,
    phoneNumber: string,
    credentialNo: string,
    isConfirmed: number
}

function Admin() {
    const [password, setPassword] = useState('');
    const localHasAuthed = parseInt(localStorage.getItem('hasAuthed') || '0');
    const isAuthInDate = Math.floor((Date.now() - localHasAuthed)/1000) < 3600 * 12;
    const [hasAuthed, setHasAuthed] = useState(isAuthInDate || false);
    const [unConfirmedList, setUnConfirmedList] = useState([]);
    const [confirmedList, setConfirmedList] = useState([]);
    const [showListType, setShowListType] = useState('unConfirmed');
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        geUserInfoList({ opType: "UNCONFIRMED" })
            .then(res => res.json())
            .then(data => {
                setUnConfirmedList(data);
            });

        geUserInfoList({ opType: "CONFIRMED" })
            .then(res => res.json())
            .then(data => {
                setConfirmedList(data);
            });
    }, [update])

    function handleChangePassword(e:ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setPassword(val);
    }

    function handleLogin() {
        if(password === 'nidemingzi') {
            setHasAuthed(true);
            if(localStorage.getItem('hasAuthed')) localStorage.removeItem('hasAuthed');
            localStorage.setItem('hasAuthed', `${Date.now()}`);
        } else {
            message.error('密码输入错误');
        }
    }

    function handleShowInfo(key: string) {
        setShowListType(key);
    }

    function handleConfirm(info: userInfo) {
        confirmPay({ phoneNumber: info.phoneNumber }).then(() => {
            setUpdate(update+1);
            message.success('已确认')
        }).catch(err => {
            message.error(err);
        })
    }

    const withOutAuth = 
        <div className="user-form">
            <header className="login__header">管理员登录</header>
            <div className="user-form__input">
                <label className="user-form__input-name">密码：</label>
                <Input.Password
                    className="user-form__input-content"
                    placeholder="请输入密码"
                    size="large"
                    value={password}
                    onChange={handleChangePassword}
                />
            </div>
            <Button className="user-form__submit admin_submit" size="large" type="primary" onClick={handleLogin}>登录</Button>
        </div>

    const withAuth = 
        <div className="admin">
            <header className="admin__header">报名信息</header>
            <Tabs defaultActiveKey="1" onChange={handleShowInfo}>
                <Tabs.TabPane tab="未确认" key="unConfirmed" />
                <Tabs.TabPane tab="已确认" key="confirmed" />
            </Tabs>
            { (showListType === 'confirmed' ? confirmedList: unConfirmedList).map((info: userInfo) => {
                return (
                <div key={info.id} >
                    <div className="admin__item">
                        <div className="admin__item-user-info">
                            <div className="admin__item-user-info-item">姓名：{info.name}</div>
                            <div className="admin__item-user-info-item">手机号：{info.phoneNumber}</div>
                            <div className="admin__item-user-info-item">身份证：{info.credentialNo}</div>
                        </div>
                        { info.isConfirmed === 0
                            ? <Button className="admin__item-confirm-buttom" type="primary" onClick={() => {handleConfirm(info)}}> 确认付款 </Button>
                            : <div className="admin__item-confirm-buttom" >已确认付款</div> }
                    </div>
                </div>)
            }) }
        </div>
    
    return hasAuthed ? withAuth : withOutAuth;
}

export default withRouter(Admin);
