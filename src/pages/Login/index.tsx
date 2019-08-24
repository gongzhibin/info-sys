import React, { ChangeEvent, useState, useRef } from 'react';
import { Button, Input, message, Icon } from 'antd';
import { isValidTelephone, isValidCode } from '../../util/index';
import { getMessageCode, checkMessageCode } from '../../api/index';
import './index.css';
import { withRouter } from 'react-router';

const DEFAULT_TIME = 60;

function Login(props: any) {
    const { history } = props;

    const [telephone, setTelephone] = useState(localStorage.getItem('telephone') || '');
    const [code, setCode] = useState('');
    const [time, setTime] = useState(DEFAULT_TIME);
    const timeRef = useRef(time);
    timeRef.current = time;

    function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setTelephone(value);
    }

    function handleCodeChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setCode(`${value}`);
    }

    function handleSendVertifyCode() {
        if(!isValidTelephone(telephone)) {
            return message.error('手机号填写错误');
        }
        
        const timer = setInterval(() => {
            setTime(timeRef.current - 1);
            console.log(time, timeRef.current);
            if (timeRef.current < 0) {
                clearInterval(timer);
                setTime(DEFAULT_TIME)
            }
        }, 1000);

        getMessageCode({ phoneNumber: telephone }).then(() => {
            message.success('验证码已发送');
        }).catch(err => {
            console.error(err);
            message.error('服务器异常');
        })

    }

    function handleLogin() {
        if(!isValidCode(code)) {
            return message.error('验证码格式错误');
        }
        if(!isValidTelephone(telephone)) {
            return message.error('手机号填写错误');
        }
        checkMessageCode({ phoneNumber: telephone, code })
            .then(res => res.json())
            .then((res: {
                code: number,
                msg: string
            }) => {
                if(res && res.code) {
                    return message.error(res.msg);
                }

                if(localStorage.getItem('telephone')) localStorage.removeItem('telephone');
                localStorage.setItem('telephone', telephone);

                return history.push('/userForm');
            })

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
                { time === DEFAULT_TIME 
                    ? <Button type="primary" size="large" onClick={handleSendVertifyCode}>发送验证码</Button>
                    : <Button type="primary" size="large" disabled>{time}秒后重试</Button>
                }
            </div>
            <Button className="login__submit" size="large" type="primary" onClick={handleLogin}>登录</Button>
        </div>;
}

export default withRouter(Login);