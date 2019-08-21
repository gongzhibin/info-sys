import React from 'react';
import { Button, Input } from 'antd';
import './index.css';
// todo 添加toast提示

function login() {
    return (
        <div className="login">
            <header className="login__header">登录</header>
            <div className="login__input">
                <Input placeholder="请输入手机号" size="large"/>
            </div>
            <div className="login__input login__vertify-code">
                <Input className="login__vertify-code-input" size="large" placeholder="请输入验证码"/>
                <Button type="primary" size="large">发送验证码</Button>
            </div>
            <Button className="login__submit" size="large" type="primary">登录</Button>
        </div>
    )
}

export default login;