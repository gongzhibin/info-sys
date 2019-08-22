import React from 'react';
import Login from '../pages/Login/index';
import UserForm from '../pages/UserForm/index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// then our route config
const routeConfig= [
    {
        path: "/login",
        component: Login
    },
    {
        path: "/userForm",
        component: UserForm
    }
];

function Routes() {
    return ( 
        <Router>
            <div style={{height:'100%'}}>
                <Switch>
                    { routeConfig.map((route, i) => <Route path={route.path} key={i} component={route.component} />) }
                </Switch>
            </div>
      </Router>
    )
}

export default Routes;