//基础依赖
import "babel-polyfill";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Route,Router} from "dva/router";
import path from "./path";


//外部文件引入相关
import EnetryIndex from "../components/EnetryIndex.jsx"; //首页UI
import Dashboard from "../components/Dashboard.jsx";
import NotFoundPage from "../components/NotFoundPage.jsx";

export default ({ history,app}) => {
    return  (<Router history={history} >
        <div className="rootRoute">
            <Route  exact={true} path={path.rootPath} component={EnetryIndex} />
            <Route  exact={false}  path={path.dashboard.rootPath} component={Dashboard} />
            {/* <Route  exact={false} path={`${path.rootPath}/404`} component={NotFoundPage} /> */}
        </div>
    </Router>);
};