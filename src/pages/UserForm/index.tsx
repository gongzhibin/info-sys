import React, { useState, ChangeEvent, useEffect } from 'react';
import { Input, Button, message, Icon } from 'antd';
import { saveUserInfo, getUserInfoByPhoneNo } from '../../api/index';
import { isValidTelephone, isValidName, isValidIdCardNo, isValidStudentNo } from '../../util/index';
import './index.css';
import { withRouter } from 'react-router';

function UserForm(props: any) {
    const localTel = localStorage.getItem('telephone') || '';
    if(!localTel || !isValidTelephone(localTel)) {
        props.history.push('/login');
    }
    const [telephone, setTelephone] = useState(localTel);

    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [id, setId] = useState(localStorage.getItem('id') || '');
    const [studentNo, setStudentNo] = useState(localStorage.getItem('studentNo') || '');

    const [userSubmitInfo, setUserSubmitInfo] = useState(localStorage.getItem(`${name}_${id}_${studentNo}_${telephone}_has_submited`) || '');
    const [isConfirmed, setIsConfirmed] = useState('0');

    useEffect(() => {
        if(!isValidTelephone(telephone)) return;
        getUserInfoByPhoneNo({ phoneNumber: telephone })
            .then(res => res.json())
            .then(res => {
                const { name = '', studentNumber = '', credentialNo = '', isConfirmed = '0' } = res || {};
                setLocalName(name);
                setLocalStudentNo(studentNumber);
                setLocalId(credentialNo);
                setIsConfirmed(isConfirmed);
                if(isConfirmed === 1) setUserSubmitInfo('1');
            })
    }, []);

    function handleChangeName(e:ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setLocalName(val);
    }

    function handleChangeId(e:ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setLocalId(val);
    }

    function handleChangeStudentNo(e:ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setLocalStudentNo(val);
    }

    function handleChangeTelephone(e:ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setLocalTelephone(val);
    }

    function setLocalName(val: string) {
        setName(val);
        if (val && isValidName(val)) {
            if(localStorage.getItem('name')) localStorage.removeItem('name');
            localStorage.setItem('name', val);
        }
    }

    function setLocalId(val: string) {
        setId(val);
        if (val && isValidIdCardNo(val)) {
            if(localStorage.getItem('id')) localStorage.removeItem('id');
            localStorage.setItem('id', val);
        }
    }

    function setLocalStudentNo(val: string) {
        setStudentNo(val);
        if (val && isValidStudentNo(val)) {
            if(localStorage.getItem('studentNo')) localStorage.removeItem('studentNo');
            localStorage.setItem('studentNo', val);
        }
    }

    function setLocalTelephone(val: string) {
        setTelephone(val);
        if (val && isValidTelephone(val)) {
            if(localStorage.getItem('telephone')) localStorage.removeItem('telephone');
            localStorage.setItem('telephone', val);
        }
    }

    function beforeSubmit() {
        return new Promise((resolve, reject) => {
            if (isValidTelephone(telephone) && isValidName(name) && isValidIdCardNo(id) && isValidStudentNo(studentNo)) {
                if(userSubmitInfo && userSubmitInfo === `${name}_${id}_${studentNo}_${telephone}_has_submited` || localStorage.getItem(`${name}_${id}_${studentNo}_${telephone}_has_submited`)) {
                    setUserSubmitInfo('1');
                    return reject('你已完成信息提交');
                }
                return resolve('输入校验完成');
            }
            return reject('信息填写错误');
        });
    }

    function handleSubmit() {
        beforeSubmit().then(() => {
            saveUserInfo({
                studentNumber: studentNo,
                phoneNumber: telephone,
                name,
                credentialNo: id
            }).then(() => {
                setUserSubmitInfo('1');
                localStorage.setItem(`${name}_${id}_${studentNo}_${telephone}_has_submited`, '1');
                message.success('信息提交成功');
            }).catch(err => {
                console.error(err);
                message.error('服务器异常');
            })
        }).catch((err) => {
            message.warning(err);
        })
    }

    function handleReSubmit() {
        setUserSubmitInfo('');
    }

    const form = 
        <div className="user-form">
            <header className="user-form__header">填写信息</header>
            <div className="user-form__input">
                <label className="user-form__input-name">姓名</label>:
                 <Input
                    className="user-form__input-content"
                    placeholder="请输入姓名"
                    size="large"
                    value={name}
                    onChange={handleChangeName}
                    suffix={
                        !name 
                            ? <span />
                            : isValidName(name)
                                ? <Icon type="check-circle" style={{ color: 'rgba(0, 255, 0, .45)' }} />
                                : <Icon type="exclamation-circle" style={{ color: 'rgba(255, 0, 0, .45)' }}/>
                    }
                />
            </div>
            <div className="user-form__input">
                <label className="user-form__input-name">身份证</label>:
                <Input
                    className="user-form__input-content"
                    placeholder="请输入身份证"
                    size="large"
                    value={id}
                    onChange={handleChangeId}
                    suffix={
                        !id
                            ? <span />
                            : isValidIdCardNo(id)
                                ? <Icon type="check-circle" style={{ color: 'rgba(0, 255, 0, .45)' }} />
                                : <Icon type="exclamation-circle" style={{ color: 'rgba(255, 0, 0, .45)' }}/>
                    } 
                />
            </div>
            <div className="user-form__input">
                <label className="user-form__input-name">学号</label>:
                <Input className="user-form__input-content" 
                    placeholder="请输入学号"
                    size="large"
                    value={studentNo}
                    onChange={handleChangeStudentNo}
                    suffix={
                        !studentNo
                            ? <span />
                            : isValidStudentNo(studentNo)
                                ? <Icon type="check-circle" style={{ color: 'rgba(0, 255, 0, .45)' }} />
                                : <Icon type="exclamation-circle" style={{ color: 'rgba(255, 0, 0, .45)' }} />
                    }
                />
            </div>
            <div className="user-form__input">
                <label className="user-form__input-name">手机号</label>:
                { isValidTelephone(telephone)
                    ? <div className="user-form__input-content">{telephone}</div>
                    : <Input
                        className="user-form__input-content"
                        placeholder="请输入手机号"
                        size="large"
                        value={telephone}
                        onChange={handleChangeTelephone}
                        suffix={
                            !telephone
                                ? <span />
                                : isValidTelephone(telephone)
                                    ? <Icon type="check-circle" style={{ color: 'rgba(0, 255, 0, .45)' }} />
                                    : <Icon type="exclamation-circle" style={{ color: 'rgba(255, 0, 0, .45)' }} />
                        }
                    />
                }
            </div>
            <Button className="user-form__submit" size="large" type="primary" onClick={handleSubmit}>提交</Button>
        </div>;

    const info = 
        <div className="user-form">
            <header className="user-form__header">学员信息</header>
            <div className="user-form__input">
                <label className="user-form__input-name user-form__info">姓名</label>:
                <div className="user-form__input-content">{name}</div>
            </div>
            <div className="user-form__input">
                <label className="user-form__input-name user-form__info">身份证</label>:
                <div className="user-form__input-content">{id}</div>
            </div>
            <div className="user-form__input">
                <label className="user-form__input-name user-form__info">学号</label>:
                <div className="user-form__input-content">{studentNo}</div>
            </div>
            <div className="user-form__input">
                <label className="user-form__input-name user-form__info">手机号</label>:
                <div className="user-form__input-content">{telephone}</div>
            </div>
            <div className="user-form__input">
                <label className="user-form__input-name user-form__info">缴费状态</label>:
                <div className="user-form__input-content">{isConfirmed === '0' ? '未确认' : '已确认' }</div>
            </div>
            { isConfirmed === '0'
                ? <Button className="user-form__submit" size="large" type="primary" onClick={handleReSubmit}>重新提交</Button>
                : <span />
            }

        </div>;
    return userSubmitInfo ? info : form;
}

export default withRouter(UserForm);
