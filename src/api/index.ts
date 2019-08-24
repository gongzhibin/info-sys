const basePath = 'https://growthmind.xyz/api';

// 生成一个配置 
const baseOptions = {
    method: 'POST',//post请求 
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

export function getMessageCode(data: {
    phoneNumber: string
}) {
    return fetch(`${basePath}/getMessageCode`, {
        ...baseOptions,
        body: JSON.stringify({
            ...data
        })
    });
}

export function checkMessageCode(data: {
    phoneNumber: string,
    code: string
}) {
    return fetch(`${basePath}/checkMessageCode`, {
        ...baseOptions,
        body: JSON.stringify({
            ...data
        })
    });
}

export function getUserInfoByPhoneNo(data: {
    phoneNumber: string
}) {
    return fetch(`${basePath}/getUserInfoByPhoneNo`, {
        ...baseOptions,
        body: JSON.stringify({
            ...data
        })
    })  
}

export function saveUserInfo(data: {
    studentNumber: string,
    phoneNumber: string,
    name: string,
    credentialNo: string,
    administratorId: string
}) {
    return fetch(`${basePath}/saveUserInfo`, {
        ...baseOptions,
        body: JSON.stringify({
            ...data
        })
    });
}


// opType = "UNCONFIRMED" / "CONFIRMED"/
export function getUserInfoList(data: {
    opType: string
}) {
    return fetch(`${basePath}/getUserInfoList`, {
        ...baseOptions,
        body: JSON.stringify({
            ...data
        })
    })
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