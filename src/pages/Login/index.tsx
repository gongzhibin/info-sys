import React, { ChangeEvent, useState } from 'react';
import { Button, Input, message } from 'antd';
import { isValidTelephone, isValidCode } from '../../util/index';
import './index.css';

function login() {

    const [telephone, setTelephone] = useState('');
    const [code, setCode] = useState('');

    function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        if(value && isValidTelephone(value)) {
            if(localStorage.getItem('userPhone')) localStorage.removeItem('userPhone');
            localStorage.setItem('userPhone', value);
            setTelephone(value);
        } else {
            console.log('is unvalid telephone');
        }
    }

    function handleCodeChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        if(value && isValidCode(value)) {
            setCode(value);
        } else {
            console.log('is unvalid Code');
        }
    }

    function handleSendVertifyCode() {
        // todo send code
        message.success('验证码已发送');
    }

    function handleLogin() {
        // todo Login
        // todo user Form
    }

    return <div className="login">
            <header className="login__header">登录</header>
            <div className="login__input">
                <Input placeholder="请输入手机号" size="large" value={telephone} onChange={handlePhoneChange}/>
            </div>
            <div className="login__input login__vertify-code">
                <Input className="login__vertify-code-input" value={code} size="large" placeholder="请输入验证码" onChange={handleCodeChange}/>
                <Button type="primary" size="large" onClick={handleSendVertifyCode}>发送验证码</Button>
            </div>
            <Button className="login__submit" size="large" type="primary" onClick={handleLogin}>登录</Button>
        </div>;
}

export default login;