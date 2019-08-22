import React, { ChangeEvent, useState } from 'react';
import { Button, Input, message, Icon } from 'antd';
import { isValidTelephone, isValidCode } from '../../util/index';
import './index.css';
import { withRouter } from 'react-router';

function Login(props: any) {
    const { history } = props;

    const [telephone, setTelephone] = useState('');
    const [code, setCode] = useState('');
    const [validCode, setValidCode] = useState(false);

    function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setTelephone(value);
        if(value && isValidTelephone(value)) {
            if(localStorage.getItem('telephone')) localStorage.removeItem('telephone');
            localStorage.setItem('telephone', value);
        } else {
            console.log('is unvalid telephone');
        }
    }

    function handleCodeChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setCode(value);
        if(value && isValidCode(value)) {
            if(value === '123456') {
                setValidCode(true);
            }
        }
    }

    function handleSendVertifyCode() {
        // todo send code
        message.success('验证码已发送');
    }

    function handleLogin() {
        // todo Login
        // todo user Form
        if (validCode) {
            history.push('/userForm');
        } else {
            message.error('验证码不正确');
        }
    }

    return <div className="login">
            <header className="login__header">登录</header>
            <div className="login__input">
                <Input
                    placeholder="请输入手机号"
                    size="large"
                    value={telephone}
                    onChange={handlePhoneChange}
                    suffix={
                        !telephone
                            ? <span />
                            : isValidTelephone(telephone)
                                ? <Icon type="check-circle" style={{ color: 'rgba(0, 255, 0, .45)' }} />
                                : <Icon type="exclamation-circle" style={{ color: 'rgba(255, 0, 0, .45)' }} />
                    }
                />
            </div>
            <div className="login__input login__vertify-code">
                <Input
                    className="login__vertify-code-input"
                    value={code}
                    size="large"
                    placeholder="请输入验证码"
                    onChange={handleCodeChange}
                    suffix={
                        !code
                            ? <span />
                            : isValidCode(code)
                                ? <Icon type="check-circle" style={{ color: 'rgba(0, 255, 0, .45)' }} />
                                : <Icon type="exclamation-circle" style={{ color: 'rgba(255, 0, 0, .45)' }} />
                    }
                />
                <Button type="primary" size="large" onClick={handleSendVertifyCode}>发送验证码</Button>
            </div>
            <Button className="login__submit" size="large" type="primary" onClick={handleLogin}>登录</Button>
        </div>;
}

export default withRouter(Login);