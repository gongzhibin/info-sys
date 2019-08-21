import React from 'react';
import { Input, Button } from 'antd';
import './index.css';

function userForm() {
    return (
        <div className="user-form">
            <header className="user-form__header">填写报名信息</header>
            <div className="user-form__input">
                <Input placeholder="请输入姓名" size="large"/>
            </div>
            <div className="user-form__input">
                <Input placeholder="请输入身份证" size="large"/>
            </div>
            <div className="user-form__input">
                <Input placeholder="请输入手机号" size="large"/>
            </div>
            <Button className="user-form__submit" size="large" type="primary">报名</Button>
        </div>
    )
}

export default userForm;