export function isValidName(name: string): boolean {
    return /^([\u3400-\u4DFFh]|[\u4E00-\u9fa5]){1,15}[·.]?([\u3400-\u4DFFh]|[\u4E00-\u9fa5]){1,15}$/g.test(name);
}

export function isValidTelephone(phone: string): boolean {
    return /^[19]\d{10}$/.test(phone);
}

/**
 * 是否合法验证码
 * @param { string } code - 验证码字符串
 * @return { boolean }
 */
export function isValidCode(code: string): boolean {
    return /^\d{6}$/.test(code);
}

export function isValidIdCardNo(idNo: string, strictValid: boolean = true): boolean {
    const birthReg = /^(?:19\d{2}|20[01]\d)(?:1[0-2]|0?[1-9])(?:3[01]|[12][0-9]|0?[1-9])$/;
    if ( // 非空
        !idNo
        // 长度18位
        ||
        idNo.length !== 18
        // 前17位是否为数字
        ||
        !/^[0-9]*$/.test(idNo.substring(0, 17))
        // 最后一位是否是数字或者X
        ||
        !/^[0-9Xx]{1}$/.test(idNo.substring(17))
        // 生日是否符合规则
        ||
        !birthReg.test(idNo.substring(6, 14))) {
        return false;
    }

    if (!strictValid) {
        return true;
    }

    // 如果通过该验证，说明身份证格式正确，但准确性还需计算

    const idNoWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 将前17位加权因子保存在数组里
    const idNoY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
    let idNoWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
    for (let i = 0; i < 17; i += 1) {
        idNoWiSum += parseInt(idNo.substring(i, i + 1)) * idNoWi[i];
    }

    const idNoMod = idNoWiSum % 11; // 计算出校验码所在数组的位置
    const idNoLast = idNo.substring(17); // 得到最后一位身份证号码

    // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
    if (idNoMod === 2) {
        return idNoLast === 'X' || idNoLast === 'x';
    }

    // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
    return parseInt(idNoLast) === idNoY[idNoMod];
}

/**
 * 校验邮箱
 * @param {string} email - 邮箱号码字符串
 * @return {boolean}
 */
export function isValidEmail(email: string): boolean {
    return /^[\w+-]+(\.[\w+-]+)*@[a-z\d-]+(\.[a-z\d-]+)*\.([a-z]{2,4})$/i.test(email);
}

export function isValidStudentNo(stdudentNo: string): boolean {
    return /^\d{8}$/.test(stdudentNo);
}
