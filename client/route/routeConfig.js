import "babel-polyfill";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Route,Router} from "dva/router";
import path from "./path";
import EnetryIndex from "../components/global/EnetryIndex.jsx"; //首页UI
import Dashboard from "../components/dashboard/Dashboard.jsx";
import NotFoundPage from "../components/global/NotFoundPage.jsx";

export default ({ history,app}) => {
    return  (<Router history={history} >
        <div className="rootRoute">
            <Route  exact={true} path={path.rootPath} component={EnetryIndex} />
            <Route  exact={false}  path={path.dashboard.rootPath} component={Dashboard} />
            {/* <Route  exact={false} path={`${path.rootPath}/404`} component={NotFoundPage} /> */}
        </div>
    </Router>);
};