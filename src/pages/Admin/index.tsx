import React, { useState, useEffect } from 'react';
import { getUnconfirmedUserInfoList, confirmPay } from '../../api/index';
import './index.css';
import { withRouter } from 'react-router';

function Admin() {

    const [unConfirmList, setUnConfirmList] = useState([]);

    useEffect(() => {
        getUnconfirmedUserInfoList()
            .then(res => res.json())
            .then(data => {
                setUnConfirmList(data);
            });
    }, [])
    return <div>111</div>
}

export default withRouter(Admin);
