const basePath = 'http://106.52.164.47:18080/api';

// 生成一个配置 
const baseOptions = {
    method: 'POST',//post请求 
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

export function saveUserInfo(data: {
    studentNumber: string,
    phoneNumber: string,
    name: string,
    credentialNo: string
}) {
    return fetch(`${basePath}/saveUserInfo`, {
        ...baseOptions,
        body: JSON.stringify({
            administratorId: '13924672619', // todo
            ...data
        })
    });
}

export function getUnconfirmedUserInfoList() {
    // todo spell error
    return fetch(`${basePath}/geUnconfirmedUserInfoList`, baseOptions);
}

export function confirmPay(data: {
    phoneNumber: string
}) {
    return fetch(`${basePath}/confirmPay`, {
        ...baseOptions,
        body: JSON.stringify({
            ...data
        })
    });
}