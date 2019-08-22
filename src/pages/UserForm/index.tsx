import React, { useState, ChangeEvent } from 'react';
import { Input, Button, message, Icon } from 'antd';
import { saveUserInfo } from '../../api/index';
import { isValidTelephone, isValidName, isValidIdCardNo, isValidStudentNo } from '../../util/index';
import './index.css';
import { withRouter } from 'react-router';

function UserForm() {   
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [id, setId] = useState(localStorage.getItem('id') || '');
    const [studentNo, setStudentNo] = useState(localStorage.getItem('studentNo') || '');
    const [telephone, setTelephone] = useState(localStorage.getItem('telephone') || '');
    const [hasSubmited, setSubmited] = useState(localStorage.getItem(`${name}_${id}_${studentNo}_${telephone}_has_submited`) || false);

    function handleChangeName(e:ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setName(val);
        if (val && isValidName(val)) {
            if(localStorage.getItem('name')) localStorage.removeItem('name');
            localStorage.setItem('name', val);
        }
    }

    function handleChangeId(e:ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setId(val);
        if (val && isValidIdCardNo(val)) {
            if(localStorage.getItem('id')) localStorage.removeItem('id');
            localStorage.setItem('id', val);
        }
    }

    function handleChangeStudentNo(e:ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setStudentNo(val);
        if (val && isValidStudentNo(val)) {
            if(localStorage.getItem('studentNo')) localStorage.removeItem('studentNo');
            localStorage.setItem('studentNo', val);
        }
    }

    function handleChangeTelephone(e:ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setTelephone(val);
        if (val && isValidTelephone(val)) {
            if(localStorage.getItem('telephone')) localStorage.removeItem('telephone');
            localStorage.setItem('telephone', val);
        }
    }

    function beforeSubmit() {
        return new Promise((resolve, reject) => {
            if (isValidTelephone(telephone) && isValidName(name) && isValidIdCardNo(id) && isValidStudentNo(studentNo)) {
                if(hasSubmited || localStorage.getItem(`${name}_${id}_${studentNo}_${telephone}_has_submited`)) {
                    return reject('请勿重复提交');
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
                setSubmited('1');
                localStorage.setItem(`${name}_${id}_${studentNo}_${telephone}_has_submited`, '1');
                message.success('验证码已发送');
            }).catch(err => {
                console.error(err);
                message.error('服务器异常');
            })
        }).catch((err) => {
            message.error(err);
        })
    }

    return <div className="user-form">
            <header className="user-form__header">填写报名信息</header>
            <div className="user-form__input">
                <label className="user-form__input-name">姓名：</label>
                {/* if(isSubmit) {

                } */}
                <Input
                    className="user-form__input-content"
                    placeholder="请输入姓名"
                    size="large"
                    value={name}
                    onChange={handleChangeName}
                    suffix={
                        !name 
                            ? ''
                            : isValidName(name)
                                ? <Icon type="check-circle" style={{ color: 'rgba(0, 255, 0, .45)' }} />
                                : <Icon type="exclamation-circle" style={{ color: 'rgba(255, 0, 0, .45)' }}/>
                    }
                />
                {/* <div className="user-form__input-content">{name}</div> */}
            </div>
            <div className="user-form__input">
                <label className="user-form__input-name">身份证：</label>
                <Input
                    className="user-form__input-content"
                    placeholder="请输入身份证"
                    size="large"
                    value={id}
                    onChange={handleChangeId}
                    suffix={
                        !id
                            ? ''
                            : isValidIdCardNo(id)
                                ? <Icon type="check-circle" style={{ color: 'rgba(0, 255, 0, .45)' }} />
                                : <Icon type="exclamation-circle" style={{ color: 'rgba(255, 0, 0, .45)' }}/>
                    } 
                />
            </div>
            <div className="user-form__input">
                <label className="user-form__input-name">学号：</label>
                <Input className="user-form__input-content" 
                    placeholder="请输入学号"
                    size="large"
                    value={studentNo}
                    onChange={handleChangeStudentNo}
                    suffix={
                        !studentNo
                            ? ''
                            : isValidStudentNo(studentNo)
                                ? <Icon type="check-circle" style={{ color: 'rgba(0, 255, 0, .45)' }} />
                                : <Icon type="exclamation-circle" style={{ color: 'rgba(255, 0, 0, .45)' }} />
                    }
                />
            </div>
            <div className="user-form__input">
                <label className="user-form__input-name">手机号：</label>
                <Input
                    className="user-form__input-content"
                    placeholder="请输入手机号"
                    size="large"
                    value={telephone}
                    onChange={handleChangeTelephone}
                    suffix={
                        !telephone
                            ? ''
                            : isValidTelephone(telephone)
                                ? <Icon type="check-circle" style={{ color: 'rgba(0, 255, 0, .45)' }} />
                                : <Icon type="exclamation-circle" style={{ color: 'rgba(255, 0, 0, .45)' }} />
                    }
                />
            </div>
            <Button className="user-form__submit" size="large" type="primary" onClick={handleSubmit}>报名</Button>
        </div>;
}

export default withRouter(UserForm);
